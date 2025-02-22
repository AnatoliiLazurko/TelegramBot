require("dotenv").config();
const { Telegraf } = require("telegraf");
const mongoose = require("mongoose");


// HANDLERS INITIALIZATION
const startHandler = require("./handlers/start");
const registrationHandler = require("./handlers/registration");
const loginHandler = require("./handlers/login");
const supportHandler = require("./handlers/support");
// =======================


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Підключено до MongoDB"))
    .catch(err => console.error("❌ Помилка підключення до MongoDB:", err));

const bot = new Telegraf(process.env.BOT_TOKEN);


// HANDLERS ACTIONS
startHandler(bot);
registrationHandler(bot);
loginHandler(bot);
supportHandler(bot);

// ======================


// >>>>>>>>>> LAUNCH <<<<<<<<<<<<<<
bot.launch();
console.log("🤖 Бот запущено!");

// Обробка помилок
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));