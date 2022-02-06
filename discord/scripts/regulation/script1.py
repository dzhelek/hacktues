# coding=windows-1251
from os import environ

from discord.ext import commands
from discord import Embed

import channels
import emojis

bot = commands.Bot(command_prefix=('хт ', 'ht ', ','))
TOKEN = environ.get('token')


@bot.event
async def on_ready():
    print(f'{bot.user.name}scripts has connected to Discord')
    channel = bot.get_channel(channels.REGULATIONS)
    #await channel.send("https://media.discordapp.net/attachments/792306324125515797/805360546974138408/rules-01.png?width=1440&height=339")
    message = "https://media.discordapp.net/attachments/792306324125515797/805364075324112906/projects-02.png?width=1440&height=339"
    description = f'{emojis.TOOLS} ПРОЕКТИТЕ {emojis.TOOLS}'
    title = f'{emojis.SCROLL} РЕГЛАМЕНТ {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    embed.add_field(name=f'1.1 {emojis.NO_ENTRY}', value="Проектите трябва да са авторски и да се придържат към главната тема на събитието. Тя ще бъде обявена заедно с подтемите 4 дни преди началото на хакатона. Отборите не са задължени да се вмъкват в подтемите - те са насока. Задължително е да се вписват в главната тема.", inline=False)
    embed.add_field(name=f'1.2 {emojis.COMPUTER}', value="По време на работните дни е задължително всеки отбор да съхранява кода на проекта си в публично хранилище като GitHub.", inline=False)
    embed.add_field(name=f'1.3 {emojis.CLOCK9}', value="Версии на кода трябва да се качват на публично хранилище по време на хакатона, като последната версия трябва да е качена до 08:59:59  на 14.03.2021 г.", inline=False)
    embed.add_field(name=f'1.4 {emojis.EXCLAMATION}', value="ВАЖНО: Каквато и да е промяна след този час, ще се счита за нарушение на регламента и организаторите могат да не допуснат отбора до полуфинали и финали. Единствено при embedded проектите, ако се е счупила дадена хардуерна част непосредствено преди представянето, е позволено, но само и единствено, ако организаторите бъдат уведомени.", inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
