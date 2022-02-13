# coding=windows-1251
from os import environ

from discord.ext import commands
from discord import Embed

import channels
import emojis

bot = commands.Bot(command_prefix=('�� ', 'ht ', ','))
TOKEN = environ.get('token')


@bot.event
async def on_ready():
    print(f'{bot.user.name}scripts has connected to Discord')
    channel = bot.get_channel(channels.REGULATIONS)
    message = "https://media.discordapp.net/attachments/692344787344293888/805387893039562772/mentors-03.png?width=1440&height=339"
    description = f'{emojis.MUSCLE} ������� {emojis.MUSCLE}'
    title = f'{emojis.SCROLL} ��������� {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    embed.add_field(name=f'2.1 {emojis.TICKETS}', value=f"��������� �� ����. ����� ���� �� ��� ���� �� �� ������ �� �����, ���� ���� ������� �������� ��, ������� � �������. ������������� � ��������� �� �� ����������� ���� ����� Discord ������. � <#{channels.MENTOR_SYSTEM}> �� �������� ����� ��� ������ ����������� �������.", inline=False)
    embed.add_field(name=f'2.2 {emojis.SILHOUETTES}', value="����� ��-����������� ���� ��������� ���� ������ �� ��� � ��������� �������. �� ���� �� �� ������� � ������������ ��������, �� �� ����� �� ���� ������������, �� �� ���������� ������ �� ��������� �� ������ ������ � ������ ����.", inline=False)
    embed.add_field(name=f'2.3 :teacher:', value="����� �� ��������� � �� �� ���������� �� ����� �� ��������� ���.", inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
