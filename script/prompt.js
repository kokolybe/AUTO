const axios = require('axios');

module.exports = {
  config: {
    name: "prompt",
    version: "1.0",
    author: "JARiF",
    countDown: 0,
    role: 0,
    longDescription: {
      vi: "",
      en: "Get midjourney prompts."
    },
    category: "𝗠𝗘𝗗𝗜𝗔"
  },
  run: async function ({ api, event, args }) {
    try {
      const khankirChele = args.join(" ");
      let imageUrl;

      if (event.type === "message_reply") {
        if (["photo", "sticker"].includes(event.messageReply.attachments[0]?.type)) {
          imageUrl = event.messageReply.attachments[0].url;
        } else {
          return api.sendMessage({ body: "❌ | Reply must be an image." }, event.threadID);
        }
      } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
        imageUrl = args[0];
      } else if (!khankirChele) {
        return api.sendMessage({ body: "❌ | Reply to an image or provide a prompt." }, event.threadID);
      }

      if (imageUrl) {
        const response = await axios.get(`https://www.api.vyturex.com/describe?url=${encodeURIComponent(imageUrl)}`);
        const description = response.data;

        await api.sendMessage(description, event.threadID);
      } else if (khankirChele) {
        const response = await axios.get(`https://www.api.vyturex.com/promptgen?content=${encodeURIComponent(khankirChele)}`);
        const prompt = response.data;

        await api.sendMessage(prompt, event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`${error}`, event.threadID);
    }
  }
};
