import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
const Home = () => import('./views/HomeView.vue')
const Gallery = () => import('./views/gallery/IndexView.vue')
const uploadFile = () => import('./views/gallery/CreateView.vue')
const Register = () => import('./views/auth/RegisterView.vue')
const Login = () => import('./views/auth/LoginView.vue')
const Profile = () => import('./views/auth/ProfileView.vue')
const Error404 = () => import('./views/error/Error404.vue')
const Error500 = () => import('./views/error/Error500.vue')

const routes = [
  // {
  //   path: '/',
  //   component: () => import('./components/DefaultLayout.vue'),
  //   children: [
  //     { path: '/', name: 'home', component: () => import('./views/HomeView.vue'), meta: { title: 'Upload File' } },
  //     { path: '/image', name: 'image', component: () => import('./views/ImageView.vue'), meta: { title: 'Image Gallery' } },
  //   ]
  // },
  { path: '/', name: 'home', component: Home, meta: { title: 'About Us' } },
  { path: '/gallery', name: 'gallery', component: Gallery, meta: { title: 'Image Gallery', requiredAuth: true } },
  { path: '/upload-file', name: 'uploadFile', component: uploadFile, meta: { title: 'Upload File', requiredAuth: true } },

  { path: '/register', name: 'register', component: Register, meta: { title: 'Sign Up', requiredGuest: true } },
  { path: '/login', name: 'login', component: Login, meta: { title: 'Log In', requiredGuest: true } },
  { path: '/profile', name: 'profile', component: Profile, meta: { title: 'Profile', requiredAuth: true } },
  // { path: '/:pathMatch(.*)*', redirect: '/' }
  { path: '/404', name: '404', component: Error404, meta: { title: '404 Error' } },
  { path: '/500', name: '500', component: Error500, meta: { title: '500 Error' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // linkActiveClass: 'text-gray-500',
  // linkExactActiveClass: 'text-gray-500',
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Gallery`
  next()
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiredAuth) && !authStore.isLoggedIn) {
    return next({ name: 'login' })
  }
  else if (to.matched.some((record) => record.meta.requiredGuest) && authStore.isLoggedIn) {
    return next({ name: 'uploadFile' })
  }
  else next()
})

export default router