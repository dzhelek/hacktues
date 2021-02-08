# coding=windows-1251
import discord
from discord.ext import commands

import channels
import emojis


class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.has_role('организатор')
    @commands.command(aliases=['s', 'с'])
    async def send(self, ctx, channel: discord.TextChannel, *, message):
        await channel.send(message)

    @commands.has_role('организатор')
    @commands.command(aliases=['m', 'съобщение', 'м'])
    async def message(self, ctx, user: discord.User, *, message):
        await user.send(message)
        await ctx.send(f"sent to {user.id}")

    @commands.check_any(commands.has_role('организатор'),
                       commands.has_role('оценител'),
                       commands.has_role('ЕКО'))
    @commands.command(aliases=['j', 'виж', 'в', '+'])
    async def join(self, ctx, *, role: discord.Role):
        await ctx.author.add_roles(role, reason="join")

    @commands.check_any(commands.has_role('организатор'),
                       commands.has_role('оценител'),
                       commands.has_role('ЕКО'))
    @commands.command(aliases=['l', 'напусни', 'н', '-'])
    async def leave(self, ctx, *, role: discord.Role):
        await ctx.author.remove_roles(role, reason="leave")

    async def edit_status(self, message, status, проблем):
        content = f"{emojis.TICKETS}проблем: {проблем} (статус: {status})"
        await message.edit(content=content)

    @commands.command(aliases=('проблем', 'п', 'p'))
    async def problem(self, ctx, *, проблем="не е посочен конкретен проблем"):
        assert 'team' in ctx.channel.name, 'problem outside team channel'
        roles = ['team' in str(role) for role in ctx.author.roles]
        assert any(roles), 'problem from non-participant'
        team_role = ctx.author.roles[roles.index(True)]

        reason = 'ticket system'
        status = f"{emojis.TICKETS} отворенo"
        content = f"{emojis.TICKETS}: {проблем} (статус: {status})"
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
            await mentor.add_roles(team_role, reason=reason)
            await message.clear_reaction(emojis.TICKETS)
            status = f"{emojis.X} в процес на разрешаване…"
            await edit_status(message, status, проблем)

            await message.add_reaction(emojis.WHITE_CHECK_MARK)
            await message.add_reaction(emojis.NEGATIVE_SQUARED_CROSS_MARK)
            content = f"<@{mentor.id}> се зае с вашия {emojis.TICKETS}проблем!"
            await ctx.channel.send(content)
            reaction, _ = await self.bot.wait_for('reaction_add',
                                                  check=check_yesno(mentor))
            await mentor.remove_roles(team_role, reason=reason)
            await message.clear_reaction(emojis.WHITE_CHECK_MARK)
            await message.clear_reaction(emojis.NEGATIVE_SQUARED_CROSS_MARK)

            if str(reaction) == emojis.WHITE_CHECK_MARK:
                status = f"{emojis.WHITE_CHECK_MARK} приключено"
                await edit_status(message, status, проблем)
                content = (f"{emojis.TICKETS}Проблемът ви "
                           "беше отбелязан като разрешен!")
                await ctx.channel.send(content)
                break

            await edit_status(message, f"{emojis.TICKETS} отворенo", проблем)
            content = f"{emojis.TICKETS}Проблемът ви беше повторно отворен!"
            await ctx.channel.send(content)

    @commands.command(aliases=['пинг'])
    async def ping(self, ctx):
        await ctx.send(f"{emojis.PONG} Понг с "
                       f"{str(round(self.bot.latency, 2))} s")
