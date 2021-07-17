// import store from '@/state/store'
import Layout from './dashboard/layout'

export default [
    {
        path: '/login',
        name: 'default',
        meta: {
            authRequired: true,
        },
        component: () => import('./users/login/index'),
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: require('@/router/dashboard/landing/index').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/profile',
                component: require('@/router/dashboard/profile').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/pengaduan',
                component: require('@/router/dashboard/pengaduan/index').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/pengaduan/data-aduan/:category',
                component: require('@/router/dashboard/pengaduan/data-aduan').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/pengaduan/data-aduan/:id/detail',
                component: require('@/router/dashboard/pengaduan/detail').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/citizens',
                component: require('@/router/dashboard/verif_warga/data_warga').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/citizens/verify',
                component: require('@/router/dashboard/verif_warga/validasi_warga').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/citizens/verify/:id',
                component: require('@/router/dashboard/verif_warga/detail').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/kontraktor',
                component: require('@/router/dashboard/kontraktor/index').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/news/:id',
                component: require('@/router/dashboard/berita/info').default,
                props:true,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/proyek/onprogress/k',
                component: require('@/router/dashboard/proyek_kontraktor/proyek_onprogress').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/proyek/onprogress/k/:id',
                component: require('@/router/dashboard/proyek_kontraktor/detail').default,
                props:true,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/proyek/onprogress',
                component: require('@/router/dashboard/proyek/proyek_onprogress').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/proyek/onprogress/:id',
                component: require('@/router/dashboard/proyek/detail').default,
                props:true,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/news',
                component: require('@/router/dashboard/berita/index').default,
                meta: {
                    authRequired: true,
                },
            },
            {
                path: '/admin/generate',
                component: require('@/router/dashboard/generate/index').default,
                meta: {
                    authRequired: true,
                },
            },
        ]
    }
]