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
        <div>Welcome to Haraka! Finish setting up your account</div>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <el-form ref="form" :model="form">
          <el-form-item>
            <label>Employee</label>
            <el-input v-model="form.Employee" placeholder="Your Full name"></el-input>
            <label>ImgSrc</label>
            <el-input v-model="form.ImgSrc" placeholder="Your ImgSrc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.once="signup">Complete</el-button>
          </el-form-item>
        </el-form>

      </div>

    </el-main>
  </el-container>

</template>

<script>
import { Signup } from '../constants/query.gql'

export default {
  data() {
    return {
      error: false,
      form: {
        Employee: '',
        ImgSrc: '',
      }
    }
  },
  methods: {
    async signup() {
      // this.$router.push({name: 'about'})
      this.$apollo.provider.clients.defaultClient.cache.reset()

      const { Employee, ImgSrc } = this.form
      if (!(Employee && ImgSrc)) {
        this.error = 'Please complete the form'
        return
      }
      this.$apollo.mutate({
        mutation: Signup,
        variables: {
          id: this.$route.params.id,
          Employee: Employee,
          ImgSrc: ImgSrc
        }
      }).then(({data: {signup}}) => {
        console.log("CLIENT SIGNUP: signup "+ JSON.stringify(signup))
        const id = signup.id
        const token = signup.token
        this.saveUserData(id, token)
        console.log('success!') // For now just print
        this.$router.push({name: 'about'})
      }).catch((error) => {
        // this.error = 'Something went wrong'
        this.error = error
        console.log(error)
      })
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

.error {
  padding-top: 10px;
}
</style>

