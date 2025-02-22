module.exports.loginKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Зареєструватися", callback_data: "register" },
                    { text: "На головну", callback_data: "main" },
                ]
            ]
        }
    };
};