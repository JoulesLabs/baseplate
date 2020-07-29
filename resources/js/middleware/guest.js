import store from '~/store'

export default (to, from, next) => {
  if (store.getters['user/loggedIn']) {
    next({ name: 'home' })
  } else {
    next()
  }
}
