from flask import Flask,render_template,request,redirect,url_for
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        basepath = os.path.dirname(__file__) # 當前檔案所在路徑
        upload_path = os.path.join(basepath, 'static/uploads',secure_filename(f.filename)) #注意：沒有的資料夾一定要先建立，不然會提示沒有該路徑
        f.save(upload_path)
        return redirect(url_for('upload'))
    return render_template('upload.html')

if __name__ == '__main__':
  app.run(debug=True)