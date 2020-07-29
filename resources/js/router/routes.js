
import WelcomePage from '../pages/welcome.vue'
import TestPage from '../pages/test.vue'

import ErrorPage from '../pages/errors/404.vue'
import UserRoutes from '~/modules/user/routes'


export default [
  { path: '/', name: 'welcome', component: WelcomePage },
  { path: '/test', name: 'test', component: TestPage },
  { path: '/home', name: 'home', component: WelcomePage },
  ...UserRoutes,
  { path: '*', component: ErrorPage }
]
