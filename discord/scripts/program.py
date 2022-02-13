# coding=windows-1251
from os import environ

from discord.ext import commands
from discord import Embed

import channels, emojis

bot = commands.Bot(command_prefix=('!'))
TOKEN = environ.get('token')


@bot.event
async def on_ready():
    print(f'{bot.user.name} scripts has connected to Discord')


@bot.command()
async def embed(ctx, *, calendar):
    channel = bot.get_channel(channels.PROGRAM)
    description = '\n' + calendar + '\n'
    description += "Очаквайте скоро от нас повече подробности за последния ден. Полуфиналите и финалите ще се състоят чрез платформата BigBlueButton.\n"
    description += '\n<:youtube:808461189256183838> https://www.youtube.com/channel/UCQcbYkAKPEgfjzvwb2sUWSQ'
    title = f'{emojis.MEDAL} Полуфинали, финал и награждаване {emojis.MEDAL}'
    url = "https://hacktues.com/schedule/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    #embed.set_thumbnail(url=thumbnail)
    await channel.send(embed=embed)

bot.run(TOKEN)
