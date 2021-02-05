#!/usr/bin/env python3
# coding=windows-1251
from os import environ

import aiohttp
import discord
from discord.ext import commands
from discord import utils

import emojis
import channels
from tasks import UserListener
from utils import authorize, request

TOKEN = environ.get('token')

bot = commands.Bot(command_prefix=('хт ', 'ht ', '.'))


@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord')


@bot.event
async def on_command_error(ctx, exc):
    await send_log(f'{ctx.channel.mention}: {ctx.message.content}\n{exc}',
                   bot)
    raise exc


@bot.event
async def on_member_join(member):
    auth = await authorize(bot)
    async with aiohttp.ClientSession(headers=auth) as client:
        members_json = await request(bot, client, path='users/')

        member_found = False
        for member_json in members_json:
            if member_json['discord_id'] == member.id:
                member_found = True
                break

        if not member_found:
            await send_log(f'{emojis.EXCLAMATION} {member.name} '
                           'was not found in database', bot)
            return

        reason = 'member join'
        if member_json['team_set']:
            team_json = await request(bot, client, url=member_json['team_set'][-1])

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


@bot.command(aliases=['х', 'h'])
async def хелп(ctx):
    await ctx.send_help()


@bot.command(aliases=['s', 'с'])
async def send(ctx, channel: discord.TextChannel, *, message):
    await channel.send(message)


@bot.command(aliases=['прати покани', 'si'])
async def send_invites(ctx):
    auth = await authorize(bot)
    async with aiohttp.ClientSession(headers=auth) as client:
        users_json = await request(bot, client, path='users/')
        for user_json in users_json:
            if user_json['discord_id']:
                invite = await bot.get_channel(channels.REGULATIONS).\
                    create_invite(max_uses=1, reason='send_invites command')
                user = await bot.fetch_user(user_json['discord_id'])
                await user.send(invite)


@bot.command(aliases=['j', 'виж', 'в'])
async def join(ctx, *, role: discord.Role):
    await ctx.author.add_roles(role, reason="join")
    await ctx.message.delete()


@bot.command(aliases=['l', 'напусни', 'н'])
async def leave(ctx, *, role: discord.Role):
    await ctx.author.remove_roles(role, reason="leave")
    await ctx.message.delete()


async def edit_status(message, status, проблем):
    content = f"{emojis.TICKETS}: {проблем} (статус: {status})"
    await message.edit(content=content)


@bot.command(aliases=('проблем', 'п', 'p'))
async def problem(ctx, *, проблем="не е посочен конкретен проблем"):
    assert 'team' in ctx.channel.name, 'problem outside team channel'
    roles = ['team' in str(role) for role in ctx.author.roles]
    assert any(roles), 'problem from non-participant'
    team_role = ctx.author.roles[roles.index(True)]

    reason = 'ticket system'
    status = f"{emojis.TICKETS} отворенo"
    content = f"{emojis.TICKETS}: {проблем} (статус: {status})"
    message = await bot.get_channel(channels.PROBLEMS).send(content)

    def check_tickets(r, u):
        return (str(r) == emojis.TICKETS and
                u != bot.user and r.message.id == message.id)

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
        _, mentor = await bot.wait_for('reaction_add', check=check_tickets)
        await mentor.add_roles(team_role, reason=reason)
        await message.clear_reaction(emojis.TICKETS)
        status = f"{emojis.X} в процес на разрешаване…"
        await edit_status(message, status, проблем)

        await message.add_reaction(emojis.WHITE_CHECK_MARK)
        await message.add_reaction(emojis.NEGATIVE_SQUARED_CROSS_MARK)
        content = f"<@{mentor.id}> се зае с вашия {emojis.TICKETS}проблем!"
        await ctx.channel.send(content)
        reaction, _ = await bot.wait_for('reaction_add',
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


@bot.command(aliases=['пинг'])
async def ping(ctx):
    await ctx.send(f"\U0001F3D3 Понг с {str(round(bot.latency, 2))} s")


async def get_team_role(team_name, guild, reason):
    role = utils.get(guild.roles, name=team_name)
    if role is None:
        role = await guild.create_role(reason=reason, name=team_name)
        perms = {
            guild.default_role:
                discord.PermissionOverwrite(view_channel=False),
            role:
                discord.PermissionOverwrite(view_channel=True)
        }
        category = await guild.create_category(
            team_name, overwrites=perms, reason=reason
        )
        await guild.create_text_channel(team_name, category=category)
        await guild.create_voice_channel(team_name, category=category)
    return role


@bot.command(aliases=['ft'])
async def fetch_teams(ctx):
    auth = await authorize(bot)
    async with aiohttp.ClientSession(headers=auth) as client:
        teams_json = await request(bot, client, path='teams/')
        for team_json in teams_json:
            team_name = 'team ' + team_json['name']
            await bot.get_channel(channels.TEAMS).send(team_name)


bot.add_cog(UserListener(bot))
bot.run(TOKEN)
