import baseURL from '../baseURL'
import Cookies from 'universal-cookie'
import router from "../../router";
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
    login({ commit }, payload) {
        return new Promise(async (resolve, reject) => {
            commit('loading')
            try {
                const {data} = await baseURL.post('user/login', {email:payload.email, password:payload.password})

                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 365);
                cookies.set('token', data?.token, { path: '/', expires: expireDate });

                resolve('/')
            } catch(err){
                commit('error', 'Email atau Password salah!')
                reject()
            }
        })
    },
    setUserData({commit}, data){
        commit('setUserData', data)
    },
    updateProfile({commit}, payload){
        return new Promise(async (resolve, reject) => {
            commit('loading')
            try {
                const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
                if(payload.cover){
                    if(payload.cover_id)
                    await baseURL.delete(`files/${payload.cover_id}`, config)
                    await baseURL.post('files/user/'+payload.user_id, payload.cover, config)
                }
                await baseURL.put('user', payload.data, config)
                const {data} = await baseURL.get('user', config)
                commit('success', data?.data)
                Swal.fire({
                    title: 'Update Profile Sukses!',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    willClose: () => {
                    }
                })
                resolve()
            } catch(err){
                commit('error', err.data?.message)
                reject()
            }
        })
    },
    updateKTP({commit}, payload){
        return new Promise(async (resolve, reject) => {
            commit('loading')
            try {
                const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
                if(payload.ktp){
                    if(payload.ktp_id)
                        await baseURL.delete(`files/${payload.ktp_id}`, config)
                    await baseURL.post('files/ktp/'+payload.user_id, payload.ktp, config)
                }
                if(payload.diri){
                    if(payload.diri_id)
                        await baseURL.delete(`files/${payload.diri_id}`, config)
                    await baseURL.post('files/diri/'+payload.user_id, payload.diri, config)
                }
                const {data} = await baseURL.get('user', config)
                commit('success', data?.data)
                Swal.fire({
                    title: 'Update Profile Sukses!',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    willClose: () => {
                    }
                })
                resolve()
            } catch(err){
                commit('error', err.data?.message)
                reject()
            }
        })
    },
    getUserData({commit}){
        return new Promise(async (resolve, reject) => {
            commit('loading')
            try {
                const config = { headers: { token: `BEARER ${cookies.get('token')}` } }
                const {data} = await baseURL.get('user', config)
                commit('success', data?.data)
                resolve()
            } catch(err){
                commit('error', err.data?.message)
                reject()
            }
        })
    },
    logout({ commit }) {
        cookies.set('token', '', { path: '/', expires: (new Date(Date.now())) });
        cookies.set('role', '', { path: '/', expires: (new Date(Date.now())) });
        cookies.set('token', '', { expires: (new Date(Date.now())) }); // deleted soon
        cookies.set('role', '', { expires: (new Date(Date.now())) }); // deleted soon
        commit('logout');
        router.push('/login');
    },
    resetError({commit}){
        commit('resetError')
    }
}