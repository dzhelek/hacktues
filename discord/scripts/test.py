from os import environ

from discord.ext import tasks, commands



bot = commands.Bot(command_prefix=('ht ', ','))
TOKEN = environ.get('token')


@bot.event
async def on_ready():
    channel = await bot.fetch_channel(792306324125515797)
    message = await channel.fetch_message(805363618102640650)
    await message.edit(content="https://media.discordapp.net/attachments/692344787344293888/808272152536416306/rules-01.png?width=1440&height=339")
    print('done')


bot.run(TOKEN)
