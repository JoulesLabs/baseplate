import Request from '~/pkg/api-router/Request'

import Routes from '~/api_routes'

export default {
    methods: {
        /**
         * Create a base Axios request and configure the defaults.
         *
         */
        request() {
            return new Request({
                requestWithAuthorizationToken: true,
                routes: Routes,
                baseUrl: process.env.API_DOMAIN_URL || 'http://localhost',
                domainPort: process.env.API_DOMAIN_PORT || '8000',
                apiPrefix: process.env.API_ROUTE_PREFIX || 'api/v1',
            })
        }
    },
}
