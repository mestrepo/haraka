const { GraphQLScalarType } = require('graphql')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { EmployeeData } = require('./models')
const { getEmployeeDataId} = require('./utils')
const JWT_SECRET = process.env.JWT_SECRET
const SYSTEM_ADMIN_EMAIL = process.env.SYSTEM_ADMIN_EMAIL
const ADMIN_NAME = process.env.ADMIN_NAME

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
 * used for debugging a circular object
 */
const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const resolvers = {
  Query: {
    test (_, args, context) {
      return 'Haraka Fixed Asset Management: GraphQL test!'
    },
    async getEmployeeData (_, args, context) {
      return await EmployeeData.find({})
    },
    async getEmployeeDatum (_, {id}, context) {
      console.log("getEmployeeDataId: id: "+ id)
      console.log("getEmployeeDataId: context: "+ JSON.stringify(context, getCircularReplacer()))
      const userId = getEmployeeDataId(context)
      console.log("getEmployeeDataId: userId: "+ userId)
      return await EmployeeData.findById(id || userId)
    }
  },
  Mutation: {
    async captureEmail (_, {Email}) {
      const isEmailTaken = await EmployeeData.findOne({Email})
      if (isEmailTaken) {
        throw new Error('This email is already taken')
      }
      const userRole = (Email === SYSTEM_ADMIN_EMAIL) ? 'Admin' : 'Regular'
      const employeeName = (Email === SYSTEM_ADMIN_EMAIL) ? ADMIN_NAME : ''
      const employeeData = await EmployeeData.create({
        Employee: employeeName,
        ImgSrc: '',
        Email,
        role: userRole
      })
      return employeeData
    },
    async signup (_, {id, Employee, ImgSrc}) {
      console.log('SIGNUP: id : ' + id)
      console.log('SIGNUP: Employee : ' + Employee)
      console.log('SIGNUP: ImgSrc : ' + ImgSrc)
      const common = {
        Employee,
        ImgSrc
      }
      const employeeData = await EmployeeData.findById(id)
      if (!employeeData) {
        throw new Error('No employeeData with that email')
      } else {
        employeeData.set(common)
      }
      await employeeData.save()
      const token = jwt.sign({Email: employeeData.Email, Employee: Employee}, JWT_SECRET)
      console.log('***********employeeData object***************')
      console.log('SIGNUP: employeeData.id : ' + employeeData.id)
      console.log('SIGNUP: employeeData.Email : ' + employeeData.Email)
      console.log('SIGNUP: employeeData.Employee : ' + employeeData.Employee)
      console.log('SIGNUP: employeeData.ImgSrc : ' + employeeData.ImgSrc)
      return {
        token, employeeData
      }
    },
    async login (_, {Email, Employee}) {
      console.log('LOGIN: Employee : ' + Employee)
      console.log('LOGIN: Email : ' + Email)
      const employeeData = await EmployeeData.findOne({Email})
      if (!employeeData) {
        throw new Error('No employeeData with that email')
      }
      const valid = await (Employee === employeeData.Employee)
      console.log('LOGIN: Employee : ' + Employee)
      console.log('LOGIN: employeeData.Employee : ' + employeeData.Employee)
      if (!valid) {
        throw new Error('Incorrect Employee')
      }
      console.log('***********employeeData object***************')
      console.log('LOGIN: employeeData : ' + employeeData)
      console.log('LOGIN: employeeData.Email : ' + employeeData.Email)
      console.log('LOGIN: employeeData.Employee : ' + employeeData.Employee)
      const token = jwt.sign({Email: employeeData.Email, Employee: employeeData.Employee}, JWT_SECRET)

      return {token, employeeData}
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: (value) => moment(value).toDate(), // value from the client
    serialize: (value) => value.getTime(), // value sent to the client
    parseLiteral: (ast) => ast
  })
}

module.exports = resolvers
