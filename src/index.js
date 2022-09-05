// import { createServer } from 'http';
import express from 'express';

console.clear();

const PORT = 3000;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

// Exist a method for every method but also exist the all method to handle all the methods in a function
// example: expressApp.all('/mi-account', (req, res) => {
// expressApp.get('/mi-account', (req, res) => {
//   res.send('My personal account');
// });
expressApp.get('/item/:iditem', (req, res) => {
  // console.log(req.params.iditem);
  console.log(req.headers);
  console.log(req.get('Content-Type'));
  // res.status(401).send({
  //   errorMessage: 'Unauthorized access',
  // });
  res.send(`The item has id ${req.params.iditem}`);
});

expressApp.post('/item/:iditem', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send(`POST - The item has id ${req.params.iditem}`);
});

expressApp.put('/product', (req, res) => {
  console.log(req.body);
  res.send(`PUT - Product`);
});

expressApp.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
