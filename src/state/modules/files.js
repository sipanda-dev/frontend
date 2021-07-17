import baseURL from '../baseURL'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const state = {
    data: null,
    error: null,
    isLoading: false
}

export const mutations = {
    success(state, data) {
        state.data = data
        state.error = null
        state.isLoading = false
    },
    loading(state) {
        state.isLoading = true
    },
    error(state, error) {
        state.error = error
    },
    setUserData(state, data){
        state.data = {...state.data, ...data}
    },
    logout(state) {
        state.data = null;
        state.error = null;
    },
    resetError(state){
        state.error = null
    }
}

export const actions = {
    async uploadNews({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.post('files/news/'+payload.id, payload.data, config)
            commit('success')
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async uploadProject({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.post('files/project/'+payload.id, payload.data, config)
            commit('success')
        } catch(err){
            commit('error', err.data?.message)
        }
    },
}