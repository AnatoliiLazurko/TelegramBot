module.exports.userMenuKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "💎 Отримати доступ до проєкту", callback_data: "projectAccess" },
                ],
                [
                    { text: "ℹ️ Інформація про проєкт", callback_data: "aboutProject" },
                    { text: "📢 Про систему кешбеку", callback_data: "aboutCashback" }
                ],
                [
                    { text: "🆘 Служба підтримки", callback_data: "support" },
                ],
                [
                    { text: "🚪 Вийти з акаунту", callback_data: "main" }
                ]
            ]
        }
    };
};