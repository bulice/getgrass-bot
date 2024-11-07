require('colors');
const Bot = require('./src/Bot');
const Config = require('./src/Config');
const { 读取行 } = require('./src/ProxyManager');
const { delay, displayHeader } = require('./src/utils');

async function main() {
  displayHeader();
  console.log('正在启动，请稍候...\n'.cyan);
  await delay(1000);

  const config = new Config();
  const bot = new Bot(config);

  // 默认选择不使用代理
  console.log('默认启用直接连接模式。'.green);

  const userIds = await 读取行('uid.txt');
  if (userIds.length === 0) {
    console.error('在 uid.txt 中未找到用户 ID，程序退出...'.red);
    return;
  }
  console.log(`加载了 ${userIds.length} 个用户 ID\n`.green);

  const tasks = userIds.map(userId => bot.connectDirectly(userId));

  await Promise.allSettled(tasks);
}

main().catch(console.error);
