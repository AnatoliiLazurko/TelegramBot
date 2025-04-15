const { registerKeyboard } = require('../utils/registerButtons');
const { registerUser } = require('../services/userService');
const User = require('../models/userModel');
const { registrationSessions } = require('../utils/sessionStore');
const { addMessage, deleteAllMessages } = require('../utils/messageStore');

async function registerAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await deleteAllMessages(ctx);

    const msg1 = await ctx.reply(
        "Ви обрали 'Зареєструватися' ✅\n\nЩоб створити новий акаунт, введіть такі дані ⬇️",
        registerKeyboard()
    );
    addMessage(ctx.from.id, msg1.message_id);

    registrationSessions.set(ctx.from.id, { step: 'username' });

    const msg2 = await ctx.reply("Введіть ваш логін:");
    addMessage(ctx.from.id, msg2.message_id);
}

async function handleRegister(ctx) {
    const sessionRegister = registrationSessions.get(ctx.from.id);

    if (!sessionRegister) return;

    addMessage(ctx.from.id, ctx.message.message_id);

    if (sessionRegister.step === 'username') {
        const username = ctx.message.text;

        // Перевірка чи такий логін вже існує
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const msg3 = await ctx.reply("❌ Користувач з таким логіном вже існує. \n\nВведіть інший логін:");
            addMessage(ctx.from.id, msg3.message_id);
            return;
        }

        sessionRegister.username = username;
        sessionRegister.step = 'password';
        const msg4 = await ctx.reply("Введіть ваш пароль:");
        addMessage(ctx.from.id, msg4.message_id);

    } else if (sessionRegister.step === 'password') {
        // Збереження паролю
        sessionRegister.password = ctx.message.text;
        sessionRegister.step = 'confirmPassword';
        const msg5 = await ctx.reply("Повторіть ваш пароль:");
        addMessage(ctx.from.id, msg5.message_id);

    } else if (sessionRegister.step === 'confirmPassword') {

        // Перевіряємо, чи паролі співпадають
        if (ctx.message.text !== sessionRegister.password) {
            const msg6 = await ctx.reply("Паролі не співпадають. Спробуйте ще раз.");
            addMessage(ctx.from.id, msg6.message_id);
            return;
        }
        try {
            // Функція реєсттрації користувача
            await registerUser(sessionRegister.username, sessionRegister.password, ctx.message.text);
            const msg7 = await ctx.reply("✅ Реєстрація успішна!");
            addMessage(ctx.from.id, msg7.message_id);
            registrationSessions.delete(ctx.from.id);
        } catch (error) {
            const msg8 = await ctx.reply(`❌ Помилка: ${error.message}`);
            addMessage(ctx.from.id, msg8.message_id);
            registrationSessions.delete(ctx.from.id);
        }
    }
}

module.exports = { registerAction, handleRegister };