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
    description += "С Кирилка Ангелова и Виктория Димитрова ще си поговорите за презентацията като компонент на оценяване и подготовката за нея.\n"
    description += '\n<:googlemeet:808419023695773737> https://meet.google.com/okq-mhhz-vdq'
    title = f'{emojis.TOOLS} Уъркшоп “Презентационни умения” {emojis.TOOLS}'
    url = "https://hacktues.com/schedule/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    #embed.set_thumbnail(url=thumbnail)
    await channel.send(embed=embed)

bot.run(TOKEN)
