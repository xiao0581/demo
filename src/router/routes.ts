import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomeView.vue') },
      { path: '/calendar', component: () => import('pages/CalendarView.vue') },
      { path: '/message', component: () => import('pages/MessageView.vue') },
      { path: '/notification', component: () => import('pages/NotifictionView.vue') },
      { path: '/login', component: () => import('pages/LoginView.vue') },
      {
        path: '/event/:id',
        name: 'EventDetail',
        component: () => import('pages/EventDetail.vue'),
        meta: { hideFooter: true },
      },
    ],
  },
]

export default routes
