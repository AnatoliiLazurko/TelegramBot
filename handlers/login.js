const { loginKeyboard } = require("../utils/loginButtons");
const { loginUser } = require('../services/userService');
const { loginSessions } = require('../utils/sessionStore');
const { userMenuAction } = require('../handlers/userMenu');

async function loginAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await ctx.reply(
        "Ви обрали 'Увійти' 🔑 \n\nЩоб увійти в свій акаунт, введіть такі дані ⬇️",
        loginKeyboard()
    );

    loginSessions.set(ctx.from.id, { step: 'username' });
    await ctx.reply("Введіть ваш логін:");
}

async function handleLogin(ctx) {
    const session = loginSessions.get(ctx.from.id);

    if (!session) return;

    if (session.step === 'username') {
        session.username = ctx.message.text;
        session.step = 'password';
        ctx.reply("Введіть ваш пароль:");
    } else if (session.step === 'password') {
        try {
            const user = await loginUser(session.username, ctx.message.text);
            // ctx.reply("✅ Вхід успішний! Ласкаво просимо, " + user.username + "!");
            await userMenuAction(ctx, user);

        } catch (error) {
            ctx.reply("❌ Помилка: " + error.message);
        }
        loginSessions.delete(ctx.from.id);
    }
}

module.exports = { loginAction, handleLogin };