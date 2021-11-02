from gloabalvar import db




class User(db.Model):
    __tablename__ = 'User'
    Email = db.Column(db.String(64), primary_key=True, nullable=False, unique=True)
    UserName = db.Column(db.String(64), nullable=False)
    UserPhone = db.Column(db.String(64), nullable=False, unique=True)
    Passwd = db.Column(db.String(64), nullable=False)

    db_user_photo = db.relationship('Photo', backref='User')

    def __init__(self, Email=Email, UserName=UserName, UserPhone=UserPhone, Passwd=Passwd):
        self.Email = Email
        self.UserName = UserName
        self.UserPhone = UserPhone
        self.Passwd = Passwd

class Photo(db.Model):
    __tablename__ = 'Photo'
    PhotoID = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    PhotoName = db.Column(db.String(64), nullable=False)
    Email = db.Column(db.String(64), db.ForeignKey('User.Email'), nullable=False)
    Path = db.Column(db.String(300))

    def __init__(self, PhotoName=PhotoName, Email=Email):
        self.PhotoName = PhotoName
        self.Email = Email
# db.drop_all()
# db.create_all()
# photo = Photo(PhotoName='JIA', Email='abc@gg.cc')
# db.session.add(photo)
# db.session.commit()
