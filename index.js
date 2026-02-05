import net from 'node:net';

import config from './config.json' with { type: 'json' };
import payload from './payload.json' with { type: 'json' };

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
