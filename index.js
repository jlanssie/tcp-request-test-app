import net from 'node:net';

const OPTIONS = {
  host: '127.0.0.1',
  port: 61616,
  timeout: 5000,
};

const payload = {
  header: 'AUTH_KEY_123',
  command: 'GET_DATA',
  body: 'Hello Server!',
};

const client = new net.Socket();

client.connect(OPTIONS.port, OPTIONS.host, () => {
  console.log(`✅ Connected to ${OPTIONS.host}:${OPTIONS.port}`);

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
