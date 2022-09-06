// import { get, request } from 'http';

// const requestOptions = {
//   method: 'POST',
//   hostname: 'localhost',
//   port: 3000,
//   path: '/users',
// };
// const req = request(requestOptions, (res) => {
//   let body = '';
//   console.log('Response from users on request mode', res.statusCode);

//   res.on('data', (chunk) => (body += chunk));
//   res.on('end', () => console.log(body));
// });

// req.end();

// It's in experimental mode, so it isn't safe to use
// const res = await fetch('https://api.belo.app/public/price');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// }

// get('http://localhost:3000/users', (res) => {
//   let body = '';
//   console.log('Response from users', res.statusCode);

//   res.on('data', (chunk) => (body += chunk));
//   res.on('end', () => console.log(body));
// });
