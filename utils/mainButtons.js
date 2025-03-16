module.exports.mainKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Зареєструватися", callback_data: "register" },
                    { text: "Увійти", callback_data: "login" }
                ],
                [
                    { text: "Інформація про проєкт", callback_data: "aboutProject" },
                    { text: "Про систему кешбеку", callback_data: "aboutCashback" }
                ],
                [
                    { text: "Служба підтримки", callback_data: "support" }
                ]
            ]
        }
    };
};