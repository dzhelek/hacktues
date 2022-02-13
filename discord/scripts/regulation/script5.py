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
    message = "https://media.discordapp.net/attachments/692344787344293888/805414375816691712/grandefinale-06.png?width=1440&height=339"
    description = f'{emojis.CHECKERED_FLAG} ���������� � ������ {emojis.CHECKERED_FLAG}'
    title = f'{emojis.SCROLL} ��������� {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    value = "����� ����� �� ��������� ���� ������ ���� ����, ��������� �� ������������� � ����, ���� ������, ������������� �� ����������-�������� � ����������� � IT ������."
    embed.add_field(name=f'5.1 {emojis.BRAIN}', value=value, inline=False)
    value = "�� ������������ ����� ����� �� ��� 8 ������ �� ����������� � 7 ������ ����� �� ������� �� ������ �� ������.\n�� �������� �������� �� ���� �� 10 ������ �� ������������ �� ������� � �� 10 ������ �� ������� �� ������ �� ������. "
    embed.add_field(name=f'5.2 {emojis.STOPWATCH}', value=value, inline=False)
    value = "�����: ����� ����� � ������ �� ������ �������� �� �������� � ��� �������� �� ��������, �� ���� �� ����������, ��� ���� ������ ��� ����� �� ����������� ����� �� ��������� �����."
    embed.add_field(name=f'5.3 {emojis.EXCLAMATION}', value=value, inline=False)
    value = f'''�� ����� �� ��������� 7 ������:
{emojis.SMALL_ORANGE_DIAMOND} 6-�� ���-����� ������ �� ������������, �.�. �� ��������� �� ����� �������� �� 2 ��� 3 ������ � ���������� �� ���� �� ������������;
{emojis.SMALL_ORANGE_DIAMOND} 1 ��������� �� ��������� - ������� � ���-������ ��������� ������ �� ����������� �� 3-�� ����� ��� ����� ���������.
'''
    embed.add_field(name=f'5.4 {emojis.TROPHY}', value=value, inline=False)
    value = f'''���-������� 3 ������� �� �������� �� ����� ��������� ��������� � 1-��, 2-�� � 3-�� �����.
�� ���� �������� �������� �� ��������:
{emojis.SMALL_ORANGE_DIAMOND} ������� �������� �� ����� ���� ���������;
{emojis.SMALL_ORANGE_DIAMOND} ���� �������� �� �����������.
'''
    embed.add_field(name=f'5.5 {emojis.FIRST_PLACE}{emojis.SECOND_PLACE}{emojis.THIRD_PLACE}', value=value, inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
