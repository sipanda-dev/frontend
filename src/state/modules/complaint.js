import baseURL from '../baseURL'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
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
    resetError(state){
        state.error = null
    }
}

export const actions = {
    async getByCategory({commit}, cat){
        commit('loading')
        try {
            const {data} = await baseURL.get('complaint/category/'+cat)
            commit('success', data)
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async get({commit}, id){
        commit('loading')
        try {
            const {data} = await baseURL.get('complaint/'+id)
            commit('success', data.data)
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async update({commit}, payload){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            await baseURL.put('complaint/'+payload.complaint_id, payload.data, config)
            if(payload.follup)
                await baseURL.put('complaint/'+payload.complaint_id+'/follow_up', {parent:payload.follup}, config)
            const {data} = await baseURL.get('complaint/'+payload.complaint_id)
            Swal.fire({
                title: 'Update Sukses!',
                icon: 'success',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                }
            })
            commit('success', data.data)
        } catch(err){
            commit('error', err.data?.message)
        }
    },
    async createComplaint({commit}, {payload, files, cat}){
        commit('loading')
        try {
            const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
            const response = await baseURL.post('complaint', payload, config)
            let formData
            files.map(item => {
                formData = new FormData()
                formData.append('file', item)
                baseURL.post('files/complaint/'+response.data.data.COMPLAINT_ID, formData, config)
            })
            const {data} = await baseURL.get('complaint/category/'+cat)
            commit('success', data)
        } catch(err){
            commit('error', err.data?.message)
        }
    }
}