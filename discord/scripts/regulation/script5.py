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
    message = "https://media.discordapp.net/attachments/692344787344293888/805414375816691712/grandefinale-06.png?width=1440&height=339"
    description = f'{emojis.CHECKERED_FLAG} ПОЛУФИНАЛИ И ФИНАЛИ {emojis.CHECKERED_FLAG}'
    title = f'{emojis.SCROLL} РЕГЛАМЕНТ {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    value = "Всеки отбор ще представи своя проект пред жури, съставено от преподаватели в ТУЕС, ТУЕС алумни, представители на компаниите-спонсори и специалисти в IT бранша."
    embed.add_field(name=f'5.1 {emojis.BRAIN}', value=value, inline=False)
    value = "На полуфиналите всеки отбор ще има 8 минути за представяне и 7 минути време за въпроси от страна на журито.\nНа финалите отборите ще имат по 10 минути за презентиране на проекта и по 10 минути за въпроси от страна на журито. "
    embed.add_field(name=f'5.2 {emojis.STOPWATCH}', value=value, inline=False)
    value = "ВАЖНО: Всеки отбор е длъжен да спазва времевия си диапазон и ако водещият го прекъсне, не бива да продължава, тъй като журито има право да санкционира точки за превишено време."
    embed.add_field(name=f'5.3 {emojis.EXCLAMATION}', value=value, inline=False)
    value = f'''До финал ще достигнат 7 отбора:
{emojis.SMALL_ORANGE_DIAMOND} 6-те най-добри отбора от полуфиналите, т.е. от полуфинал ще бъдат отразени по 2 или 3 отбора в зависимост от броя на полуфиналите;
{emojis.SMALL_ORANGE_DIAMOND} 1 “Финалист на менторите” - отборът с най-висока менторска оценка от класираните на 3-то място във всеки полуфинал.
'''
    embed.add_field(name=f'5.4 {emojis.TROPHY}', value=value, inline=False)
    value = f'''Най-добрите 3 проекта от финалите ще бъдат наградени съответно с 1-во, 2-ро и 3-то място.
Ще бъде показана класация на отборите:
{emojis.SMALL_ORANGE_DIAMOND} отделни класации за всеки един полуфинал;
{emojis.SMALL_ORANGE_DIAMOND} обща класация за финалистите.
'''
    embed.add_field(name=f'5.5 {emojis.FIRST_PLACE}{emojis.SECOND_PLACE}{emojis.THIRD_PLACE}', value=value, inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
