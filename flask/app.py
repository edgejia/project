from flask import Flask, render_template, request, redirect, url_for, session, Response, flash
from camera import VideoCamera , Consumer
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from cv2 import cv2
import os
import time    
app = Flask(__name__)

app.secret_key = 'root'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'mask_detection'

mysql = MySQL(app)

video_stream = VideoCamera()


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def mkdir(dir_name):
    path = './BAD GUY/'
    if not os.path.isdir(path+ dir_name):
        os.mkdir(path + dir_name)


@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''

    if request.method == 'POST' and 'email' in request.form and 'passwd' in request.form:
        email = request.form['email']
        if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = '不合法的電子信箱'
        else:
            passwd = request.form['passwd']
            #check if account exist then using MySQL
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM accounts WHERE Email = %s AND Password = %s', (email, passwd))
            #Fetch one record and return result
            account = cursor.fetchone()
            if account:
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['username']
                return redirect(url_for('home'))
            else:
                msg = '錯誤的帳號/密碼'
    else:
        msg = '請輸入帳號/密碼'
    return render_template('index.html', msg=msg)

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/confirm_email', methods=['GET', 'POST'])
def confirm_email():
    _msg = ''
    if request.method == 'POST' and 'email' in request.form and 'confirm_email' in request.form:
        email = request.form['email']        
        if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = '不合法的電子信箱'
        else:
            confirm_email = request.form['confirm_email']
            if email == confirm_email:
                cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
                IsExist = cursor.execute('SELECT * FROM accounts WHERE email = %s', (email,))
                if IsExist:
                    msg = '此電子信箱已註冊過'            
                else:
                    return render_template('register.html', _email=email)
            else:
                msg = '請確認輸入兩個相同的電子信箱'
    else:
        msg = '請填寫所有欄位'
    return render_template('index.html', msg=msg)

@app.route('/register', methods=['GET', 'POST'])
def register():
    # Output message if something goes wrong...
    msg = ''
    email = ''
    if request.method == 'POST' and 'email' in request.form and 'username' in request.form and 'passwd' in request.form and 'passwd2' in request.form:
        # Create variables for easy access
        password = request.form['passwd']
        password2 = request.form['passwd2']
        username = request.form['username']
        email = request.form['email']
        if password == password2:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            account = cursor.execute('SELECT * FROM accounts WHERE username = %s', (username,))
            if account:
                msg = '此用戶名稱已被使用'
            elif re.search(r'[^a-zA-Z0-9]+', username):
                msg = '用戶名稱只能包含英文字母(大、小寫皆可)及數字'
            elif not username or not password or not email:
                msg = '請填寫所有欄位'
            else:
                cursor.execute('INSERT INTO accounts VALUES (NULL, %s, %s, %s)', (username, password, email,))
                mysql.connection.commit()
                return render_template('success.html')
        else:
            msg = '請確認輸入兩個相同的密碼'
    else:
        msg = '請填寫所有欄位'
    # Show registration form with message (if any)
        
    return render_template('register.html', msg=msg, _email=email)

@app.route('/home')
def home():
    if 'loggedin' in session:
        return render_template('home.html', username=session['username'])
    
    return redirect(url_for('login'))
        
@app.route('/profile')
def profile():
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select * from accounts where id = %s', (session['id'],))
        account = cursor.fetchone()
        return render_template('profile.html', account=account)
    return redirect(url_for('login'))


@app.route('/')
def index():
    
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    print(type(gen(video_stream)))
    print(gen(video_stream))
    

    return Response(gen(video_stream),
                mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True,port="5000")