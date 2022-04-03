const partiesRouter = [
  {
    name: 'PartiesIndex',
    path: 'parties',
    component: () => import('@/views/parties/Index'),
    meta: { title: 'Список', noCache: true, activeMenu: 'parties' },
    hidden: true
  }
]

export default partiesRouter

