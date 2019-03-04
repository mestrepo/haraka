<template>
  <el-container>
    <el-header>

      <navigation>
        <router-link :to="{name: 'about'}" class="link">About Haraka</router-link>
        <router-link :to="{name: 'home'}" class="link">Create Account</router-link>
        <router-link :to="{name: 'login'}" class="link">Login to Haraka</router-link>
      </navigation>
    </el-header>

    <el-main>
      <div class="about">
        <h1>About Haraka</h1>
        <h1>
          <p>Haraka is a Fixed Asset Management Software for all your asset management needs</p>
        </h1>
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div>
        <span>Don't have an account?</span>
        <router-link :to="{name: 'home'}" class="link">Create an account</router-link>
      </div>

      <div>
        <span>Already have an haraka account?</span>
        <router-link :to="{name: 'login'}" class="link">Log in</router-link>
      </div>

    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
  .el-button {
    width: 100%;
  }

  .error {
    padding-top: 10px;
  }

</style>
