const { aboutProjectKeyboard } = require("../utils/aboutProjectButtons");
const { addMessage, deleteAllMessages } = require('../utils/messageStore');

async function aboutProjectAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await deleteAllMessages(ctx);
    const msg = await ctx.reply(
        "ℹ Інформація про Sphinx" +
        "\n\n✨ Sphinx — преміум-канал у Telegram, який відкриває доступ до цінної та ексклюзивної інформації. Тут ти знайдеш унікальні матеріали, актуальні інсайди та можливості, яких немає у відкритому доступі." +
        "\n\n💎 Як отримати доступ?" +
        "\nДля цього потрібно оформити підписку. Після оплати ти отримуєш особистий доступ до каналу та можеш користуватися всіма його перевагами." +
        "\n\n🔗 Запрошуй друзів та отримуй кешбек!" +
        "\nУ Sphinx діє реферальна система. Ти отримуєш персональний код, яким можеш поділитися з друзями. Якщо хтось використовує твій код під час оформлення підписки, частина коштів повернеться тобі." +
        "\n\n📊 Контролюй свої бонуси!" +
        "\nУ Sphinx є зручний інтерфейс управління, де ти можеш переглядати свій баланс, історію рефералів та накопичені кошти.",
        
        aboutProjectKeyboard()
    );

    addMessage(ctx.from.id, msg.message_id);
}

module.exports = { aboutProjectAction };