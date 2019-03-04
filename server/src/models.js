const mongoose = require('mongoose')
// const moment = require('moment')
const Schema = mongoose.Schema

function buildModel (name, schema, options = {}) {
  return mongoose.model(name, new Schema(schema, Object.assign({timestamps: true}, options)))
}

module.exports.EmployeeData = buildModel('EmployeeData', {
  // id: String,
  Employee: String,
  ImgSrc: String,
  Email: String,
  role: String
})
