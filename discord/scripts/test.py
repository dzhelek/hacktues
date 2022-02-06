from os import environ

from discord.ext import tasks, commands



bot = commands.Bot(command_prefix=('!'))
TOKEN = environ.get('token')


@bot.event
async def on_ready():
    print('done')


bot.load_extension("jishaku")
bot.run(TOKEN)
