let all = ['A', 'P', 'B', 'C', 'D', 'K', 'W']
let admin = ['A', 'P', 'B', 'C', 'D']
let desa = ['D']
let nodesa = ['A', 'P', 'B', 'C']
// let user = ['citizen']
// let all = admin.concat(user)

export const menuItems = [
    {
        id: 'nav-title',
        label: "Menu Navigasi",
        isTitle: true,
        roles: all
    },
    {
        id: 'dashboard',
        label: "Dashboard",
        icon: "bx bx-home-circle",
        link: "/",
        roles: all
    },
    {
        id: 'profile',
        label: "My Profile",
        icon: "bx bx-user",
        link: "/profile",
        roles: all
    },
    {
        id: 'pengaduan',
        label: "Pengaduan",
        icon: "bxs bxs-report",
        link: "/admin/pengaduan",
        roles: ['W', ...admin]
    },
    {
        id: 'proyek-parent',
        label:'Proyek',
        icon: "bx bx-cog",
        roles: admin,
        subItems: [
            {
                id: 'proyek-child-1',
                label:'On Progress',
                link: '/admin/proyek/onprogress',
                parentId:'proyek-parent'
            },
            {
                id: 'proyek-child-2',
                label:'Peta Perbaikan',
                link: '/admin/proyek/petaperbaikan',
                parentId:'proyek-parent'
            },
        ]
    },
    {
        id: 'proyek-parent-kontraktor',
        label:'Proyek',
        icon: "bx bx-cog",
        roles: ['K', 'W'],
        subItems: [
            {
                id: 'proyek-child-kontraktor-1',
                label:'On Progress',
                link: '/admin/proyek/onprogress/k',
                parentId:'proyek-parent-kontraktor'
            },
            {
                id: 'proyek-child-kontraktor-2',
                label:'Peta Perbaikan',
                link: '/admin/proyek/petaperbaikan/k',
                parentId:'proyek-parent-kontraktor'
            },
        ]
    },
    {
        id: 'verify-parent',
        label:'Verif Warga',
        icon: "bx bx-book",
        roles: desa,
        subItems: [
            {
                id: 'verify-child-1',
                label:'Data Warga',
                link: '/admin/citizens',
                parentId:'verify-parent'
            },
            {
                id: 'verify-child-2',
                label:'Validasi Warga',
                link: '/admin/citizens/verify',
                parentId:'verify-parent'
            },
        ]
    },
    {
        id: 'kontraktor',
        label: "Kontraktor",
        icon: "bx bx-building-house",
        link: "/admin/kontraktor",
        roles: admin
    },
    {
        id: 'generate',
        label: "Generate Akun",
        icon: "bxs bxs-user-plus",
        link: "/admin/generate",
        roles: nodesa
    },
    {
        id: 'news',
        label: "Berita",
        icon: "bx bx-news",
        link: "/admin/news",
        roles: admin
    },
];

