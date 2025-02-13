require("dotenv").config();
const { Telegraf } = require("telegraf");
const { MongoClient } = require("mongodb");
const { MongoDBSession } = require("telegraf-session-mongodb");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply("Привіт, мене звуть Сфінкс Бот 🤖 \n\nЦе Sphinx – твоя можливість отримати цікаву інформацію та вигоду. Що хочеш зробити?");
});

bot.launch();
console.log("🤖 Бот запущено!");