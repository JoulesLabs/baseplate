import store from '~/store'

export default async (to, from, next) => {
  if (!store.getters['user/loggedIn']) {
    next({ name: 'login' })
  }
  next()
}
