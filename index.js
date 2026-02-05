import net from 'node:net';
import fs from 'node:fs';

let config;
if (fs.existsSync('./config.local.json')) {
  config = JSON.parse(fs.readFileSync('./config.local.json', 'utf-8'));
} else {
  config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
}

let payload;
if (fs.existsSync('./payload.local.json')) {
  payload = JSON.parse(fs.readFileSync('./payload.local.json', 'utf-8'));
} else {
  payload = JSON.parse(fs.readFileSync('./payload.json', 'utf-8'));
}

const client = new net.Socket();

client.connect(config.port, config.host, () => {
  console.log(`✅ Connected to ${config.host}:${config.port}`);

  const message = JSON.stringify(payload);
  client.write(message);
});

client.on('data', (data) => {
  console.log('📩 Received: ' + data);

  client.destroy();
});

client.on('error', (err) => {
  console.error('❌ Connection error: ' + err.message);
});

client.on('close', () => {
  console.log('🔌 Connection closed');
});
