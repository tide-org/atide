import asyncio, random, time
import fileinput

async def producer(queue):
    while True:
        for line in fileinput.input():
            print(f'produced {line}')
            await queue.put(line)


async def main():
    queue = asyncio.Queue()

    producers = [asyncio.create_task(producer(queue))]

    asyncio.gather(*producers)
    print('---- done producing')

    await queue.join()

asyncio.run(main())

print("HERE")
