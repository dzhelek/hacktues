#!/usr/bin/env python3
# coding=windows-1251
from os import environ

import discord
from discord.ext import commands

from commands import Commands
from events import Events
from tasks import Tasks


def main():
    TOKEN = environ.get('token')

    intents = discord.Intents.all()
    bot = commands.Bot(command_prefix=('хт ', 'ht '),
                       help_command=None, intents=intents)

    bot.add_cog(Events(bot))
    bot.add_cog(Commands(bot))
    bot.add_cog(Tasks(bot))
    bot.load_extension("jishaku")
    bot.run(TOKEN)

if __name__ == '__main__':
    main()
