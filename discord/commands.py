# coding=windows-1251
import random
from aiohttp.helpers import TOKEN

import discord
from discord.ext import commands

import channels
import emojis
from utils import remessage

import re
from datetime import date

class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.has_role('Организатор')
    @commands.command(aliases=['s', 'с'])
    async def send(self, ctx, channel: discord.TextChannel, *, message=''):
        await remessage(channel.send, message, ctx.message)

    @commands.has_role('Организатор')
    @commands.command(aliases=['m', 'съобщение', 'м'])
    async def message(self, ctx, user: discord.User, *, message=''):
        await remessage(user.send, message, ctx.message)
        await ctx.send(f"sent to {user.id}")

    @commands.check_any(commands.has_role('Организатор'),
                        commands.has_role('оценител'),
                        commands.has_role('ЕКО'))
    @commands.command(aliases=['j', 'виж', 'в', '+'])
    async def join(self, ctx, *, role: discord.Role):
        await ctx.author.add_roles(role, reason="join")

    @commands.check_any(commands.has_role('Организатор'),
                        commands.has_role('оценител'),
                        commands.has_role('ЕКО'))
    @commands.command(aliases=['l', 'напусни', 'н', '-'])
    async def leave(self, ctx, *, role: discord.Role):
        await ctx.author.remove_roles(role, reason="leave")

    async def edit_status(self, message, status, проблем, team):
        content = f"{emojis.TICKETS}проблем от {team}: {проблем} (статус: {status})"
        await message.edit(content=content)

    @commands.command(aliases=('проблем', 'п', 'p'))
    async def problem(self, ctx, *, проблем="не е посочен конкретен проблем"):
        assert 'team' in ctx.channel.name, 'problem outside team channel'
        roles = ['team' in str(role) for role in ctx.author.roles]
        assert any(roles), 'problem from non-participant'
        team_role = ctx.author.roles[roles.index(True)]

        reason = 'ticket system'
        status = f"{emojis.TICKETS} отворенo"
        content = f"{emojis.TICKETS}проблем от {team_role.name}: {проблем} (статус: {status})"
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

        content = (f"Вашият {emojis.TICKETS}проблем беше "
                   "изпратен до менторите успешно!")
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
            status = f"{emojis.X} в процес на разрешаване…"
            await self.edit_status(message, status, проблем, team_role.name)

            await message.add_reaction(emojis.WHITE_CHECK_MARK)
            await message.add_reaction(emojis.NEGATIVE_SQUARED_CROSS_MARK)
            content = f"<@{mentor.id}> се зае с вашия {emojis.TICKETS}проблем!"
            await ctx.channel.send(content)
            claimed = await self.bot.fetch_channel(channels.CLAIMED)
            await claimed.send(mentor_name)
            reaction, _ = await self.bot.wait_for('reaction_add',
                                                  check=check_yesno(mentor))
            await mentor.remove_roles(team_role, reason=reason)
            await message.clear_reaction(emojis.WHITE_CHECK_MARK)
            await message.clear_reaction(emojis.NEGATIVE_SQUARED_CROSS_MARK)

            if str(reaction) == emojis.WHITE_CHECK_MARK:
                status = f"{emojis.WHITE_CHECK_MARK} приключено"
                await self.edit_status(message, status, проблем, team_role.name)
                content = (f"{emojis.TICKETS}Проблемът ви "
                           "беше отбелязан като разрешен!")
                await ctx.channel.send(content)
                closed = await self.bot.fetch_channel(channels.CLOSED)
                await closed.send(mentor_name)
                break

            await self.edit_status(message, f"{emojis.TICKETS} отворенo",
                                   проблем, team_role.name)
            content = f"{emojis.TICKETS}Проблемът ви беше повторно отворен!"
            await ctx.channel.send(content)
            reopened = await self.bot.fetch_channel(channels.REOPENED)
            await reopened.send(mentor_name)

    @commands.command(aliases=['пинг'])
    async def ping(self, ctx):
        await ctx.send(f"{emojis.PONG} Понг с "
                       f"{str(round(self.bot.latency, 2))} s")

    @commands.command(aliases=['мотивирай', 'мот', 'mot'])
    async def motivate(self, ctx):
        channel = await self.bot.fetch_channel(channels.MOTIVATIONS)
        messages = [message async for message in channel.history()]
        message = random.choice(messages)
        await ctx.send(message.embeds[0].url)

    # гришо е написал в канала какво да се прави
    @commands.command(aliases=['email'])
    async def auth_email(self, ctx, email):
        # Да се откоментира в prod
        #assert 'верификация-за-участие' in ctx.channel.name, 'problem outside auth channel'
        
        if(len(ctx.message.content.split()) != 3):
            # TODO: Хубаво е да го пише на лично на човека.
            print("Грешен формат. Пр. 'ht email ivan.i.ivanov.2019@elsys-bg.org'")
        
        # token = int(''.join([str(random.randint(0,10)) for _ in range(5)]))
        # TODO: check if token exists
        # print("Email: " + email, "Token " + token)
        # TODO: add the token to the database
        # TODO: send to email the token

    # TODO: само ако няма роли потребители
    @commands.command(aliases=['token'])
    async def auth_token(self, ctx, token):
        # Да се откоментира в prod
        # assert 'верификация-за-участие' in ctx.channel.name, 'problem outside auth channel'

        if(len(ctx.message.content.split()) != 3):
            # TODO: Хубаво е да го пише на лично на човека.
            print("Грешен формат. Пр. 'ht token 19420'")

        # TODO: if the token matches the database one
        if():
            pass
        # TODO: get email from database using the token
        email = 'iskren.b.aleksandrov.2018@elsys-bg.org'
        matches = re.findall(r"[\w']+", email)
        nickname = matches[0].capitalize() + ' ' + matches[2].capitalize() + ' (' + str(7 + (date.today().year - int(matches[3]))) + ')'
        # TODO: logs
        await ctx.author.edit(nick=nickname)

        role = discord.utils.get(ctx.author.guild.roles, name="Потребител")
        await ctx.author.add_roles(role, reason="authenticated")
        # print(email)
