module.exports = (bot) => {
    bot.action('support', async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
        await ctx.reply(
            "Служба Підтримки",
        );
        
        // Починаємо процес входу
        await ctx.reply("Введіть ваше повідомлення:");

        bot.on('text', async (ctx) => {
            console.log(ctx.message.text)
        });
    });

};