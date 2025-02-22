const { registerKeyboard } = require('../utils/registerButtons');
const { registerUser } = require('../services/userService');
const User = require('../models/userModel');
const { registrationSessions, loginSessions } = require('../utils/sessionStore');
 
module.exports = (bot) => {
    bot.action('register', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
        await ctx.reply(
            "Ви обрали 'Зареєструватися' ✅\n\nЩоб створити новий акаунт, введіть такі дані ⬇️",
            registerKeyboard()
        );

        // Починаємо реєстрацію, зберігаючи стан користувача
        registrationSessions.set(ctx.from.id, { step: 'username' });
        await ctx.reply("Введіть ваш логін:");
    });

    bot.on('text', async (ctx) => {
        const session = registrationSessions.get(ctx.from.id);

        if (!session) return;

        if (session.step === 'username') {
            const username = ctx.message.text;

            // Перевірка чи такий логін вже існує
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                ctx.reply("❌ Користувач з таким логіном вже існує. \n\nВведіть інший логін:");
                return;
            }

            session.username = username;
            session.step = 'password';
            ctx.reply("Введіть ваш пароль:");

        } else if (session.step === 'password') {
            // Збереження паролю
            session.password = ctx.message.text;
            session.step = 'confirmPassword';
            ctx.reply("Повторіть ваш пароль:");

        } else if (session.step === 'confirmPassword') {

            // Перевіряємо, чи паролі співпадають
            if (ctx.message.text !== session.password) {
                ctx.reply("Паролі не співпадають. Спробуйте ще раз.");
                return;
            }
            try {
                // Функція реєсттрації користувача
                await registerUser(session.username, session.password, ctx.message.text);
                ctx.reply("✅ Реєстрація успішна!");
                registrationSessions.delete(ctx.from.id);
            } catch (error) {
                ctx.reply(`❌ Помилка: ${error.message}`);
                registrationSessions.delete(ctx.from.id);
            }
        }
    });
};