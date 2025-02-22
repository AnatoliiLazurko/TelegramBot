const { loginKeyboard } = require("../utils/loginButtons");
const { loginUser } = require('../services/userService');
const { registrationSessions, loginSessions } = require('../utils/sessionStore');

module.exports = (bot) => {
    bot.action('login', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
        await ctx.reply(
            "Ви обрали 'Увійти' 🔑 \n\nЩоб увійти в свій акаунт, введіть такі дані ⬇️",
            loginKeyboard()
        );
        
        // Починаємо процес входу
        loginSessions.set(ctx.from.id, { step: 'username' });
        await ctx.reply("Введіть ваш логін:");
    });

    bot.on('text', async (ctx) => {
        const session = loginSessions.get(ctx.from.id);

        if (!session) return;

        if (session.step === 'username') {
            session.username = ctx.message.text;
            session.step = 'password';
            ctx.reply("Введіть ваш пароль:");
        } else if (session.step === 'password') {
            try {
                // Викликаємо функцію входу
                const user = await loginUser(session.username, ctx.message.text);
                ctx.reply("✅ Вхід успішний! Ласкаво просимо, " + user.username + "!");
            } catch (error) {
                ctx.reply("❌ Помилка: " + error.message);
            }
            // Завершуємо сесію входу
            loginSessions.delete(ctx.from.id);
        }
    });

};