const { Telegraf } = require('telegraf');
const express = require('express');

// Create an Express app for Vercel compatibility
const app = express();
app.use(express.json());

// Your Telegram bot token
const bot = new Telegraf('7599218155:AAFksthH1DTOoPN5kpaiQ6YP2QpyeFikYC1U');

// Bot command to show the real-time time of India
bot.start((ctx) => {
    ctx.reply("Welcome! Type /time to see the current time in India.");
});

bot.command('time', (ctx) => {
    const indiaTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    ctx.reply(`The current time in India is: ${indiaTime}`);
});

// Add webhook support
app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body);
    res.status(200).send('OK');
});

// Start webhook
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Enable the bot webhook using your Vercel URL
bot.telegram.setWebhook('https://real-time-telegram-dpp5.vercel.app/bot7599218155:AAFksthH1DTOoPN5kpaiQ6YP2QpyeFikYC1U');

module.exports = app;
