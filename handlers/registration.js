const { registerKeyboard } = require('../utils/registerButtons');
const { registerUser } = require('../services/userService');
const User = require('../models/userModel');
const { registrationSessions } = require('../utils/sessionStore');

async function registerAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await ctx.reply(
        "Ви обрали 'Зареєструватися' ✅\n\nЩоб створити новий акаунт, введіть такі дані ⬇️",
        registerKeyboard()
    );

    registrationSessions.set(ctx.from.id, { step: 'username' });
    await ctx.reply("Введіть ваш логін:");
}

async function handleRegister(ctx) {
    const sessionRegister = registrationSessions.get(ctx.from.id);

    if (!sessionRegister) return;

    if (sessionRegister.step === 'username') {
        const username = ctx.message.text;

        // Перевірка чи такий логін вже існує
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            ctx.reply("❌ Користувач з таким логіном вже існує. \n\nВведіть інший логін:");
            return;
        }

        sessionRegister.username = username;
        sessionRegister.step = 'password';
        ctx.reply("Введіть ваш пароль:");

    } else if (sessionRegister.step === 'password') {
        // Збереження паролю
        sessionRegister.password = ctx.message.text;
        sessionRegister.step = 'confirmPassword';
        ctx.reply("Повторіть ваш пароль:");

    } else if (sessionRegister.step === 'confirmPassword') {

        // Перевіряємо, чи паролі співпадають
        if (ctx.message.text !== sessionRegister.password) {
            ctx.reply("Паролі не співпадають. Спробуйте ще раз.");
            return;
        }
        try {
            // Функція реєсттрації користувача
            await registerUser(sessionRegister.username, sessionRegister.password, ctx.message.text);
            ctx.reply("✅ Реєстрація успішна!");
            registrationSessions.delete(ctx.from.id);
        } catch (error) {
            ctx.reply(`❌ Помилка: ${error.message}`);
            registrationSessions.delete(ctx.from.id);
        }
    }
}

module.exports = { registerAction, handleRegister };