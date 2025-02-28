async function supportAction(ctx) {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await ctx.reply(
        "Служба Підтримки",
    );
    
    // Починаємо процес входу
    await ctx.reply("Введіть ваше повідомлення:");
}

module.exports = { supportAction };