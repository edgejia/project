from flask_sqlalchemy import SQLAlchemy
import hashlib
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@localhost:3306/mask_detectionv2"
db = SQLAlchemy(app)

class Acc(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email = db.Column(db.String(64), nullable=False, unique=True)
    Username = db.Column(db.String(64), nullable=False, unique=True)
    Password = db.Column(db.String(128), nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)
    
    def __init__(self, Email=None, Username=None, Password=None, active=True):
        self.Email = Email
        self.Username = Username
        self.Password = Password
        self.active = active




try:
    db.create_all()

    hash_password = hashlib.sha256(b"123456").hexdigest()
    acc = Acc(Email="admin@test.com", Username="admin", Password=hash_password)
    db.session.add(acc)
    db.session.commit()

except :
    pass

db.session.close()