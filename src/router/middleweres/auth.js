import { getToken } from '@/utils/auth' // get token from cookie

export default function auth({ to, from, next, store }) {
  const hasToken = getToken()
  if (to.name === 'Login' && ((hasToken === undefined) || (hasToken === ''))) {
    return next()
  }
  if (hasToken) {
    store.dispatch('auth/getInfo')
      .then(res => {
        if (to.name === 'Login') {
          return next({ name: 'CitizensIndex' })
        }
        return next()
      })
      .catch(err => {
        console.log(err)
        store.dispatch('auth/resetToken')
        next({ name: 'Login' })
      })
  } else {
    return next({ name: 'Login' })
  }
}
