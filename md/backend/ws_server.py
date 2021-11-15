import websockets
import asyncio

PORT = 3002

print("server listening on port "+ str(PORT))

connected = set()

async def echo(websocket, path):
    print("Client connected")
    connected.add(websocket)
    try:
        async for message in websocket:
            print("MSG is "+ message)
            for conn in connected:
                if conn == websocket:   #改成 not = 就是傳給其他人
                    await conn.send("Response: " + message)
    except websockets.exceptions.ConnectionClosed as e:
        print("Client disconnected")
    finally:
        connected.remove(websocket)
        
start_server = websockets.serve(echo,"localhost",PORT)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()