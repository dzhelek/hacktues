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
    message = "https://media.discordapp.net/attachments/692344787344293888/805388623946973224/ev_mentors-04.png?width=1440&height=339"
    description = f'{emojis.WHITE_CHECK_MARK} ��������� �� ��������� {emojis.WHITE_CHECK_MARK}'
    title = f'{emojis.SCROLL} ��������� {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    embed.add_field(name=f'3.1 {emojis.SILHOUETTE}', value=f"� ���� �� ����� ���� ������� ��� �������� �� ������� ������ �� ��������� ������, ���������� � ������, ����� �������� �� ���������� �����.", inline=False)
    value = f'''�������� �� ������� �� ������ �� �������� ��������:
{emojis.SMALL_ORANGE_DIAMOND} ���������� �������� - ������ �� ��������� �� � �������� ������ � ������� �� ��������? ��������� �� �� ���� �� ���������� ����������� ��� � ��-����� ������ �� ���������?
{emojis.SMALL_ORANGE_DIAMOND} ������ � ���� - ����������� �� �� ���������� �������� � ������? ��������� �� �� ����������� ������� ��?
{emojis.SMALL_ORANGE_DIAMOND} ��������� ���/�������
{emojis.SMALL_ORANGE_DIAMOND} ���������� - ����� ���� �� ������� � ��������� � ������? ��� ������� �� � �������� �������, �� ����� ���� � ���������?
'''
    embed.add_field(name=f'3.2 {emojis.EYES}', value=value, inline=False)
    embed.add_field(name=f'3.3 {emojis.MEDAL}', value="�������� �� ��������� �� �� �������� �� ������������ �� �������� � ������������ �� �������� � ����� �� ��������� �� ���������.", inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
