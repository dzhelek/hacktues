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
    message = "https://media.discordapp.net/attachments/692344787344293888/805406588965879808/ev_jureto-05.png?width=1440&height=339"
    description = f'{emojis.WHITE_CHECK_MARK} ��������� �� ������ {emojis.WHITE_CHECK_MARK}'
    title = f'{emojis.SCROLL} ��������� {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    value = f'''���� - ����� � ����� �� ������� ������� (0 - 2 �.):
{emojis.SMALL_ORANGE_DIAMOND} ������� �������� � �� ������?
{emojis.SMALL_ORANGE_DIAMOND} ���������� �� � ������ - ��� �� ����� ������� ���� ��� ��?
{emojis.SMALL_ORANGE_DIAMOND} ������� � ��������� ������ - ���� �� �� �� �������� � ��������������?
'''
    embed.add_field(name=f'4.1 {emojis.BULB}', value=value, inline=False)
    value = f'''�������������� - ����� � ����� �� ��������� ������� (0 - 3 �.):
{emojis.SMALL_ORANGE_DIAMOND} ������ - ����� ��������������� ��� ��������?
{emojis.SMALL_ORANGE_DIAMOND} ������� ������������� ��������������� ����������, �������� �� �� �������� �� ��������������?
'''
    embed.add_field(name=f'4.2 {emojis.GEAR}', value=value, inline=False)
    value = f'''���������� - ����� ����� � ���������� �������� (0 - 10 �.):
{emojis.SMALL_ORANGE_DIAMOND} ����� ���� �� ������� � ���������? 
{emojis.SMALL_ORANGE_DIAMOND} ���������� ���������� - ����� �� � ���������� �������� (��������� ��� � ����� �������)?
{emojis.SMALL_ORANGE_DIAMOND} ����������� (���������) �� ������� - ������ �� �� ���� ��������� �������� � ������� � �������� ����� ���?
{emojis.SMALL_ORANGE_DIAMOND} ������ �� � �� �� �������� � ��������� �������� - ����� �� ����� �� �� ������ ������� � �� �� ������� ���� ��������?
{emojis.SMALL_ORANGE_DIAMOND} �� ����� � ������ �� �������� (user experience)?
{emojis.SMALL_ORANGE_DIAMOND} ������ � ���� - ������������ �� �� �������� ������ �������������� ����������� �� ����� �� �����?
'''
    embed.add_field(name=f'4.3 {emojis.JIGSAW}', value=value, inline=False)
    value = f'''����������� - ����� ����� � ���������� �������� ���� ������ (0 - 5 �.):
{emojis.SMALL_ORANGE_DIAMOND} ��������� �� �� ��������� �� ��������� - ��������� �� ������� ��������, � ����� � �������� ����� � ������������ �� ������� � ������������� ��.
{emojis.SMALL_ORANGE_DIAMOND} ������ ��������� �� � �� ������������?
{emojis.SMALL_ORANGE_DIAMOND} �������� �� �� ��������� �� ������, ��� �� ������ �� �� �������?
'''
    embed.add_field(name=f'4.4 {emojis.BAR_CHART}', value=value, inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
