const jwt = require('jsonwebtoken')
require('dotenv').config()

function getEmployeeDataId (context) {
  console.log("getEmployeeDataId: context = " + context)
  context.request.Authorization = 'Authorization'
  const Authorization = context.request.get('Authorization')
  console.log("getEmployeeDataId: Authorization = " + Authorization)
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    return id
  }
  throw new Error('Not authenticated')
}

module.exports = {
  getEmployeeDataId
}
