from flask import Flask, render_template, Response, jsonify
from camera import VideoCamera , Consumer
from cv2 import cv2 as cv2
import time


app = Flask(__name__)

video_stream = VideoCamera()

images = []


def gen_video(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def gen_image():
    counter = 0
    while True:
        images = [open('./BAD GUY/bad_' + f + '.jpg', 'rb').read() for f in ['1', '2', '3']]
        n = counter % 3
        img = images[counter % 3]
        counter += 1
        yield (b'--img\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')
        time.sleep(0.7)

@app.route('/')
def index():
    
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    print(type(gen_video(video_stream)))
    print(gen_video(video_stream))
    

    return Response(gen_video(video_stream),
                mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/img_feed')
def img_feed():
    return Response(gen_image(),
                    mimetype='multipart/x-mixed-replace; boundary=img')

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True,port="5000")