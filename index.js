const http = require('http');
const { Telegraf, Markup } = require('telegraf');

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8601907108:AAGMCMvVibsZkRI7ERFjRg4euDI2WGr9fHE';
const PORT = process.env.PORT || 3000;
const BOT_ACCESS_URL = 'https://ai.studio/apps/b96c3e9d-193a-4105-9b18-72af46ba1e52';
const TUTORIAL_VIDEO_URL = 'https://youtu.be/uSRrOf-Xr3w';

// Official Brand Header & Welcome
const OFFICIAL_BRAND_WELCOME = `╔════════════════════╗
👑🚀 NEXT GEN BOT 🚀👑
╚════════════════════╝

⚡ ACCESS PROVIDER SYSTEM ⚡

🌟💎 YOU ARE MOST WELCOME 💎🌟

━━━━━━━━━━━━━━━━━━━━

🤖 Welcome to NEXT GEN BOT
🔐 Your Gateway to Premium Access!

💠 ایک نئی جنریشن، ایک نیا معیار، ایک شاندار تجربہ! 💠

🚀 Experience the Future of Access
🛡️ Secure • Professional • Powerful

━━━━━━━━━━━━━━━━━━━━

💎 NEXT GEN BOT 💎
👑 YOUR ACCESS. YOUR NEXT GENERATION. 👑

━━━━━━━━━━━━━━━━━━━━

⚠️ PLEASE PRESS START TO CONTINUE ⚠️
👇🏻🚀✨💎👑💎✨🚀👇🏻`;

