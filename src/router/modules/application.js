const applicationsRouter = [
  {
    name: 'ApplicationsShow',
    path: 'applications/:id(\\d+)',
    component: () => import('@/views/application/show'),
    meta: { title: 'Роли', icon: 'role', noCache: true }
  },
  {
    name: 'ApplicationsCreate',
    path: 'applications/create/',
    component: () => import('@/views/application/create/index'),
    meta: { title: 'Создать', icon: 'edit', activeMenu: 'applications' },
    hidden: true
  },
  {
    name: 'ApplicationsEdit',
    path: 'applications/:id(\\d+)/edit/',
    component: () => import('@/views/application/update/index'),
    meta: { title: 'Изменить', noCache: true, activeMenu: 'applications' },
    hidden: true
  },
  {
    name: 'ApplicationsIndex',
    path: 'applications',
    component: () => import('@/views/application/index'),
    meta: { title: 'Изменить', noCache: true, activeMenu: 'applications' },
    hidden: true
  }
]

export default applicationsRouter
