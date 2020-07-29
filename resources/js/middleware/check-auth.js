import store from '~/store'

export default async (to, from, next) => {
  if (!store.getters['auth/loggedIn'] && store.getters['auth/token']) {
    try {
        _log('fetch user')
      // await store.dispatch('auth/fetchUser')
    } catch (e) { }
  }

  next()
}
