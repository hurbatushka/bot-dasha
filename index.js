const telegApi = require("node-telegram-bot-api");

const token = "5485298063:AAFAZ-dk0lokEnPnk3MZ_Uxsu447NmKK9I4";

const bot = new telegApi(token, { polling: true });

// dashainfo

const idDasha = "1260176245";

const button = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Чат с создателем", callback_data: "1" }]],
  }),
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начало работы с ботом" },
    { command: "/info", description: "Получить список команд" },
    { command: "/stiker", description: "Получить милый стикер" },
    { command: "/showmoder", description: "Показать создателя" },
    { command: "/meow", description: "Фото рандомного котика" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chat = msg.chat.id;
    if (text === "/start") {
      if (msg.from.first_name === "Rowfix") {
        return bot.sendMessage(
          chat,
          `Привет, Дашуль, это видишь только ты. Ты самая милая, в названии бота все и так сказано!)`
        );
      }
      return bot.sendMessage(
        chat,
        `Привет, ${msg.from.first_name}, тут потом будут команды какие ты можешь использовать для работы со мной.\nТак же можешь воспользоваться командой /info`
      );
    }

    if (text === "/stiker" || text === "/Stiker") {
      return bot.sendSticker(
        chat,
        "https://tlgrm.ru/_/stickers/b3e/ce6/b3ece624-f4f0-3bec-8673-be0451d5f4dc/11.webp"
      );
    }
    if (text === "/info") {
      return bot.sendMessage(chat, `Потом тут будет инфо, ${msg.chat.id}`);
    }

    if (text === "/showmoder") {
      return bot.sendMessage(chat, "Можешь написать создателю: ", button);
    }

    if (text === "/meow") {
      const response = await fetch("https://aws.random.cat/meow");
      const data = await response.json();
      return bot.sendPhoto(chat, data.file);
    }

    if (msg.photo != null) {
      await bot.sendPhoto("564770149", msg.photo[0].file_id);

      return bot.sendMessage(chat, `Фото отправлено твоему любимому!`);
    }

    return bot
      .sendMessage(
        chat,
        "Не понимаю я тебя короче. /info - там все команды, ну есть и парочка кодов, узнавай у Вани"
      )
      .then(console.log(" --- Странное сообщение: \n", msg, "\n --- Конец"));
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chat = msg.message.chat.id;

    if (data === "1") {
      await bot.sendMessage(chat, "@hurbatushka");
    }
  });
};

const sendSpetial = () => {
  return bot.sendMessage(idDasha, "Ты пусечка, напиши Ване в вк число - 5");
};

start();
