# coding=windows-1251
import aiohttp
from discord import utils
from discord.ext import tasks, commands

from utils import authorize, request, send_log, get_team_role

import channels


class TeamTask(commands.Cog):
    def __init__(self, bot):
        self.auth = {'Authorization': "Bearer tokensaccess"}
        self.reason = 'new team registered'
        self.bot = bot
        self.count = 0
        self.fetch_teams.start()

    def cog_unload(self):
        self.fetch_teams.cancel()

    @tasks.loop(minutes=1)
    async def fetch_teams(self):
        import ipdb; ipdb.set_trace()
        print('hi')
        async with aiohttp.ClientSession(headers=self.auth) as client:
            try:
                teams = await request(self.bot, client, path='teams/')
            except EnvironmentError:
                self.auth = await authorize(self.bot)
                return

        new_count = len(teams)
        if new_count != self.count:
            await self.label.edit(name=f'ОТБОРИ: {new_count}')
        for i in range(new_count - self.count):
            team = teams[-i - 1]
            team_name = 'team ' + team['name']
            await self.all_teams.edit(f"{self.all_teams.content}'\n'"
                                      f"{team_name}")
            role = await get_team_role(team_name, self.guild, self.reason)
            for user in team['users']:
                member = self.guild.get_member(user['discord_id'])
                if not member:
                    return

                if not member.is_captain:
                    await member.remove_roles(self.captain_role, self.reason)
                await member.add_roles(role, self.reason)

        self.count = new_count

    @fetch_teams.error
    async def on_exception(self, exc):
        await send_log(str(exc), self.bot)
        self.fetch_users.restart()

    @fetch_teams.before_loop
    async def before_loop(self):
        import ipdb; ipdb.set_trace()
        self.guild = await self.bot.fetch_guild(747517305164005456)
        self.label = await self.bot.fetch_channel(channels.REGISTERED)
        teams_channel = await self.bot.get_channel(channels.TEAMS)
        self.all_teams = await (teams_channel.fetch_message(teams_channel
                                .last_message_id))
        self.captain_role = utils.get(self.guild.roles, name='captain')
        await self.bot.wait_until_ready()
