module.exports.aboutProjectKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "На головну", callback_data: "main" },
                ]
            ]
        }
    };
};