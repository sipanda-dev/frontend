import baseURL from '../baseURL'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const state = {
    users: null,
    error: null,
    isLoading: false
}

export const mutations = {
    success(state, data) {
        state.users = data
        state.error = null
        state.isLoading = false
    },
    loading(state) {
        state.isLoading = true
    },
    error(state, error) {
        state.error = error
    },
    resetError(state){
        state.error = null
    }
}

export const actions = {
    async generate({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            let {data} = await baseURL.post('user/', payload.data, config)
            if(!payload.not_cover)
            await baseURL.post('files/user/'+data.data.USER_ID, payload.cover, config)
            const response = await baseURL.get(`user/all/${payload.type ? `${payload.type}` : '0'}`, config)
            commit('success', response.data?.data)
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async getAll({commit}, type){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            const {data} = await baseURL.get(`user/all/${type ? `${type}` : '0'}`, config)
            commit('success', data?.data)
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async get({commit}, id){
        commit('loading')
        try {
            const {data} = await baseURL.get('user/id/'+id)
            commit('success', data?.data)
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async update({commit}, {id, payload}){
        commit('loading')
        try {
            await baseURL.put('user/id/'+id, payload)
            const {data} = await baseURL.get('user/id/'+id)
            commit('success', data?.data)
        } catch(err){
            commit('error', err.data?.message)
        }
    },
}