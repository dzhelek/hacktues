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
    #await channel.send("https://media.discordapp.net/attachments/792306324125515797/805360546974138408/rules-01.png?width=1440&height=339")
    message = "https://media.discordapp.net/attachments/792306324125515797/805364075324112906/projects-02.png?width=1440&height=339"
    description = f'{emojis.TOOLS} ��������� {emojis.TOOLS}'
    title = f'{emojis.SCROLL} ��������� {emojis.SCROLL}'
    url = "https://hacktues.com/regulation/"
    color = 0x009d60
    thumbnail = "https://media.discordapp.net/attachments/692344787344293888/805369800171323412/instagram_profile_picture.png?width=683&height=683"
    embed = Embed(description=description, title=title, url=url, color=color)
    embed.set_thumbnail(url=thumbnail)
    embed.add_field(name=f'1.1 {emojis.NO_ENTRY}', value="��������� ������ �� �� �������� � �� �� ��������� ��� �������� ���� �� ���������. �� �� ���� ������� ������ � ��������� 4 ��� ����� �������� �� ��������. �������� �� �� ��������� �� �� ������� � ��������� - �� �� ������. ������������ � �� �� ������� � �������� ����.", inline=False)
    embed.add_field(name=f'1.2 {emojis.COMPUTER}', value="�� ����� �� ��������� ��� � ������������ ����� ����� �� ��������� ���� �� ������� �� � �������� ��������� ���� GitHub.", inline=False)
    embed.add_field(name=f'1.3 {emojis.CLOCK9}', value="������ �� ���� ������ �� �� ������ �� �������� ��������� �� ����� �� ��������, ���� ���������� ������ ������ �� � ������ �� 08:59:59  �� 14.03.2021 �.", inline=False)
    embed.add_field(name=f'1.4 {emojis.EXCLAMATION}', value="�����: ������� � �� � ������� ���� ���� ���, �� �� ����� �� ��������� �� ���������� � �������������� ����� �� �� �������� ������ �� ���������� � ������. ���������� ��� embedded ���������, ��� �� � ������� ������ ��������� ���� �������������� ����� �������������, � ���������, �� ���� � ����������, ��� �������������� ����� ���������.", inline=False)
    await channel.send(message)
    await channel.send(embed=embed)

bot.run(TOKEN)
