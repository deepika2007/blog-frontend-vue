import Vue from 'vue'
import Router from 'vue-router'
import BlogContainer from '@/components/BlogContainer'
import AddBlog from '@/components/AddBlog'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BlogContainer',
      component: BlogContainer
    },
    {
      path: '/create',
      name: 'AddBlog',
      component: AddBlog
    },
    { path: "/signin", component: SignIn },
    { path: "/signup", component: SignUp },
    { path: "*", component: NotFound }

  ]
})
