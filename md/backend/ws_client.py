import websockets
import asyncio

async def listen():
    url = "ws://127.0.0.1:3002"
    
    async with websockets.connect(url) as ws:
        while True:
            Message = input()
            await ws.send(Message)
            msg = await ws.recv()
            print(msg)

while True:
    asyncio.get_event_loop().run_until_complete(listen())