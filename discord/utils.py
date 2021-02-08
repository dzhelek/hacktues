from os import environ

import aiohttp
import discord
from discord import utils

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
    channel = await bot.fetch_channel(channels.LOG)
    await channel.send(message)


async def authorize(bot):
    async with aiohttp.ClientSession() as client:
        tokens = await request(
            bot, client, 'token/', email=USERNAME, password=PASSWORD
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
        if response.status == 401:
            raise EnvironmentError
        if response.status != 200:
            await send_log(f"{func.__name__} {url}\n"
                           f"{response.status} {response.reason}\n"
                           f"```py\n{json}\n```", bot)
            await response.raise_for_status()
        return json


async def get_team_role(team_name, guild, reason):
    role = utils.get(guild.roles, name=team_name)
    if role is None:
        role = await guild.create_role(reason=reason, name=team_name)
        perms = {
            guild.default_role:
                discord.PermissionOverwrite(view_channel=False),
            role:
                discord.PermissionOverwrite(view_channel=True)
        }
        category = await guild.create_category(
            team_name, overwrites=perms, reason=reason
        )
        await guild.create_text_channel(team_name, category=category)
        await guild.create_voice_channel(team_name, category=category)
    return role
