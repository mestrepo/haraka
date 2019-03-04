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
        <h2>Welcome!</h2>
        <div>Enter your Email address to start free trial</div>

        <div v-if="error" class="error">
          {{ error }}
        </div>

        <el-form ref="form" :model="form">
          <el-form-item>
            <label>Email</label>
            <el-input v-model="form.Email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="capture">Create my haraka account</el-button>
          </el-form-item>
        </el-form>

        <div>
          <span>Already have an haraka account?</span>
          <router-link :to="{name: 'login'}" class="link">Log in</router-link>
        </div>

        <!--use this if the email capture sends invitation email to signup is implemented-->
        <!--<div v-if="submitted">-->
          <!--<div>Thank you!</div>-->
          <!--<div>Please check your Email.</div>-->
        <!--</div>-->

      </div>

    </el-main>
  </el-container>

</template>

<script>
  import { CaptureEmail } from '../constants/query.gql'
  import { validateEmail } from '@/helpers/helpers'

  export default {
    data() {
      return {
        submitted: false,
        error: false,
        form: {
          Email: '',
        }
      }
    },
    methods: {
      capture() {
        const {Email} = this.form
        if (!Email || !validateEmail(Email)) {
          this.error = 'Please enter a valid Email'
          return
        }
        this.$apollo.mutate({
          mutation: CaptureEmail,
          variables: {
            Email
          }
        }).then(({data}) => {
          this.submitted = true
          this.error = false

          // route to the signup page after email capture
          this.$router.push({
            path: 'signup'+'/'+data.captureEmail.id
          })
        }).catch((error) => {
          if (error.graphQLErrors.length >= 1) {
            this.error = error.graphQLErrors[0].message
          } else {
            // this.error = 'Something went wrong'
            this.error = error
            console.log(error)
          }
          console.log(error)
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .el-button {
    width: 100%;
  }

  .error {
    padding-top: 10px;
  }

</style>
