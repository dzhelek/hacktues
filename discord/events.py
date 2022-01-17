# coding: utf-8
from os import environ
import os

import aiohttp
from discord import utils, channel
from discord.ext import commands
from utils import remessage

import emojis
import channels
from utils import get_team_role, resend, request, send_log

import discord
from discord.ext import commands

from emojis import SUNGLASSES, SAD

class Events(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_ready(self):
        print(f'{self.bot.user.name} has connected to Discord')

    @commands.Cog.listener()
    async def on_command_error(self, ctx, exc):
        await send_log(f'{ctx.channel.mention}: {ctx.message.content}\n{exc}',
                       self.bot)
        raise exc

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author == self.bot.user:
            return

        if message.channel.id == channels.TEAMS:
            await message.delete()
            # await send_log(f"{name} to <#{channels.TEAMS}>:\n"
            #                f"{message.content}", self.bot)
            return

        if message.channel.id == channels.AUTH:
            message_copy = message
            await message.delete()
            if(message_copy.content[0].isdigit()):

                auth_token = os.getenv('auth_token')
                headers = {"Authorization": f"Bearer {auth_token}"}
                async with aiohttp.ClientSession(headers=headers) as client:
                    response = await request(self.bot, client, path='api/user/validate-discord-token', discordToken=message_copy.content)
                    if(response['success']):
                        if(response['isMentor']):
                            role = discord.utils.get(message_copy.guild.roles, name="Ментор")
                            await message_copy.author.add_roles(role, reason="authenticated mentor")
                            return

                        nickname = response['fullName']
                        await message_copy.author.edit(nick=nickname)

                        role = discord.utils.get(message_copy.guild.roles, name="Потребител")
                        await message_copy.author.add_roles(role, reason="authenticated")
            
            elif('@' in message_copy):
                assert 'верификация' in message_copy.channel.name, 'Problem outside auth channel'
                
                if(len(message_copy.message.content.split()) != 3):
                    await remessage(message_copy.author.send, f'Здравей, Гришо е!\n Радвам се да те видя {SUNGLASSES}. Пиша, за да ти кажа, че ползваш грешен формат.. Форматът е "ht email ivan.i.ivanov.2020@elsys-bg.org"', message_copy.message)
                    return

                auth_token = os.getenv('auth_token')
                headers = {"Authorization": f"Bearer {auth_token}"}
                async with aiohttp.ClientSession(headers=headers) as client:
                    response = await request(self.bot, client, path='api/user/get-discord-token', email=message_copy.content, feedback=True)
                    if(response['success']):
                        await remessage(message_copy.author.send, f'Хей, Гришо е! Радвам се да те видя {SUNGLASSES}\nПиша, за да ти кажа, че ти пратих имейл с кода за верификация. Екипът на HackTUES Infinity ти пожелава приятно изкарване в сървъра', message_copy.message)
                    # elif (not response['success'] and ('' in response['errors'])):
                    else:
                        err_msg = list(response['errors'].values())[0]
                        await remessage(message_copy.author.send, f'Хей, Гришо е!\n{err_msg} \n{SAD}', message_copy.message)

                    
        if isinstance(message.channel, channel.DMChannel):
            guild = await self.bot.fetch_guild(871120127976951818)
            name = message.author.display_name.replace(' ', '-').lower()
            chans = await guild.fetch_channels()
            text_channel = [chan for chan in chans if chan.name == name]
            if not text_channel:
                category = await self.bot.fetch_channel(channels.DM)
                text_channel = await guild.create_text_channel(
                    name, category=category
                )
            else:
                text_channel = text_channel[0]
            await resend(text_channel, message)
            if environ.get(name):
                return
            environ[name] = "1"

            def check(m):
                return (m.channel == text_channel and
                        m.author != self.bot.user)

            content = await self.bot.wait_for('message', check=check)
            await resend(message.author.dm_channel, content)
            await text_channel.send(f'sent to {message.author.id}')

            del environ[name]

    @commands.Cog.listener()
    async def on_member_update(self, before, after):
        if before == self.bot.user:
            return

        if before.pending == after.pending:
            return

        member = after
        print("new member")

        async with aiohttp.ClientSession() as client:
            members_json = await request(self.bot, client, path='users/')

            member_found = False
            for member_json in members_json:
                if member_json['discord_id'] == member.id:
                    member_found = True
                    break

            if not member_found:
                await send_log(f'{emojis.EXCLAMATION} {member.name}#'
                               f'{member.discriminator} '
                               'was not found in database', self.bot)
                return

            reason = 'member joined'
            role = utils.get(member.guild.roles, name='филър')
            await member.add_roles(role, reason=reason)

            if member_json['team_set']:
                team_id = member_json['team_set'][-1]
                team_json = await request(self.bot, client,
                                          path=f'/teams/{team_id}/')
                team_name = 'team ' + team_json['name']
                role = await get_team_role(team_name, member.guild, reason)
                await member.add_roles(role, reason=reason)
                if member_json['is_captain']:
                    role = utils.get(member.guild.roles, name='captain')
                    await member.add_roles(role, reason=reason)
            else:
                # member has no team
                role = utils.get(member.guild.roles, name='captain')
                await member.add_roles(role, reason=reason)

        await member.edit(
            nick=f"{member_json['first_name']} {member_json['last_name']}"
            f" - {member_json['form']}"
        )
