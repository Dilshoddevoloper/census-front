const citizensRouter = [
  {
    name: 'CitizensShow',
    path: 'citizens/:id(\\d+)',
    component: () => import('@/views/citizen/show'),
    meta: { title: 'Роли', icon: 'role', noCache: true }
  },
  {
    name: 'CitizensCreate',
    path: 'citizens/create/',
    component: () => import('@/views/citizen/create/index'),
    meta: { title: 'Создать', icon: 'edit', activeMenu: 'citizens' },
    hidden: true
  },
  {
    name: 'CitizensEdit',
    path: 'citizens/:id(\\d+)/edit/',
    component: () => import('@/views/citizen/update/index'),
    meta: { title: 'Изменить', noCache: true, activeMenu: 'citizens' },
    hidden: true
  },
  {
    name: 'CitizensIndex',
    path: 'citizens',
    component: () => import('@/views/citizen/index'),
    meta: { title: 'Изменить', noCache: true, activeMenu: 'citizens' },
    hidden: true
  }
]

export default citizensRouter
