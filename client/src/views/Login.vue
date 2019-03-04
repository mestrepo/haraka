<template>
  <el-container>
    <el-header >
      <navigation>
        <router-link :to="{name: 'about'}" class="link">About Haraka</router-link>
        <router-link :to="{name: 'home'}" class="link">Create Account</router-link>
        <router-link :to="{name: 'login'}" class="link">Login to Haraka</router-link>
      </navigation>
    </el-header>

    <el-main>
      <div class="container-center">
        <h2>Log in</h2>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <el-form ref="form" :model="form">
          <el-form-item>
            <label>Employee</label>
            <el-input v-model="form.Employee" placeholder="Employee"></el-input>
            <label>Email</label>
            <el-input v-model="form.Email" type="Email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.once="login">Log in</el-button>
          </el-form-item>
        </el-form>

        <div>
          <span>Don't have an account?</span>
          <router-link :to="{name: 'home'}" class="link">Create an account</router-link>
        </div>
      </div>

    </el-main>
  </el-container>

</template>

<script>
import { Login } from '../constants/query.gql'

export default {
  data() {
    return {
      error: false,
      form: {
        Employee: '',
        Email: '',
      }
    }
  },
  methods: {
    async login() {
      this.$apollo.provider.clients.defaultClient.cache.reset()

      const { Employee, Email } = this.form
      if (Employee && Email) {
        this.$apollo.mutate({
          mutation: Login,
          variables: {
            Employee, Email
          }
        }).then(async (data) => {
          console.log("CLIENT LOGIN: data "+ JSON.stringify(data))
          const login = data.data.login
          console.log("CLIENT LOGIN: login "+ JSON.stringify(login))
          const id = login.employeeData.id
          console.log("CLIENT LOGIN: id "+ JSON.stringify(id))
          const token = login.token
          console.log("CLIENT LOGIN: token "+ JSON.stringify(token))
          this.saveUserData(id, token)
          console.log('success!') // For now just print
          const employeeData = login.employeeData.role
          console.log("CLIENT LOGIN: data "+ JSON.stringify(employeeData))
          const role = login.employeeData.role
          console.log("CLIENT LOGIN: data "+ JSON.stringify(role))
          if ( role === 'Admin') {
            // route the page to user page
            // console.log("CLIENT LOGIN: route "+ JSON.stringify('admin' +'/'+ id))
            // this.$router.push({name: 'admin' +'/'+ id})
            this.$router.push({name: 'anomaly'})
          } else if (role === 'Regular') {
            // route the page to user page
            // console.log("CLIENT LOGIN: route "+ JSON.stringify('regular' +'/'+ id))
            // this.$router.push({name: 'regular'+'/'+ id})
            this.$router.push({name: 'regular'})
          } else {
            // route the page to user page
            // this.$router.push({name: 'about'})
          }
        }).catch((error) => {
          // this.error = 'Invalid Employee or Email'
          this.error = error
          console.log(error)
        })
      }
    },
    saveUserData (id, token) {
      localStorage.setItem('user-id', id)
      localStorage.setItem('user-token', token)
      this.$root.$data.userId = localStorage.getItem('user-id')
    },
  }
}
</script>

<style scoped>
.el-button {
  width: 100%;
}
</style>
