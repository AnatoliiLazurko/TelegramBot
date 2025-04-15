const { addMessage, deleteAllMessages } = require('../utils/messageStore');
const { supportProjectKeyboard } = require("../utils/supportButtons");
require("dotenv").config();

async function supportAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await deleteAllMessages(ctx);

    const msg1 = await ctx.reply(
        "Служба Підтримки",
    );
    addMessage(ctx.from.id, msg1.message_id);
    
    // Починаємо процес входу
    const msg2 = await ctx.reply("Введіть ваше повідомлення:");
    addMessage(ctx.from.id, msg2.message_id);
}

async function handleSupport(ctx) {
    const user = ctx.from;
    const message = ctx.message.text;
    addMessage(ctx.from.id, ctx.message.message_id);

    const msgToAdmin = `
        📩 Нове повідомлення до служби підтримки:
        👤 Користувач: @${user.username || user.first_name}
        🆔 ID: ${user.id}

        💬 Повідомлення:
        ${message}
    `;

    const msg3 = await ctx.reply(
        "✅ Дякуємо, ваше повідомлення передано службі підтримки.",
        supportProjectKeyboard()
    );
    addMessage(ctx.from.id, msg3.message_id);

    await ctx.telegram.sendMessage(process.env.ADMIN_ID, msgToAdmin);
}

module.exports = { supportAction, handleSupport };