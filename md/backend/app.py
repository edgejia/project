from logging import Manager
from flask import Flask,request
from flask_socketio import SocketIO, emit
from flask_sqlalchemy import SQLAlchemy
import base64
import cv2
import numpy as np 
import jwt
# base和token會在cmd(命令提示元)，啟動jupyter notebook時出現


app = Flask(__name__)

SECRET_KEY = 'secret!'

app.config["DEBUG"] = True
app.config['SECRET_KEY'] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:123456@localhost:3306/mask_detection"

db = SQLAlchemy(app)

class Acc(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email = db.Column(db.String(64), nullable=False, unique=True)
    Username = db.Column(db.String(64), nullable=False, unique=True)
    Password = db.Column(db.String(128), nullable=False)
    active = db.Column(db.Boolean, default=False, nullable=False)
    def __init__(self, Email=None, Username=None, Password=None, active=True):
        self.Email = Email
        self.Username = Username
        self.Password = Password
        self.active = active

socketio = SocketIO(app,cors_allowed_origins = '*', always_connect=True, engineio_logger=False,logger=False)

@socketio.on('signin_event')
def client_msg(msg):
    email = msg['email']
    pwd = msg['password']
    filters = {'Email': email, 'Password': pwd}
    query = Acc.query.filter_by(**filters).first()
    payload = {'id': query.id, 'Email': query.Email}
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    emit('getToken', {'token': token})
    
@socketio.on('signup_event')
def signup_event(msg):
    _email = msg['email']
    _username = msg['username']
    _pwd = msg['password']
    retmsg = ''
    q1 = Acc.query.filter_by(Email=_email).first()
    if q1:
        retmsg = '此email已被註冊'
    else:
        q2 = Acc.query.filter_by(Username=_username).first()
        if q2:
            retmsg = '此使用者名稱已被使用'
        else:
            new_acc = Acc(_email, _username, _pwd)
            db.session.add(new_acc)
            db.session.commit()
            retmsg = '註冊成功'
    emit('signevent',retmsg)

@socketio.on('client_discon')
def client_discon(msg):
    print(msg)
    emit('server_response',"Roger disconnect")

@socketio.on('connect_event')
def connected_msg(msg):
    #print('[INFO] Web client connected: {}'.format(request.sid))
    print('client:'+msg)
    emit('server_response', msg)
    
@socketio.on('mask_detect')
def mask_detect(package):
    if (package['img'] != None):
        split = package['img'].split(",")
        header = split[0]
        imgstr = split[1]
        bimg = base64.b64decode(imgstr)
        img = np.frombuffer(bimg,dtype=np.uint8)
        img = cv2.imdecode(img,1)
        Masked_pic =  Mask_detection(img)
        Masked_pic = cv2.imencode('.jpeg',Masked_pic)[1]
        Masked_pic = header+"," + str(base64.b64encode(Masked_pic))[2:-1]
        
        emit('ret_masked_img',{'img':Masked_pic})
        
def Mask_detection(image):
        weightsPath = "yolo\yolov4-tiny_last.weights"
        configPath = "yolo/yolov4-tiny.cfg"
        labelsPath = "yolo/voc.names"
        # 初始化一些参数
        LABELS = open(labelsPath).read().strip().split("\n")  # 物体类别
        COLORS = np.random.randint(0, 255, size=(len(LABELS), 3), dtype="uint8")  # 颜色
        boxes = []
        confidences = []
        classIDs = []
        net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)
        #使用cuda加速
        net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
        net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
        
        (H, W) = image.shape[:2]
        # 得到 YOLO需要的输出层
        ln = net.getLayerNames()
        ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]
        # 从输入图像构造一个blob，然后通过加载的模型，给我们提供边界框和相关概率
        blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)
        #blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)
        net.setInput(blob)
        layerOutputs = net.forward(ln)
        # 在每层输出上循环
        for output in layerOutputs:
            # 对每个检测进行循环
            for detection in output:
                scores = detection[5:]
                classID = np.argmax(scores)
                confidence = scores[classID]
                # 过滤掉那些置信度较小的检测结果
                if confidence > 0.5:
                    # 框后接框的宽度和高度
                    box = detection[0:4] * np.array([W, H, W, H])
                    (centerX, centerY, width, height) = box.astype("int")
                    # 边框的左上角
                    x = int(centerX - (width / 2))
                    y = int(centerY - (height / 2))
                    # 更新检测出来的框
                    boxes.append([x, y, int(width), int(height)])
                    confidences.append(float(confidence))
                    classIDs.append(classID)
                    
        # 极大值抑制
        idxs = cv2.dnn.NMSBoxes(boxes, confidences, 0.2, 0.3)
        if len(idxs) > 0:
            for i in idxs.flatten():
                (x, y) = (boxes[i][0], boxes[i][1])
                (w, h) = (boxes[i][2], boxes[i][3])
                # 在原图上绘制边框和类别
                color = [int(c) for c in COLORS[classIDs[i]]]
                #cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
                text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
                if('bad' in text):
                    color = [0,0,255]
                elif('none' in text):
                    color = [255,0,0]
                elif('good' in text):
                    color = [0,255,0]
                cv2.rectangle(image, (x, y), (x + w, y + h), color, 2)
                #print(text)
                cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        return image

if __name__ == '__main__':
    db.create_all()
    socketio.run(app, debug=True, host='127.0.0.1', port=3002)
    