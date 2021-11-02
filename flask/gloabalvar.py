from flask import Flask
from flask_sqlalchemy import  SQLAlchemy

app = Flask(__name__)


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:b10717024@127.0.0.1:3306/mask_detection"

db = SQLAlchemy(app)