from discord.ext import tasks, commands

from utils import authorize, request, send_log


class UserListener(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.user_len = 0
        self.fetch_users.start()

    def cog_unload(self):
        self.fetch_users.cancel()

    @tasks.loop(seconds=30)
    async def fetch_users(self):
        print('hi')
        auth = await authorize()
        async with aiohttp.ClientSession(headers=auth) as client:
            users_json = await request(client, path='users/')
        new_len = len(users_json)
        if self.user_len < new_len:
            self.user_len = new_len
            print(new_len)
            user_json = users_json[-1]
            if user_json['discord_id']:
                print(user_json)
                invite = await bot.get_channel(channels.REGULATIONS).\
                    create_invite(max_uses=1, reason='user registered')
                user = await bot.fetch_user(user_json['discord_id'])
                await user.send(invite)
            else:
                send_log('user registered without discord_id !!!', self.bot)

    @fetch_users.error
    async def on_exception(self, exc):
        print(str(exc))
        self.fetch_users.restart()
