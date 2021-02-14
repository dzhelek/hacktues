from os import environ

import aiohttp
from discord import utils, channel
from discord.ext import commands

import emojis
import channels
from utils import get_team_role, request, send_log


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

        if isinstance(message.channel, channel.DMChannel):
            guild = await self.bot.fetch_guild(747517305164005456)
            name = message.author.display_name.replace(' ', '-').lower()
            text_channel = utils.get(guild.channels, name=name)
            if not text_channel:
                category = await self.bot.fetch_channel(channels.DM)
                text_channel = await guild.create_text_channel(
                    name, category=category
                )
            await text_channel.send(message.content)
            for attachment in message.attachments:
                await text_channel.send(attachment.url)

            if environ.get(name):
                return
            environ[name] = "1"

            def check(m):
                return (m.channel == text_channel and
                        m.author != self.bot.user)

            content = await self.bot.wait_for('message', check=check)
            await message.author.send(content.content)
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

            reason = 'member join'
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
