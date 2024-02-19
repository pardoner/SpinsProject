const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const { getUserByUsername } = require('../db/sqlHelperFunctions/users')

const authRequired = (req, res, next) => {
  let token = null
  console.log(`req: ${req.body}`)
  if (req.get('Authorization')) {
    console.log(`${JSON.stringify(req.cookies)} cookie token`)
    token = req.get('Authorization').split(' ')[1];
    console.log(`Token in util: ${token}`);
  } else {
    token = req.cookies.token
  }
  if (!token){
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    })
    next()
  }
  
  try {
    console.log(`token: ${token}`)
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
            id: decoded.id,
            firstname: decoded.firstname,
            lastname: decoded.lastname,
            email: decoded.email
          }
  } catch (error) {
    console.log("this error")
    console.log(error)
    res.status(401).send({
      loggedIn: false,
      message: 'Unauthorized',
    })
    throw new Error('Token invalid');
  }
  next()
}

async function getUserFromRequest(req) {
  if (req.get('Authorization') == null) return
  const token = req.get('Authorization').split(' ')[1];
  if (token == null) return
  console.log(token)
  decoded = jwt.verify(token, JWT_SECRET)
  console.log("decoded")
  console.log(decoded)
  const user = await getUserByUsername(decoded.username);
  return user;
}

module.exports = { authRequired, getUserFromRequest}
