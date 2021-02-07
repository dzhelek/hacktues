#!/usr/bin/env python3
# coding=windows-1251
from os import environ

from discord.ext import commands

from commands import Commands
from events import Events
from tasks import UserListener


def main():
    TOKEN = environ.get('token')

    bot = commands.Bot(command_prefix=('хт ', 'ht ', ','), help_command=None)

    bot.add_cog(Events(bot))
    bot.add_cog(Commands(bot))
    bot.add_cog(UserListener(bot))
    bot.run(TOKEN)


if __name__ == '__main__':
    main()
