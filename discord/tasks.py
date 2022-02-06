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

    @tasks.loop(minutes=3)
    async def fetch_teams(self):
        print('fetching teams...')

        async with aiohttp.ClientSession() as client:
            teams = await request(self.bot, client, path='api/team/get-teams')
            teams = teams['response']

        # Writes every team as a text message in a separate channel
        await self.all_teams.delete()
        self.all_teams = (await self.teams_channel.
                          send("self.all_teams: "))
        count = len(teams)
        await self.label.edit(name=f'Брой отбори: {count}')
        
        for team in teams:
            team_name = 'team ' + team['teamName']
            await self.all_teams.edit(
                content=f"{self.all_teams.content}\n{team_name}"
            )
            '''
            # ? Cycle through every team's members and try
            # ? to find them in discord and set their *team* role
            role = await get_team_role(team_name, self.guild, self.reason)
            for user in team['member']:
                try:
                    member = await self.guild.fetch_member(user['discord_id'])
                except Exception:
                    continue
                await member.add_roles(role, reason=self.reason)
        '''
        # ? Cycle through users and sets *captain*, *team* roles
        print('fetching users...')
        async with aiohttp.ClientSession() as client:
            users = await request(self.bot, client, path='api/user/get-discord-users')
            users = users['response']

        for user in users:
            print("user", user)

            # The owner of the guild
            if(user['discordId'] == '301127355014053889'):
                continue

            try:
                member = await self.guild.fetch_member(user['discordId'])
            except Exception:
                continue

            reason = "Member joined"
            participant_r = utils.get(member.guild.roles, name='Участник')
            unapproved_r = utils.get(member.guild.roles, name='Непотвърден')
            if(user['teamName'] is not None):
                team_name = 'team ' + user['teamName']
                team_r = await get_team_role(team_name, member.guild, reason)

            if participant_r not in member.roles:
                await member.add_roles(participant_r, reason=reason)
            if unapproved_r in member.roles:
                await member.remove_roles(unapproved_r, reason=reason)
            if team_r not in member.roles and (user['teamName'] is not None):
                await member.add_roles(team_r, reason=reason)

            await member.edit(nick=f"{user['fullName']} {user['studentClass']}")

            roles = [role for role in member.roles if 'team' in role.name]
            if len(roles) > 0 and user['teamName'] is None:
                print("Removing roles for", user['fullName'])
                await member.remove_roles(*roles, reason=self.reason)

            if not user['isCaptain']:
                await member.remove_roles(self.captain_role,
                                          reason=self.reason)
            else:
                await member.add_roles(self.captain_role, reason=self.reason)

            if len(roles) > 1:
                await member.remove_roles(*roles, reason=self.reason)
                team_name = 'team ' + user["teamName"]
                role = await get_team_role(team_name, member.guild, reason)
                await member.add_roles(role, reason=self.reason)
                
        

    @fetch_teams.before_loop
    async def after_init(self):
        await self.bot.wait_until_ready()
        self.guild = await self.bot.fetch_guild(871120127976951818)
        self.label = await self.bot.fetch_channel(channels.REGISTERED)
        self.teams_channel = await self.bot.fetch_channel(channels.TEAMS)
        self.all_teams = await self.teams_channel.send(":")
        self.captain_role = utils.get(self.guild.roles, name='Капитан')

    @fetch_teams.error
    async def on_exception(self, exc):
        await send_log(str(exc), self.bot)
        self.fetch_teams.restart()
        raise exc
