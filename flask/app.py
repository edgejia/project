from flask import render_template, Response, jsonify, request
from camera import VideoCamera , Consumer
from cv2 import cv2
from mysql_operate import User, Photo
import os
from gloabalvar import app, db

video_stream = VideoCamera()

images = []

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def mkdir(dir_name):
    path = './BAD GUY/'
    if not os.path.isdir(path+ dir_name):
        os.mkdir(path + dir_name)

@app.route('/')
def index():
    
    return render_template('index.html')


@app.route('/', methods=[ 'POST'])
def regist():
    
    Email = request.values['email']
    UserName = request.values['name']
    UserPhone = request.values['phone']
    Passwd = request.values['passwd']
    user = User(Email=Email, UserName=UserName, UserPhone=UserPhone, Passwd=Passwd)
    db.session.add(user)
    db.session.commit()
    mkdir(Email)
    return '註冊成功'


@app.route('/video_feed')
def video_feed():
    print(type(gen(video_stream)))
    print(gen(video_stream))
    

    return Response(gen(video_stream),
                mimetype='multipart/x-mixed-replace; boundary=frame')



if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True,port="5000")