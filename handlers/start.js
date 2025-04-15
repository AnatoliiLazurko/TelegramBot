const { mainKeyboard } = require('../utils/mainButtons');
const { addMessage, deleteAllMessages } = require('../utils/messageStore');

module.exports = (bot) => {
    bot.start(async (ctx) => {
        await ctx.deleteMessage();
        await deleteAllMessages(ctx);
        
        const msg = await ctx.reply(
            "Привіт, мене звуть Sphinx Bot 🤖" +
            "\n\nЯ допоможу тобі зареєструвати новий акаунт або увійти в існуючий, щоб отримати доступ до закритого каналу 🔒 з корисною інформацією про:" +
            "\n\n📈 Фінанси" +
            "\n🚀 Сучасні тренди" +
            "\n💡 Цікаві можливості" +
            "\n\nПісля реєстрації ти отримаєш реферальний код 🎟️, який ти зможеш використати для системи кешбеку 💰, запрошуючи нових користувачів!" +
            "\n\nТакож я можу надати тобі всю інформацію ℹ️ про закритий канал та про систему кешбеку" +
            "\n\nОбирай своє ⬇️",
            mainKeyboard()
        );
        addMessage(ctx.from.id, msg.message_id);
    });

    bot.action('main', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
        await deleteAllMessages(ctx); 

        const msg = await ctx.reply(
            "Привіт, мене звуть Sphinx Bot 🤖" +
            "\n\nЯ допоможу тобі зареєструвати новий акаунт або увійти в існуючий, щоб отримати доступ до закритого каналу 🔒 з корисною інформацією про:" +
            "\n\n📈 Фінанси" +
            "\n🚀 Сучасні тренди" +
            "\n💡 Цікаві можливості" +
            "\n\nПід час реєстрації ти отримаєш реферальний код 🎟️, який дозволить заробляти реальні гроші 💰, запрошуючи нових користувачів!" +
            "\n\nТакож я можу надати тобі всю інформацію ℹ️ про закритий канал та про систему кешбеку" +
            "\n\nОбирай своє ⬇️",
            mainKeyboard()
        );
        addMessage(ctx.from.id, msg.message_id);
    });
};