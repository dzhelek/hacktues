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
    message = "https://media.discordapp.net/attachments/692344787344293888/805406588965879808/ev_jureto-05.png?width=1440&height=339"
    description = f'{emojis.WHITE_CHECK_MARK} ОЦЕНЯВАНЕ ОТ ЖУРИТО {emojis.WHITE_CHECK_MARK}'
    title = f'{emojis.SCROLL} РЕГЛАМЕНТ {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    value = f'''Идея - какво е искал да направи отборът (0 - 2 т.):
{emojis.SMALL_ORANGE_DIAMOND} Доколко проектът е по темата?
{emojis.SMALL_ORANGE_DIAMOND} Иновативна ли е идеята - има ли много подобни идеи или не?
{emojis.SMALL_ORANGE_DIAMOND} Доколко е приложима идеята - може ли да се използва в действителност?
'''
    embed.add_field(name=f'4.1 {emojis.BULB}', value=value, inline=False)
    value = f'''Функционалност - какво е успял да реализира отборът (0 - 3 т.):
{emojis.SMALL_ORANGE_DIAMOND} Обхват - какви функционалности има проектът?
{emojis.SMALL_ORANGE_DIAMOND} Доколко реализираните функционалности позволяват, проектът да се използва по предназначение?
'''
    embed.add_field(name=f'4.2 {emojis.GEAR}', value=value, inline=False)
    value = f'''Реализация - колко добре е реализиран проектът (0 - 10 т.):
{emojis.SMALL_ORANGE_DIAMOND} Каква част от проекта е завършена? 
{emojis.SMALL_ORANGE_DIAMOND} Качествена разработка - добре ли е разработен проектът (качествен код и добър хардуер)?
{emojis.SMALL_ORANGE_DIAMOND} Организация (структура) на проекта - виждат ли се ясно отделните елементи в проекта и връзките между тях?
{emojis.SMALL_ORANGE_DIAMOND} Удобен ли е да се адаптира и надгражда проектът - могат ли лесно да се правят промени и да се добавят нови елементи?
{emojis.SMALL_ORANGE_DIAMOND} До колко е удобен за употреба (user experience)?
{emojis.SMALL_ORANGE_DIAMOND} Работа в екип - разпределени ли са задачите според индивидуалните възможности на всеки от екипа?
'''
    embed.add_field(name=f'4.3 {emojis.JIGSAW}', value=value, inline=False)
    value = f'''Презентация - колко добре е представен проектът пред журито (0 - 5 т.):
{emojis.SMALL_ORANGE_DIAMOND} Засегнати ли са въпросите от темплейта - учениците ще получат темплейт, в който е показано какво е задължително да включат в презентацията си.
{emojis.SMALL_ORANGE_DIAMOND} Екипът подготвен ли е за презентиране?
{emojis.SMALL_ORANGE_DIAMOND} Отговаря ли на въпросите на журито, или се опитва да ги избегне?
'''
    embed.add_field(name=f'4.4 {emojis.BAR_CHART}', value=value, inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
