module.exports.registerKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Увійти в акаунт", callback_data: "login" },
                    { text: "На головну", callback_data: "main" },
                ]
            ]
        }
    };
};