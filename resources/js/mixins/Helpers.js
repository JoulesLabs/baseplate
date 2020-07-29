import conf  from '../conf'
export default {

    methods: {
        /**
         * Scroll to the very top
         */
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        /**
         * Parse a given url.
         *
         * @param url
         */
        parseURL(url) {
            let parser = document.createElement('a'),
                searchObject = {},
                queries,
                split,
                i;

            parser.href = url;
            queries = parser.search.replace(/^\?/, '').split('&');

            for (i = 0; i < queries.length; i++) {
                split = queries[i].split('=');
                searchObject[split[0]] = split[1];
            }

            return {
                protocol: parser.protocol,
                host: parser.host,
                hostname: parser.hostname,
                port: parser.port,
                pathname: parser.pathname,
                search: parser.search,
                searchObject: searchObject,
                hash: parser.hash
            };
        },
    },
}
