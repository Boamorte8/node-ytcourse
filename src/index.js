// Exist other 2 nodejs modules that help you to accomplish the same objective https and http/2
import { createServer } from 'http';

console.clear();

const PORT = 3000;
const httpServer = createServer();

httpServer.addListener('request', (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);

  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log('From url', url.pathname);

  if (req.method === 'GET') {
    if (url.pathname === '/users') return res.end('Users');
  }

  return res.end('Hello from basic nodejs server');
});

// Example to get the data from request body
// const httpServer = createServer((req, res) => {
//   console.log(req.method);
//   console.log(req.url);
//   console.log(req.headers);

//   // body/payload is missing
//   let data = '';
//   let chunkIndex = 0;
//   req.on('data', (chunk) => {
//     data += chunk;
//     chunkIndex++;
//     console.log(chunkIndex);
//   });
//   req.on('end', () => {
//     console.log(data);
//     console.log('Received request');

//     res.end('Received bro');
//   });
// });

httpServer.listen(PORT, () =>
  console.log(`Http server listening on port ${PORT}`)
);
