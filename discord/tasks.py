# coding=windows-1251
import aiohttp
from discord.ext import tasks, commands

from utils import authorize, request, send_log

import channels

auth = {'Authorization': "Bearer tokensaccess"}#


class UserListener(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.user_len = 0
        self.fetch_users.start()

    def cog_unload(self):
        self.fetch_users.cancel()

    @tasks.loop(minutes=1)
    async def fetch_users(self):
        print('hi')
        global auth
        async with aiohttp.ClientSession(headers=auth) as client:
            try:
                users_json = await request(self.bot, client, path='users/')
            except EnvironmentError:
                auth = await authorize(self.bot)
                return
        new_len = len(users_json)
        if self.user_len < new_len:
            self.user_len = new_len
            await (self.bot.get_channel(channels.REGISTERED).
                   edit(name=f'УЧАСТНИЦИ: {new_len}'))
            user_json = users_json[-1]
            if user_json['discord_id']:
                print(user_json)
                invite = await self.bot.get_channel(channels.REGULATIONS).\
                    create_invite(max_uses=1, reason='user registered')
                user = await self.bot.fetch_user(user_json['discord_id'])
                await user.send(invite)
            else:
                await send_log(f"{user_json['email']} "
                               "registered without discord_id !!!",
                               self.bot)

    @fetch_users.error
    async def on_exception(self, exc):
        await send_log(str(exc), self.bot)
        self.fetch_users.restart()
        
    @fetch_users.before_loop
    async def before_loop(self):
        await self.bot.wait_until_ready()
