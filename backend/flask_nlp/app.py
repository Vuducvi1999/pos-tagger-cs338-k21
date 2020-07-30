from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from tagger import exec
from flask_mysqldb import MySQL
import uuid


app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False


# connect mongodb
# app.config["MONGO_URI"] = "mongodb+srv://vuducvi:vuducvi@cluster0-z8cct.gcp.mongodb.net/POS?retryWrites=true&w=majority"
# # app.config["MONGO_URI"] = "mongodb://u4xkqu8g74tlevden4ua:ujpVV5jOCu3agl0CGqjC@bsx9oxereeh9ctc-mongodb.services.clever-cloud.com:27017/bsx9oxereeh9ctc"
# mongo = PyMongo(app)
# db = mongo.db.history

# cors
CORS(app)


# connect sql
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://vuducvi.mysql.pythonanywhere-services.com'
app.config['MYSQL_HOST'] = 'bfqzcdxophnv5vrwfonp-mysql.services.clever-cloud.com'
app.config['MYSQL_USER'] = 'utqv2xslnl0y1chs'
app.config['MYSQL_PASSWORD'] = 'Pv7zty6BoS6OsMxtrrhW'
app.config['MYSQL_DB'] = 'bfqzcdxophnv5vrwfonp'

# app.config['MYSQL_HOST'] = 'sql12.freemysqlhosting.net'
# app.config['MYSQL_USER'] = 'sql12356560'
# app.config['MYSQL_PASSWORD'] = '9CCi5eUJk4'
# app.config['MYSQL_DB'] = 'sql12356560'

# app.config['MYSQL_HOST'] = '0.0.0.0:'+str(tunnel.local_bind_port)
# app.config['MYSQL_USER'] = 'vuducvi'
# app.config['MYSQL_PASSWORD'] = 'vuducvi122333'
# app.config['MYSQL_DB'] = 'vuducvi$default'

mysql = MySQL(app)