const LANGUAGE_FINAL_MESSAGES = {
  roman_urdu: `🌟👑 ASSALAM-O-ALAIKUM, MERE BHAIYO AUR BEHNO! 👑🌟

❤️🤝 Maine neeche aap ke saath Bot Access Link bhi share kar diya hai aur poora tareeqa samjhane ke liye complete video bhi share kar di hai. 🎥🚀

📌 BARAH-E-KARAM IN STEPS PAR AMAL KAREIN:
🎬 Sab se pehle video ko shuru se aakhir tak mukammal dekhein.
🤖 Video dekhne ke baad neeche diye gaye link se bot open karein.
✅ Video mein bataye gaye tamam steps complete karein taa-ke aap access hasil karne ka tareeqa samajh sakein.

💎 NEXT GEN TRADERS PREMIUM ka access bilkul FREE hasil karne ka tareeqa jaaniye! 🎉🔥
🆓 Koi access fee nahi, koi subscription charges nahi! Bas video mein di gayi instructions follow karein. 💯✨
📈 Apni trading knowledge behtar banayein, premium signals se faida uthayein aur apni trading journey ko ek naye andaaz mein aage barhayein! 🚀💰
👑 AAP KI NAYI TRADING JOURNEY YAHAAN SE SHURU HOTI HAI! ⚡📊
⚠️ Hamesha risk management ke saath trade karein.`,

  urdu: `🌟👑 السلام علیکم میرے بھائیو اور بہنو! 👑🌟

❤️🤝 میں نے نیچے آپ کے ساتھ بوٹ کا ایکسس لنک بھی شیئر کر دیا ہے اور مکمل طریقہ سمجھانے کے لیے ویڈیو بھی شیئر کر دی ہے۔ 🎥🚀

📌 براہِ کرم ان ہدایات پر عمل کریں:
🎬 سب سے پہلے ویڈیو شروع سے آخر تک مکمل دیکھیں۔
🤖 اس کے بعد نیچے دیے گئے لنک سے بوٹ اوپن کریں۔
✅ ویڈیو میں بتائے گئے تمام مراحل مکمل کریں تاکہ آپ ایکسس حاصل کرنے کے طریقے کو سمجھ سکیں۔

💎 NEXT GEN TRADERS PREMIUM کا ایکسس بالکل مفت حاصل کرنے کا طریقہ جانیں! 🎉🔥
🆓 کوئی ایکسس فیس نہیں، کوئی سبسکرپشن چارجز نہیں! بس ویڈیو میں دی گئی ہدایات پر عمل کریں۔ 💯✨
📈 اپنی ٹریڈنگ کی معلومات بہتر بنائیں، پریمیم سگنلز سے فائدہ اٹھائیں اور اپنی ٹریڈنگ جرنی کو ایک نئے انداز میں آگے بڑھائیں! 🚀💰
👑 آپ کی نئی ٹریڈنگ جرنی یہاں سے شروع ہوتی ہے! ⚡📊
⚠️ ہمیشہ احتیاط اور رسک مینجمنٹ کے ساتھ ٹریڈ کریں۔`,

  bengali: `🌟👑 আসসালামু আলাইকুম, আমার প্রিয় ভাই ও বোনেরা! 👑🌟

❤️🤝 আমি নিচে আপনাদের জন্য বটের অ্যাক্সেস লিংক এবং সম্পূর্ণ টিউটোরিয়াল ভিডিও শেয়ার করেছি! 🎥🚀

📌 অনুগ্রহ করে নিচের ধাপগুলো অনুসরণ করুন:
🎬 প্রথমে ভিডিওটি শুরু থেকে শেষ পর্যন্ত সম্পূর্ণ দেখুন।
🤖 ভিডিও দেখা শেষ হলে নিচে দেওয়া লিংক থেকে বটটি ওপেন করুন।
✅ ভিডিওতে দেখানো প্রতিটি ধাপ সম্পন্ন করুন, যাতে অ্যাক্সেস পাওয়ার প্রক্রিয়াটি ভালোভাবে বুঝতে পারেন।

💎 NEXT GEN TRADERS PREMIUM-এ সম্পূর্ণ বিনামূল্যে অ্যাক্সেস পাওয়ার পদ্ধতি জানুন! 🎉🔥
🆓 কোনো অ্যাক্সেস ফি নেই, কোনো সাবস্ক্রিপশন চার্জ নেই! শুধু ভিডিওতে দেওয়া নির্দেশনাগুলো অনুসরণ করুন। 💯✨
📈 নিজের ট্রেডিং জ্ঞান বাড়ান, প্রিমিয়াম সিগন্যাল সম্পর্কে জানুন এবং আপনার ট্রেডিং যাত্রাকে নতুনভাবে এগিয়ে নিয়ে যান! 🚀💰
👑 আপনার নতুন ট্রেডিং যাত্রা শুরু হোক এখান থেকেই! ⚡📊
⚠️ সবসময় ঝুঁকি নিয়ন্ত্রণ করে ট্রেড করুন।`,

  english: `🌟👑 ASSALAM-O-ALAIKUM, MY BROTHERS & SISTERS! 👑🌟

❤️🤝 I have shared the Bot Access Link below, along with the complete tutorial video! 🎥🚀

📌 PLEASE FOLLOW THESE STEPS CAREFULLY:
🎬 First, watch the complete video from beginning to end.
🤖 After watching, open the bot using the access link provided below.
✅ Follow all the steps explained in the video to complete the access process.

💎 Get access to NEXT GEN TRADERS PREMIUM absolutely FREE! 🎉🔥
🆓 No access fee. No subscription charges. Just follow the instructions provided in the tutorial. 💯✨
📈 Start your trading journey with a fresh account, explore premium signals, and improve your trading knowledge! 🚀💰
👑 YOUR NEXT GENERATION TRADING JOURNEY STARTS HERE! ⚡📊`
};

// 1. Built-in HTTP Health Check Server (Render & Koyeb requirement)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'ONLINE',
    bot: 'NEXT GEN BOT',
    service: 'Render/Koyeb 24/7 Web Service',
    uptimeMinutes: Math.floor(process.uptime() / 60)
  }));
});
server.listen(PORT, () => console.log(`[HTTP Server] Health check listening on port ${PORT}`));

// 2. Initialize Telegram Bot
const bot = new Telegraf(BOT_TOKEN);

