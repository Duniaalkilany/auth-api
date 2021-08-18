// 'use strict';
// // 3rd party modules
// require('dotenv').config()

// // internal modules
// const server = require('./src/server');
// const {db} = require('./src/auth/models/index'); //destructuring es6


// db.sync().then(()=> {
//     server.start(process.env.PORT);
// })
// .catch(console.error);
'use strict';

require('dotenv').config();

const { db } = require('./src/models/index');

db.sync().then(() => {
// Start the web server
require('./src/server').start(process.env.PORT);
}).catch(console.error);;