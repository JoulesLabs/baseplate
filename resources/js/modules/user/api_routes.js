import * as http from '~/pkg/api-router/HttpVerbs'

const UserAPIRoutes = [
    {
        name: 'login',
        method: http.POST,
        path: '/login'
    },
    {
        name: 'logout',
        method: http.POST,
        path: '/logout'
    },
    {
        name: 'test',
        method: http.GET,
        path: '/test/{id}/slug/{slug}/'
    },
]

export default UserAPIRoutes
