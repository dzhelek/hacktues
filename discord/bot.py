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
        assert response.status == 200
        return await response.json()


@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord')


@bot.event
async def on_member_join(member):
    print(f'member {member.name} joined')
    print('searching for user...')
    async with aiohttp.ClientSession(auth=auth) as client:
        members_json = await fetch(client, path='users/')

        member_found = False
        username = f'{member.name}#{member.discriminator}'
        for member_json in members_json:
            if member_json['username'] == username:
                print('user was found')
                member_found = True
                break

        if not member_found:
            print('no user was found')
            return


        if team_set := member_json['team_set']:
            print('searching for team...')
            team_json = await fetch(client, url=team_set[-1])

            team_name = 'team ' + team_json['name']
            guild = member.guild
            reason = 'member join'

            role = utils.get(guild.roles, name=team_name)
            if role is None:
                print('creating role and channels...')
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
            print('assigning role to member...')
            await member.add_roles(role, reason=reason)
        else:
            print('member has no team')


bot.run(TOKEN)

