const { userMenuKeyboard } = require("../utils/userMenuButtons");
const { addMessage, deleteAllMessages } = require('../utils/messageStore');

async function userMenuAction(ctx, user) {
    await ctx.deleteMessage();
    await deleteAllMessages(ctx);

    const msg = await ctx.reply(
        "✅ Вхід успішний! Ласкаво просимо, " + user.username + "!" +
        "\n\n✨ Ось ваш доступ до основних функцій та можливостей, які допоможуть вам повною мірою насолоджуватися нашими перевагами." +
        "\n\nВиберіть потрібний розділ і управляйте своїм акаунтом, підпискою та бонусами з легкістю! 🚀📊",

        userMenuKeyboard()
    );
    addMessage(ctx.from.id, msg.message_id);
}

module.exports = { userMenuAction };