const { loginAction, handleLogin } = require('../handlers/login');
const { registerAction, handleRegister } = require('../handlers/registration');
const { supportAction, handleSupport } = require('../handlers/support');
const { aboutProjectAction } = require('../handlers/aboutProject');
const { aboutcashbackAction } = require('../handlers/aboutCashback');

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

    bot.action('aboutProject', async (ctx) => {
        action = 'aboutProject';
        await aboutProjectAction(ctx);
    });

    bot.action('aboutCashback', async (ctx) => {
        action = 'aboutCashback';
        await aboutcashbackAction(ctx);
    });

    bot.on('text', async (ctx) => {
        switch (action) {
            case 'register':
                await handleRegister(ctx);
                break;
            case 'login':
                await handleLogin(ctx);
                break;
            case 'support':
                await handleSupport(ctx);
                break;
            default:
                console.log('error');
        }
    });
};