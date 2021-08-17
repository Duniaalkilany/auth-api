
'use strict';

const base64 = require('base-64');
const {users} = require('../models/index.js')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid username&password');  
    return _authError(); }

    let basic = req.headers.authorization.split(' ')
    console.log('basiic :',basic);
    if(basic[0] !== 'Basic'){ return next('Invalid Auth Headers'); }
    let encoded = basic.pop();
    console.log(' encoded', encoded);
    let decoded = base64.decode(encoded); // username:password
    console.log(' decoded ',  decoded);
    let [user, pass] =  decoded.split(':');

    console.log('user', user)

  console.log('my pass', pass)


  try {
    req.user = await users.authenticateBasic(user, pass)
  
    next();
  } catch (e) {
      console.log(e);
    res.status(403).send('Invalid Login');
  }

}










// 'use strict';

// const base64 = require('base-64');
// const { users } = require('../models');

// module.exports = async (req, res, next) => {

//   if (!req.headers.authorization) { return _authError(); }

//   let basic = req.headers.authorization.split(' ').pop();
//   let [user, pass] = base64.decode(basic).split(':');

//   try {
//     req.user = await users.authenticateBasic(user, pass)
//     next();
//   } catch (e) {
//     _authError()
//   }

//   function _authError() {
//     res.status(403).send('Invalid Login');
//   }

// }