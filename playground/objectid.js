// _id: 5b26aedceeb9e56c6f9c4395

// 12 bytes
// 4 bytes: timestamp
// 3 bytes: machine identifier
// 2 bytes: process identifier
// 3 bytes: counter

// Mongo Db Driver -> MongoDB

const mongoose = require('mongoose');

// const id = mongoose.Types.ObjectId();

// console.log(id);
// console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('5b26b159567d1e6e25b15f85');
console.log(isValid);