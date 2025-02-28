const { loginAction, handleLogin } = require('../handlers/login');
const { registerAction, handleRegister } = require('../handlers/registration');
const { supportAction } = require('../handlers/support');

let action;
 
module.exports = (bot) => {
    bot.action('register', async (ctx) => {
        action = 'register';
        await registerAction(ctx)
    });

    bot.action('login', async (ctx) => {
        action = 'login';
        await loginAction(ctx);
    });

    bot.action('support', async (ctx) => {
        action = 'support';
        await supportAction(ctx);
    });

    bot.on('text', async (ctx) => {
        switch (action) {
            case 'register':
                await handleRegister(ctx)
                break;
            case 'login':
                await handleLogin(ctx)
                break;
            case 'support':
                console.log(ctx.message.text);
                break;
            default:
                console.loh('error');
        }
    });
};