from os import environ

import aiohttp

import channels

if environ.get('ENV') == 'DEV':
    host = 'http://localhost:8000'
else:
    host = 'https://api.hacktues.com'

USERNAME = 'hacktues'
PASSWORD = 'Go Green'
# USERNAME = 'joan@hello.com'
# PASSWORD = 'hello'


async def send_log(message, bot):
    await bot.get_channel(channels.LOG).send(message)


async def authorize():
    async with aiohttp.ClientSession() as client:
        tokens = await request(
            client, 'token/', email=USERNAME, password=PASSWORD
        )
        return {'Authorization': f"Bearer {tokens['access']}"}


async def request(bot, client, path='', url=None, **kwargs):
    if url is None:
        url = f'{host}/{path}'

    if kwargs:
        func = client.post
    else:
        func = client.get

    async with func(url, data=kwargs) as response:
        json = await response.json()
        if response.status != 200:
            await send_log(f"{func.__name__} {url}\n"
                           f"{response.status} {response.reason}\n"
                           f"```py\n{json}\n```", bot)
            await response.raise_for_status()
        return json
