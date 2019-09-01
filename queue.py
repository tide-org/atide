import asyncio, random, time

async def rnd_sleep(t):
    # sleep for T seconds on average
    await asyncio.sleep(t * random.random() * 2)

async def producer(queue):
    while True:
        token = random.random()
        print(f'produced {token}')
        if token < .05:
            break
        await queue.put(token)
        await rnd_sleep(.1)

async def consumer(queue):
    while True:
        token = await queue.get()
        await rnd_sleep(.3)
        queue.task_done()
        print(f'consumed {token}')

async def main():
    queue = asyncio.Queue()

    # fire up the both producers and consumers
    producers = [asyncio.create_task(producer(queue))
                 for _ in range(3)]
    consumers = [asyncio.create_task(consumer(queue))
                 for _ in range(10)]

    # with both producers and consumers running, wait for
    # the producers to finish
    await asyncio.gather(*producers)
    print('---- done producing')

    # wait for the remaining tasks to be processed
    await queue.join()

    # cancel the consumers, which are now idle
    for c in consumers:
        c.cancel()

asyncio.run(main())
