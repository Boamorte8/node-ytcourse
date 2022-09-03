import { createServer } from 'http';

console.clear();

const httpServer = createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);

  // body/payload is missing
  let data = '';
  let chunkIndex = 0;
  req.on('data', (chunk) => {
    data += chunk;
    chunkIndex++;
    console.log(chunkIndex);
  });
  req.on('end', () => {
    console.log(data);
    console.log('Received request');

    res.end('Received bro');
  });
});

httpServer.listen(3000);
