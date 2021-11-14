from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import json, traceback
# base和token會在cmd(命令提示元)，啟動jupyter notebook時出現


app = Flask(__name__)
app.config["DEBUG"] = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, always_connect=True, engineio_logger=True)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('client_event')
def client_msg(msg):
    with open('./1306.jpg', 'rb') as file:
        img = file.read()
    email = msg['email']
    pwd = msg['password']
    msg = {'email': email, 'passwd': pwd}
    #emit('server_response', {'data': msg})


@socketio.on('connect_event')
def connected_msg(msg):
    print('[INFO] Web client connected: {}'.format(request.sid))
    emit('server_response', {'data': msg['data']})




if __name__ == '__main__':
    socketio.run(app, debug=True, host='127.0.0.1', port=5000)




# @socketio.on('client_event')
# def client_msg(msg):
#     # 我們只拿Code執行完的訊息結果，其他訊息將被忽略
#     try:
#         ws = module.execute_on_websocket_channel(notebook_path, base, headers)
#         ws.send(json.dumps(module.send_execute_request(msg['data'])))
#         while True:
#                     rsp = json.loads(ws.recv())
#                     msg_type = rsp["msg_type"]
#         # 顯示列印內容
#                     if msg_type == "stream":
#                         emit('server_response', {'data': rsp["content"]["text"]})
#                     elif msg_type == "execute_result":
#                                     # 顯示圖片編碼
#                                     if "image/png" in (rsp["content"]["data"].keys()):
#                                         emit('server_response', {'data': rsp["content"]["data"]["image/png"]})
#                     # 顯示輸出結果
#                                     else:
#                                         emit('server_response', {'data': rsp["content"]["data"]["text/plain"]})
#         # 顯示計算表格
#                     elif msg_type == "display_data":
#                         emit('server_response', {'data': rsp["content"]["data"]["image/png"]})
#         # 顯示錯誤訊息
#                     elif msg_type == "error":
#                         emit('server_response', {'data': rsp["content"]["traceback"]})
#         # 當狀態為idle，代表ws.recv()已經沒有任何訊息
#                     elif msg_type == "status" and rsp["content"]["execution_state"] == "idle":
#                         ws.close()
#                         break
#     except:
#             traceback.print_exc()
#             ws.close()