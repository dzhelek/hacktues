from os import environ

import aiohttp
import discord
from discord.ext import commands
from discord import utils

if environ.get('ENV') == 'DEV':
    host = 'http://localhost:8000'
else:
    host = 'https://hacktues.pythonanywhere.com'

TOKEN = environ.get('token')

auth = aiohttp.BasicAuth('hacktues', 'Go Green')

bot = commands.Bot(command_prefix='!')


async def fetch(client, path='', url=None):
    if url is None:
        url = f'{host}/{path}'

    async with client.get(url) as response:
        return await response.json()


@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord')


@bot.event
async def on_member_join(member):
    async with aiohttp.ClientSession(auth=auth) as client:
        members_json = await fetch(client, path='users/')

        for member_json in members_json:
            if member_json['username'] == member.name + member.discriminator:
                break

        if team_set := member_json['team_set']:
            team_json = await fetch(client, url=team_set[-1])

            team_name = 'team ' + team_json['name']
            guild = member.guild
            reason = 'member join'

            role = utils.get(guild.roles, name=team_name)
            if role is None:
                role = await guild.create_role(reason=reason, name=team_name)

                perms = {
                    guild.default_role:
                        discord.PermissionOverwrite(view_channel=False),
                    role: discord.PermissionOverwrite(view_channel=True)
                }

                category = await guild.create_category(
                    team_name, overwrites=perms, reason=reason
                )
                await guild.create_text_channel(team_name, category=category)
                await guild.create_voice_channel(team_name, category=category)
            await member.add_roles(role, reason=reason)


bot.run(TOKEN)

