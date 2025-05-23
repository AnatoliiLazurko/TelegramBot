const { aboutCashbackKeyboard } = require("../utils/aboutCashbackButtons");
const { addMessage, deleteAllMessages } = require('../utils/messageStore');

async function aboutcashbackAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await deleteAllMessages(ctx);
    const msg = await ctx.reply(
        "📢 Дізнайся більше про систему кешбеку в Sphinx!" +
        "\n\nSphinx — це не просто преміум-канал із цінною інформацією, а ще й можливість компенсувати витрати на підписку завдяки реферальній програмі." +
        "\n\n🔄 Як це працює?" +
        "\n\n1️⃣ Ти оформлюєш підписку та отримуєш персональний реферальний код." +
        "\n2️⃣ Ділишся кодом із друзями та запрошуєш їх до Sphinx." +
        "\n3️⃣ Коли друг оформлює підписку за твоїм кодом, ти отримуєш 45 грн кешбеку." +
        "\n4️⃣ Якщо за день запросив 5 друзів, додатково отримуєш бонус 30 грн." +
        "\n\n💡 Чому це вигідно?" +
        "\n🔹 Ти можеш повернути частину витрат на підписку." +
        "\n🔹 Сума кешбеку не обмежена, тому чим більше друзів ти запросиш, тим більше повернеш коштів." +
        "\n🔹 Це просто: достатньо поділитися реферальним кодом у соціальних мережах або серед знайомих." +
        "\n\n✨ Sphinx — це не просто преміум-контент, а ще й можливість повернути частину витрат та навіть заробити! ✨",
        
        aboutCashbackKeyboard()
    );

    addMessage(ctx.from.id, msg.message_id);
}

module.exports = { aboutcashbackAction };