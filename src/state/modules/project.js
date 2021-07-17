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
}

export const actions = {
    async getProjects({commit}){
        commit('loading')
        try {
            const {data} = await baseURL.get('project')
            commit('success', {project: data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async get({commit}, id){
        commit('loading')
        try {
            const {data} = await baseURL.get('project/'+id)
            commit('success', {project: data.data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async createProject({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.post('project', payload.data, config)
            let response = await baseURL.get('project')
            commit('success', {project: response.data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async editProject({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.put('project/'+payload.id, payload.data, config)
            let response = await baseURL.get('project')
            commit('success', {project: response.data})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async createProjDet({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            const {data} = await baseURL.post('projdet/'+payload.id, payload.data, config)
            await baseURL.post('finance', {parent: data.data.PROJDET_ID , ...payload.finance}, config)
            commit('success', {})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async editProjDet({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.put('projdet/'+payload.id_projdet, payload.data, config)
            await baseURL.delete('finance/'+payload.id_finance, config)
            await baseURL.post('finance', {parent: payload.id_projdet , ...payload.finance}, config)
            commit('success', {})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async deleteFinance({commit}, id){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.delete('finance/'+id, config)
            commit('success', {})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async createFinance({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.post('finance', payload, config)
            commit('success', {})
        } catch(err){
            commit('error', err.data?.message)
        }
    },
}