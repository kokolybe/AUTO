const fs = require('fs');
const axios = require('axios');
const path = require('path');

module.exports.config = {
  name: "fbdl",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Eugene Aguilar",
  description: "Download Facebook video link",
  commandCategory: "media",
  usages: "fbdl [link]",
  cooldowns: 8,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const q = args.join(" ");
    if (!q) {
      api.sendMessage(`Please provide a URL from facebook.com`, event.threadID, event.messageID);
      return;
    }

    api.sendMessage(`Processing...`, event.threadID, event.messageID);

    const response = await axios.get(`https://hoanghao.me/api/facebook/download?url=${q}`);
    const videoUrl = response.data.data.video;
    const t = response.data.data.title;

    const pathie = path.join(__dirname, `cache`, `eurix.mp4`);

const stream = await axios.get(videoUrl, { responseType: "arraybuffer"});

    fs.writeFileSync(pathie, Buffer.from(stream.data, 'binary'));

    await api.sendMessage({ body: `𝐕𝐨𝐢𝐜𝐢 𝐯𝐨𝐭𝐫𝐞 𝐯𝐢𝐝é𝐨\n\nTitle: ${t}`, attachment: fs.createReadStream(pathie) }, event.threadID, event.messageID);
  } catch (e) {
    api.sendMessage(`Error downloading Facebook video!!\n${e}`, event.threadID, event.messageID);
    console.error(e); 
  }
};
