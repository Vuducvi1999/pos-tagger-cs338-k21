from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
import json
import uuid
import sshtunnel


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

sshtunnel.SSH_TIMEOUT = 5.0
sshtunnel.TUNNEL_TIMEOUT = 5.0

tunnel = sshtunnel.SSHTunnelForwarder(
    ('ssh.pythonanywhere.com'), ssh_username='vuducvi', ssh_password='anhvi122333',
    remote_bind_address=(
        'vuducvi.mysql.pythonanywhere-services.com', 3306)
)

tunnel.start()


# connect mongodb
# app.config["MONGO_URI"] = "mongodb+srv://vuducvi:vuducvi@cluster0-z8cct.gcp.mongodb.net/POS?retryWrites=true&w=majority"
# app.config["MONGO_URI"] = "mongodb://u4xkqu8g74tlevden4ua:ujpVV5jOCu3agl0CGqjC@bsx9oxereeh9ctc-mongodb.services.clever-cloud.com:27017/bsx9oxereeh9ctc"
# mongo = PyMongo(app)
# db = mongo.db.history

# connect sql
# # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://vuducvi.mysql.pythonanywhere-services.com'
# app.config['MYSQL_HOST'] = 'vuducvi.mysql.pythonanywhere-services.com'
# app.config['MYSQL_USER'] = 'vuducvi'
# app.config['MYSQL_PASSWORD'] = 'vuducvi'
# app.config['MYSQL_DB'] = 'default'

# app.config['MYSQL_HOST'] = 'sql12.freemysqlhosting.net'
# app.config['MYSQL_USER'] = 'sql12356560'
# app.config['MYSQL_PASSWORD'] = '9CCi5eUJk4'
# app.config['MYSQL_DB'] = 'sql12356560'

# app.config['MYSQL_HOST'] = '127.0.0.1:'+str(tunnel.local_bind_port)
# app.config['MYSQL_USER'] = 'vuducvi'
# app.config['MYSQL_PASSWORD'] = 'vuducvi122333'
# app.config['MYSQL_DB'] = 'vuducvi$default'


# mysql = MySQL(app)
# # cors -
# CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://vuducvi:vuducvi122333@0.0.0.0:{}/vuducvi$default'.format(
    tunnel.local_bind_port)


db = SQLAlchemy(app)


class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
