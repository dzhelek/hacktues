# coding=utf-8
import aiohttp
from discord import utils
from discord.ext import tasks, commands

from utils import get_team_role, request, send_log

import channels


class Tasks(commands.Cog):
    def __init__(self, bot):
        self.reason = 'tasks'
        self.bot = bot
        self.fetch_teams.start()

    def cog_unload(self):
        self.fetch_teams.cancel()

    @tasks.loop(minutes=15)
    async def fetch_teams(self):
        print('fetching teams...')
        async with aiohttp.ClientSession() as client:
            teams = await request(self.bot, client, path='api/team/get-teams/')['response']

        await self.all_teams.delete()
        self.all_teams = (await self.teams_channel.
                          send("self.all_teams: "))
        count = len(teams)
        await self.label.edit(name=f'Брой отбори: {count}')
        for team in teams:
            team_name = 'team ' + team['name']
            await self.all_teams.edit(
                content=f"{self.all_teams.content}\n{team_name}"
            )
            role = await get_team_role(team_name, self.guild, self.reason)
            for user in team['users']:
                try:
                    member = await self.guild.fetch_member(user['discord_id'])
                except Exception:
                    continue
                await member.add_roles(role, reason=self.reason)

        print('fetching users...')
        async with aiohttp.ClientSession() as client:
            users = await request(self.bot, client, path='users/')

        for user in users:
            try:
                member = await self.guild.fetch_member(user['discord_id'])
            except Exception:
                continue
            roles = [role for role in member.roles if 'team' in role.name]

            if not user['is_captain']:
                await member.remove_roles(self.captain_role,
                                          reason=self.reason)
            else:
                await member.add_roles(self.captain_role, reason=self.reason)

            if not user['team_set'] or len(roles) > 1:
                await member.remove_roles(*roles, reason=self.reason)
                await member.add_roles(self.captain_role, reason=self.reason)

    @fetch_teams.before_loop
    async def after_init(self):
        await self.bot.wait_until_ready()
        self.guild = await self.bot.fetch_guild(871120127976951818)
        self.label = await self.bot.fetch_channel(channels.REGISTERED)
        self.teams_channel = await self.bot.fetch_channel(channels.TEAMS)
        self.all_teams = await self.teams_channel.send(":")
        self.captain_role = utils.get(self.guild.roles, name='captain')

    @fetch_teams.error
    async def on_exception(self, exc):
        await send_log(str(exc), self.bot)
        self.fetch_teams.restart()
        raise exc