// /start: Sends Welcome + ONLY 1 button
bot.command('start', async (ctx) => {
  try {
    await ctx.reply(
      OFFICIAL_BRAND_WELCOME,
      Markup.inlineKeyboard([
        [Markup.button.callback('🌐 Select Language to Continue', 'select_language')]
      ])
    );
  } catch (err) {
    console.error('Error in /start:', err);
  }
});

// Language Selection Protocol: Exactly 4 options
bot.action('select_language', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await ctx.reply(
      '🌐 *NEXT GEN BOT • LANGUAGE SELECTION PROTOCOL* 🌐\n\n' +
      '💠 Please select your preferred language below to receive your access links:',
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🇵🇰 Roman Urdu', 'lang_roman_urdu')],
          [Markup.button.callback('🇵🇰 اردو (Original Urdu)', 'lang_urdu')],
          [Markup.button.callback('🇧 বাংলা (Bengali)', 'lang_bengali')],
          [Markup.button.callback('🇬🇧 English', 'lang_english')]
        ])
      }
    );
  } catch (err) {
    console.error('Error in select_language:', err);
  }
});

// Final Step: Language message + Exactly 2 buttons
const handleLanguage = (langKey) => async (ctx) => {
  try {
    await ctx.answerCbQuery();
    const text = LANGUAGE_FINAL_MESSAGES[langKey] || LANGUAGE_FINAL_MESSAGES.english;
    await ctx.reply(
      text,
      Markup.inlineKeyboard([
        [Markup.button.url('🔗 BOT ACCESS LINK', BOT_ACCESS_URL)],
        [Markup.button.url('🎥 TUTORIAL VIDEO', TUTORIAL_VIDEO_URL)]
      ])
    );
  } catch (err) {
    console.error(`Error in lang_${langKey}:`, err);
  }
};

bot.action('lang_roman_urdu', handleLanguage('roman_urdu'));
bot.action('lang_urdu', handleLanguage('urdu'));
bot.action('lang_bengali', handleLanguage('bengali'));
bot.action('lang_english', handleLanguage('english'));

// License Key Verification (e.g. NXG-VIP-9942-8871)
bot.on('text', async (ctx) => {
  try {
    const text = ctx.message.text.trim();
    if (text.startsWith('/')) return;

    if (/^NXG-[A-Z0-9]{3,6}-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(text)) {
      return ctx.reply(
        `🔐 *NEXT GEN KEY VERIFIED* 🔐\n\n` +
        `✅ *Status:* ACTIVE & AUTHENTICATED\n` +
        `💎 *Key:* \`${text.toUpperCase()}\`\n` +
        `🛡️ *Tunnel:* 256-Bit Quantum Encrypted Node\n` +
        `⚡ *Access Level:* Unlimited VIP Privilege\n\n` +
        `You may proceed to launch the bot using the link below:`,
        {
          parse_mode: 'Markdown',
          ...Markup.inlineKeyboard([[Markup.button.url('🚀 OPEN NEXT GEN APP', BOT_ACCESS_URL)]])
        }
      );
    }

    await ctx.reply(
      `👑 *NEXT GEN BOT COMMAND CENTER* 👑\n\n` +
      `Hello ${ctx.from.first_name || 'VIP Member'}!\n\n` +
      `Please tap the button below to select your language and obtain your access credentials:`,
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('🌐 Select Language to Continue', 'select_language')],
          [Markup.button.url('🔗 Bot Access Link', BOT_ACCESS_URL)],
          [Markup.button.url('🎥 Tutorial Video', TUTORIAL_VIDEO_URL)]
        ])
      }
    );
  } catch (err) {
    console.error('Error handling text:', err);
  }
});

// Launch Telegraf Bot with polling
bot.launch({ dropPendingUpdates: true })
  .then(() => console.log('🚀 NEXT GEN BOT is Live & Polling 24/7 on Render/Koyeb!'))
  .catch(console.error);

process.once('SIGINT', () => { bot.stop('SIGINT'); server.close(); });
process.once('SIGTERM', () => { bot.stop('SIGTERM'); server.close(); });
