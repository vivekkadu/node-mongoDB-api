const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data  = {
    id: 10
}

var token = jwt.sign(data, "123abc");
console.log(token);

var decode = jwt.verify(token, '123abc');
console.log(decode);








// var message = "vivek@97";

// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);

// var data = {
//     id: 4
// };

// //String vivek is secure key which will come from server so that no one can delete data of other user 
// var token = {
//     data,
//     hash : SHA256(JSON.stringify(data) + 'vivek').toString()
// }


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data) + 'vivek').toString();

// if(resultHash === token.hash) {
//     console.log('Data is not Chnaged');
// }else {
//     console.log("Data is changed");
// }