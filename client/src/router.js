import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import Admin from './views/Admin.vue'
import Regular from './views/Regular.vue'
import Anomaly from './views/Anomaly'

Vue.use(Router)

/* authenticated routes version */
// const regular = {
//   path: '/regular/:id',
//   name: 'regular',
//   component: Regular,
//   meta: { title: 'Regular User - haraka' }
// }
//
// const admin = {
//   path: '/admin/:id',
//   name: 'admin',
//   component: Admin,
//   meta: { title: 'Admin USer - haraka' }
// }
const anomaly = {
  path: '/anomaly',
  name: 'anomaly',
  component: Anomaly,
  meta: { title: 'Anomaly - haraka' }
}

const regular = {
  path: '/regular',
  name: 'regular',
  component: Regular,
  meta: { title: 'Regular User - haraka' }
}

const admin = {
  path: '/admin',
  name: 'admin',
  component: Admin,
  meta: { title: 'Admin USer - haraka' }
}

const login = {
  path: '/login',
  name: 'login',
  component: Login,
  meta: { title: 'Login - haraka' }
}

const about = {
  path: '/about',
  name: 'about',
  component: About,
  meta: { title: 'About - haraka' }
}

const signup = {
  path: '/signup/:id',
  name: 'signup',
  component: Signup,
  meta: {title: 'Signup - haraka'}
}

const home = {
  path: '/',
  name: 'home',
  component: Home,
  meta: { title: 'haraka' }
}

const router = new Router({
  mode: 'history',
  routes: [
    home,
    signup,
    about,
    login,
    admin,
    regular,
    anomaly
  ]
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('user-id')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!auth) {
      next(login)
    }
  } else if (to.matched.some(record => record.meta.redirect)) {
    if(auth) {
      next(about)
    }
  }
  next()
})

// eslint-disable-next-line
router.afterEach((to, from) => {
  // Add title to tab
  document.title = to.meta.title
})

export default router
