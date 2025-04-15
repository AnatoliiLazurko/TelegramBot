const { loginKeyboard } = require("../utils/loginButtons");
const { loginUser } = require('../services/userService');
const { loginSessions } = require('../utils/sessionStore');
const { userMenuAction } = require('../handlers/userMenu');
const { addMessage, deleteAllMessages } = require('../utils/messageStore');

async function loginAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await deleteAllMessages(ctx);

    const msg1 = await ctx.reply(
        "Ви обрали 'Увійти' 🔑 \n\nЩоб увійти в свій акаунт, введіть такі дані ⬇️",
        loginKeyboard()
    );
    addMessage(ctx.from.id, msg1.message_id);

    loginSessions.set(ctx.from.id, { step: 'username' });

    const msg2 = await ctx.reply("Введіть ваш логін:");
    addMessage(ctx.from.id, msg2.message_id);
}

async function handleLogin(ctx) {
    const session = loginSessions.get(ctx.from.id);

    if (!session) return;

    addMessage(ctx.from.id, ctx.message.message_id);

    if (session.step === 'username') {
        session.username = ctx.message.text;
        session.step = 'password';
        const msg3 = await ctx.reply("Введіть ваш пароль:");
        addMessage(ctx.from.id, msg3.message_id);
    } else if (session.step === 'password') {
        try {
            const user = await loginUser(session.username, ctx.message.text);
            await userMenuAction(ctx, user);

        } catch (error) {
            const msg4 = await ctx.reply("❌ Помилка: " + error.message);
            addMessage(ctx.from.id, msg4.message_id);
        }
        loginSessions.delete(ctx.from.id);
    }
}

module.exports = { loginAction, handleLogin };