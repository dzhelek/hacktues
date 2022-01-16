# coding=windows-1251
from distutils.log import debug
import random
from urllib import response
from aiohttp.helpers import TOKEN

import discord
from discord.ext import commands

import channels
from emojis import SUNGLASSES, SAD
import emojis
from utils import remessage, request, resend

import re
from datetime import date

import aiohttp
from dotenv import load_dotenv
import os


class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        load_dotenv()

    @commands.has_role('�����������')
    @commands.command(aliases=['s', '�'])
    async def send(self, ctx, channel: discord.TextChannel, *, message=''):
        await remessage(channel.send, message, ctx.message)

    @commands.has_role('�����������')
    @commands.command(aliases=['m', '���������', '�'])
    async def message(self, ctx, user: discord.User, *, message=''):
        await remessage(user.send, message, ctx.message)
        await ctx.send(f"sent to {user.id}")

    @commands.check_any(commands.has_role('�����������'),
                        commands.has_role('��������'),
                        commands.has_role('���'))
    @commands.command(aliases=['j', '���', '�', '+'])
    async def join(self, ctx, *, role: discord.Role):
        await ctx.author.add_roles(role, reason="join")

    @commands.check_any(commands.has_role('�����������'),
                        commands.has_role('��������'),
                        commands.has_role('���'))
    @commands.command(aliases=['l', '�������', '�', '-'])
    async def leave(self, ctx, *, role: discord.Role):
        await ctx.author.remove_roles(role, reason="leave")

    async def edit_status(self, message, status, �������, team):
        content = f"{emojis.TICKETS}������� �� {team}: {�������} (������: {status})"
        await message.edit(content=content)

    @commands.command(aliases=('�������', '�', 'p'))
    async def problem(self, ctx, *, �������="�� � ������� ��������� �������"):
        assert 'team' in ctx.channel.name, 'problem outside team channel'
        roles = ['team' in str(role) for role in ctx.author.roles]
        assert any(roles), 'problem from non-participant'
        team_role = ctx.author.roles[roles.index(True)]

        reason = 'ticket system'
        status = f"{emojis.TICKETS} �������o"
        content = f"{emojis.TICKETS}������� �� {team_role.name}: {�������} (������: {status})"
        problems = await self.bot.fetch_channel(channels.PROBLEMS)
        message = await problems.send(content)

        def check_tickets(r, u):
            return (str(r) == emojis.TICKETS and
                    u != self.bot.user and r.message.id == message.id)

        def check_yesno(mentor):
            def check(r, u):
                return (u == mentor and r.message.id == message.id and
                        (str(r) in (emojis.WHITE_CHECK_MARK,
                         emojis.NEGATIVE_SQUARED_CROSS_MARK)))
            return check

        content = (f"������ {emojis.TICKETS}������� ���� "
                   "�������� �� ��������� �������!")
        await ctx.channel.send(content)

        while True:
            await message.add_reaction(emojis.TICKETS)
            _, mentor = await self.bot.wait_for('reaction_add',
                                                check=check_tickets)
            if mentor.nick:
                mentor_name = mentor.nick
            else:
                mentor_name = mentor.name
            await mentor.add_roles(team_role, reason=reason)
            await message.clear_reaction(emojis.TICKETS)
            status = f"{emojis.X} � ������ �� �����������"
            await self.edit_status(message, status, �������, team_role.name)

            await message.add_reaction(emojis.WHITE_CHECK_MARK)
            await message.add_reaction(emojis.NEGATIVE_SQUARED_CROSS_MARK)
            content = f"<@{mentor.id}> �� ��� � ����� {emojis.TICKETS}�������!"
            await ctx.channel.send(content)
            claimed = await self.bot.fetch_channel(channels.CLAIMED)
            await claimed.send(mentor_name)
            reaction, _ = await self.bot.wait_for('reaction_add',
                                                  check=check_yesno(mentor))
            await mentor.remove_roles(team_role, reason=reason)
            await message.clear_reaction(emojis.WHITE_CHECK_MARK)
            await message.clear_reaction(emojis.NEGATIVE_SQUARED_CROSS_MARK)

            if str(reaction) == emojis.WHITE_CHECK_MARK:
                status = f"{emojis.WHITE_CHECK_MARK} ����������"
                await self.edit_status(message, status, �������, team_role.name)
                content = (f"{emojis.TICKETS}��������� �� "
                           "���� ��������� ���� ��������!")
                await ctx.channel.send(content)
                closed = await self.bot.fetch_channel(channels.CLOSED)
                await closed.send(mentor_name)
                break

            await self.edit_status(message, f"{emojis.TICKETS} �������o",
                                   �������, team_role.name)
            content = f"{emojis.TICKETS}��������� �� ���� �������� �������!"
            await ctx.channel.send(content)
            reopened = await self.bot.fetch_channel(channels.REOPENED)
            await reopened.send(mentor_name)

    @commands.command(aliases=['����'])
    async def ping(self, ctx):
        await ctx.send(f"{emojis.PONG} ���� � "
                       f"{str(round(self.bot.latency, 2))} s")

    @commands.command(aliases=['���������', '���', 'mot'])
    async def motivate(self, ctx):
        channel = await self.bot.fetch_channel(channels.MOTIVATIONS)
        messages = [message async for message in channel.history()]
        message = random.choice(messages)
        await ctx.send(message.embeds[0].url)

    @commands.command(aliases=['email', '�����', '�����'])
    async def auth_email(self, ctx, email):
        # �� �� ����������� � prod
        #assert '�����������' in ctx.channel.name, 'problem outside auth channel'

        if(len(ctx.message.content.split()) != 3):
            await remessage(ctx.author.send, f'�������, ����� �!\n ������ �� �� �� ���� {SUNGLASSES}. ����, �� �� �� ����, �� ������� ������ ������.. �������� � "ht email ivan.i.ivanov.2020@elsys-bg.org"', ctx.message)
            return

        auth_token = os.getenv('auth_token')
        headers = {"Authorization": f"Bearer {auth_token}"}
        async with aiohttp.ClientSession(headers=headers) as client:
            response = await request(self.bot, client, path='api/user/get-discord-token', email=email, feedback=True)
            if(response['success']):
                await remessage(ctx.author.send, f'�������, ����� �! ������ �� �� �� ���� {SUNGLASSES}.\n����, �� �� �� ����, �� �� ������ ����� � ���� �� �����������. ������ �� HackTUES Infinity �� �������� ������� ���������� � �������.', ctx.message)
            else:
                # TODO: not working
                await remessage(ctx.author.send, f'�������, ����� �!\n ����� �� ���� ���������� {SAD} ����������� �� �� ����� �� ����� � �� ������ ��������! \n {response}', ctx.message)

    # TODO: �� �� ����� aliases-a
    @commands.command(aliases=['token'])
    async def auth_token(self, ctx, token):
        # �� �� ����������� � prod
        # assert '�����������' in ctx.channel.name, 'problem outside auth channel'

        # if(len(ctx.message.content) != 5):
        #     print("It's not token")
        #     return

        auth_token = os.getenv('auth_token')
        headers = {"Authorization": f"Bearer {auth_token}"}
        async with aiohttp.ClientSession(headers=headers) as client:
            response = await request(self.bot, client, path='api/user/validate-discord-token', discordToken=token)
            # TODO: if the token matches the database one
            if(response['success']):
                if(response['isMentor']):
                    role = discord.utils.get(
                        ctx.guild.roles, name="������")
                    await ctx.author.add_roles(role, reason="authenticated mentor")
                    return

                nickname = response['fullName']
                await ctx.author.edit(nick=nickname)

                role = discord.utils.get(
                    ctx.guild.roles, name="����������")
                await ctx.author.add_roles(role, reason="authenticated")
            else:
                print(response.errors)

    # TODO: listener za paralelka pri nqkoi kanal (aktivira se ot reakt na suobshtenieto)

    # TODO: Remove this command

    @commands.command(aliases=['role'])
    async def auth_role(self, ctx):
        role = discord.utils.get(ctx.guild.roles, name="����������")
        await ctx.author.add_roles(role, reason="authenticated")

    @commands.command(aliases=['nick'])
    async def auth_nick(self, ctx, nick):
        await ctx.author.edit(nick=nick)
