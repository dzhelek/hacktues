import asyncpg
from os import environ

from discord.ext import tasks, commands

bot = commands.Bot(command_prefix=('ht ', ','))
TOKEN = environ.get('token')


class MyCog(commands.Cog):
    def __init__(self):
        self.index = 0
        self.printer.start()

    def cog_unload(self):
        self.printer.cancel()

    @tasks.loop(seconds=5.0)
    async def printer(self):
        print(self.index)
        self.index += 1
        if self.index % 5 == 0:
            raise Exception

    @printer.error
    async def on_printer_error(self, exc):
        self.printer.restart()


cog = MyCog()


@tasks.loop(seconds=5.0, count=5)
async def slow_count():
    print(slow_count.current_loop)

@slow_count.after_loop
async def after_slow_count():
    print('done!')

slow_count.start()
bot.run(TOKEN)
