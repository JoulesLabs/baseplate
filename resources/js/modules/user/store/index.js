import * as types from './types'

// state
const state = {
    user: null,
    token: null
}

// getters
const getters = {
    user: state => state.user,
    loggedIn: (state, getters) => getters.user !== null,
    token: state => state.token,
    authorizationKey: state => state.token.token || null
}

// mutations
const mutations = {
    [types.SAVE_TOKEN] (state, token ) {
        state.token = token

        localStorage.setItem('token',JSON.stringify(token ))
    },
    [types.SET_USER](state,user) {
        state.user = user
    },
    [types.LOGOUT] (state) {
        state.user  = null
        state.token = null
        localStorage.removeItem('token')
    }
}

// actions
const actions = {
    login({ commit }, { user, token }) {
        commit(types.SET_USER,user)
        commit(types.SAVE_TOKEN,token)
    },
    logout({ commit }){
        commit(types.LOGOUT)
    }
}

const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default user
