from os import environ

import discord
from discord import errors

import channels
from emojis import SAD

if environ.get('ENV') == 'DEV':
    host = 'http://localhost:8000'
else:
    host = 'https://server.hacktues.com'


async def send_log(message, bot):
    channel = await bot.fetch_channel(channels.LOG)
    await channel.send(message)


async def remessage(send, content, message):
    try:
        await send(content)
    except errors.HTTPException:
        pass
    for attachment in message.attachments:
        f = await attachment.to_file()
        await send(file=f)


async def resend(text_channel, message):
    await remessage(text_channel.send, message.content, message)


async def request(bot, client, path='', url=None, feedback=False, **kwargs):
    if url is None:
        url = f'{host}/{path}'

    if kwargs:
        func = client.post
    else:
        func = client.get

    async with func(url, json=kwargs) as response:
        # print("Trying to decode: ", response)
        json = await response.json()
        print(json)
        if response.status != 200:
            await send_log(f"{func.__name__} {url}\n"
                           f"{response.status} {response.reason}\n"
                           f"```py\n{json}\n```"
                           f"Kwargs: {kwargs}", bot)
            if(feedback is False):
                await response.raise_for_status()
        return json


async def get_team_role(team_name, guild, reason):
    roles = await guild.fetch_roles()
    role = [role for role in roles if role.name == team_name]
    if not role:
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
    else:
        role = role[0]
    return role
