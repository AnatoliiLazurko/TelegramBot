const { userMenuKeyboard } = require("../utils/userMenuButtons");

async function userMenuAction(ctx, user) {
    await ctx.deleteMessage();
    ctx.reply(
        "✅ Вхід успішний! Ласкаво просимо, " + user.username + "!" +
        "\n\n✨ Ось ваш доступ до основних функцій та можливостей, які допоможуть вам повною мірою насолоджуватися нашими перевагами." +
        "\n\nВиберіть потрібний розділ і управляйте своїм акаунтом, підпискою та бонусами з легкістю! 🚀📊",

        userMenuKeyboard()
    );
}

module.exports = { userMenuAction };