require("dotenv").config();
const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");


// HANDLERS INITIALIZATION
const startHandler = require("./handlers/start");
const botHandlers = require("./handlers/botHandlers");
// =======================


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Підключено до MongoDB"))
    .catch(err => console.error("❌ Помилка підключення до MongoDB:", err));

const bot = new Telegraf(process.env.BOT_TOKEN);


// HANDLERS ACTIONS
startHandler(bot);
botHandlers(bot);

// ======================


// >>>>>>>>>> LAUNCH <<<<<<<<<<<<<<
bot.launch();
console.log("🤖 Бот запущено!");

// Обробка помилок
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));