@app.route("/", methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute('''select * from history''')
        result = cur.fetchall()
        result = [x for x in result]
        final = []
        for x in result:
            temp = dict()
            temp['id'] = x[0]
            temp['origin'] = x[1]
            temp['tagger'] = x[2]
            final.append(temp)
        print(final)
        return jsonify(final)
    else:
        # cur = mysql.connection.cursor()
        # cur.execute('''drop table history ''')
        # cur.execute('''create table history (id varchar(100), origin varchar(100), tagger varchar(100))''')
        # return 'ok'

        text = request.json["tagger"]
        tagger = exec(text)
        isExist = None
        cur = mysql.connection.cursor()
        # cur.execute('''select * from history''')
        # cur.execute('''insert into history values(2,'đây là origin 2','đây  là tagger 2')''')
        # mysql.connection.commit()
        # return 'ok'
        if request.json['checked']:
            cur.execute("select * from history where origin= '%s'" % text)
            isExist = cur.fetchall()
            if not isExist:
                cur.execute(
                    '''insert into history values('%s','%s','%s')''' % (uuid.uuid1(), text, tagger))
                mysql.connection.commit()
            return jsonify({'origin': text, 'tagger': tagger})
        else:
            return jsonify({'origin': text, 'tagger': tagger})


@app.route("/<id>", methods=['GET', 'DELETE'])
def get_delete_one(id):
    if request.method == 'GET':
        # data = db.find_one({"_id": ObjectId(id)})
        cur = mysql.connection.cursor()
        cur.execute("select * from history where id= '%s'" % id)
        data = cur.fetchall()
        final = dict()
        for i in data:
            final['id'] = i[0]
            final['origin'] = i[1]
            final['tagger'] = i[2]
        print([final])
        return jsonify(([final]))
    elif request.method == 'DELETE':
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM history WHERE id='%s'" % id)
        mysql.connection.commit()
        return jsonify({'message': "deleted"})


if __name__ == "__main__":
    app.run(debug=True)


################### CSDL MONGODB ####################

# @app.route("/", methods=['GET', 'POST'])
# def home():
#     output = []
#     if request.method == 'GET':
#         for i in db.find():
#             output.append(
#                 {'id': str(i['_id']), 'origin': i['origin'], 'tagger': i['tagger']})
#         return jsonify(output)
#     else:
#         text = request.json["tagger"]
#         tagger = exec(text)
#         isExist = None
#         if request.json['checked']:
#             isExist = db.find_one({'origin': text})
#             if not isExist:
#                 db.insert({'origin': text, 'tagger': tagger})
#             return jsonify({'origin': text, 'tagger': tagger})
#         else:
#             return jsonify({'origin': text, 'tagger': tagger})


# @app.route("/<id>", methods=['GET', 'DELETE'])
# def get_delete_one(id):
#     if request.method == 'GET':
#         data = db.find_one({"_id": ObjectId(id)})
#         output = [
#             {'id': str(data['_id']), 'origin':data['origin'], 'tagger': data['tagger']}]
#         return jsonify(output)
#     elif request.method == 'DELETE':
#         db.delete_one({"_id": ObjectId(id)})
#         return jsonify({'message': "deleted"})


################ CSDL SQL ##################

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

# app.config['MYSQL_HOST'] = '0.0.0.0:'+str(tunnel.local_bind_port)
# app.config['MYSQL_USER'] = 'vuducvi'
# app.config['MYSQL_PASSWORD'] = 'vuducvi122333'
# app.config['MYSQL_DB'] = 'vuducvi$default'

# mysql = MySQL(app)
# @app.route("/", methods=['GET', 'POST'])
# def home():
#     if request.method == 'GET':
#         cur = mysql.connection.cursor()
#         cur.execute('''select * from history''')
#         result = cur.fetchall()
#         result = [x for x in result]
#         final = []
#         for x in result:
#             temp = dict()
#             temp['id'] = x[0]
#             temp['origin'] = x[1]
#             temp['tagger'] = x[2]
#             final.append(temp)
#         print(final)
#         return jsonify(final)
#     else:
#         # cur = mysql.connection.cursor()
#         # cur.execute('''drop table history ''')
#         # cur.execute('''create table history (id varchar(100), origin varchar(100), tagger varchar(100))''')
#         # return 'ok'

#         text = request.json["tagger"]
#         tagger = exec(text)
#         isExist = None
#         cur = mysql.connection.cursor()
#         # cur.execute('''select * from history''')
#         # cur.execute('''insert into history values(2,'đây là origin 2','đây  là tagger 2')''')
#         # mysql.connection.commit()
#         # return 'ok'
#         if request.json['checked']:
#             cur.execute("select * from history where origin= '%s'" % text)
#             isExist = cur.fetchall()
#             if not isExist:
#                 cur.execute(
#                     '''insert into history values('%s','%s','%s')''' % (uuid.uuid1(), text, tagger))
#                 mysql.connection.commit()
#             return jsonify({'origin': text, 'tagger': tagger})
#         else:
#             return jsonify({'origin': text, 'tagger': tagger})


# @app.route("/<id>", methods=['GET', 'DELETE'])
# def get_delete_one(id):
#     if request.method == 'GET':
#         # data = db.find_one({"_id": ObjectId(id)})
#         cur = mysql.connection.cursor()
#         cur.execute("select * from history where id= '%s'" % id)
#         data = cur.fetchall()
#         final = dict()
#         for i in data:
#             final['id'] = i[0]
#             final['origin'] = i[1]
#             final['tagger'] = i[2]
#         print([final])
#         return jsonify(([final]))
#     elif request.method == 'DELETE':
#         cur = mysql.connection.cursor()
#         cur.execute("DELETE FROM history WHERE id='%s'" % id)
#         mysql.connection.commit()
#         return jsonify({'message': "deleted"})
