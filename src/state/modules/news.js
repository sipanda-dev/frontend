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
    async getAll({commit}){
        commit('loading')
        try {
            const {data} = await baseURL.get('news')
            commit('success', {news: data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async get({commit}, id){
        commit('loading')
        try {
            const {data} = await baseURL.get('news/'+id)
            commit('success', {info: data?.data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async createNews({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            let {data} = await baseURL.post('news', payload.data, config)
            if(!payload.not_cover)
            await baseURL.post('files/news/'+data.data.NEWS_ID, payload.cover, config)
            let response = await baseURL.get('news')
            commit('success', {news: response.data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async editNews({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            let {data} = await baseURL.put('news/'+payload.id, payload.data, config)
            if(!payload.not_cover)
            await baseURL.put('files/news/'+data.data.NEWS_ID, payload.cover, config)
            let response = await baseURL.get('news')
            commit('success', {news: response.data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async deleteNews({commit}, id){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.delete('news/'+id, config)
            let response = await baseURL.get('news')
            commit('success', {news: response.data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
}