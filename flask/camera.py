from cv2 import cv2 as cv2
import numpy as np 
import time
import threading
import queue

Flag = False
count = 1

class VideoCamera(object):
    def __init__(self):
        #由opencv來獲取預設為0 裝置影像
        self.video = cv2.VideoCapture(0)
        self.count = 1
    def __del__(self):
        self.video.release()        

    def get_frame(self):
        ret, frame = self.video.read()
        
        xframe = cv2.flip(frame ,1 ,dst = None) #畫面水平翻轉(鏡像)

        detected = self.Mask_detection(xframe)

        ret, jpeg = cv2.imencode('.jpg', detected)#ret, jpeg = cv2.imencode('.jpg', frame)

        return jpeg.tobytes()
    
    def Mask_detection(self,image):
        weightsPath = "yolo\yolov4-tiny_last.weights"
        configPath = "yolo/yolov4-tiny.cfg"
        labelsPath = "yolo/voc.names"
        print(type(image))
        print(image.shape)
        # 初始化一些参数
        LABELS = open(labelsPath).read().strip().split("\n")  # 物体类别
        COLORS = np.random.randint(0, 255, size=(len(LABELS), 3), dtype="uint8")  # 颜色
        boxes = []
        confidences = []
        classIDs = []
        net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)
        
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
        
        # package = [image , boxes , classIDs]
        # global Flag
        # if 1 in classIDs and Flag == False:
        #     Flag = True
        #     _Consumer = Consumer(package)
        #     _Consumer.start()




        #cv2.imshow("Image", image)
        #print(classIDs)
        #boxes.clear()
        #confidences.clear()
        #classIDs.clear()
        return image