<template>
    <div>
        <ul class="flex justify-start">
            <li>Previous</li>
            <li class="page-item pagination-page-nav" v-for="(page, key) in pageRange" :key="key">
                <a class="page-link" href="#">
                    {{ page }}
                </a>
            </li>
            <li>Next</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Paginator',
        props: {
            source: {
                required: true,
                type: Object
            },
        },
        computed: {
            limit() {
                return 10
            },
            currentPage() {
                return this.source.current_page
            },
            lastPage() {
                return this.source.last_page
            },
            itemsPerPage() {
                return this.source.per_page
            },
            pageRange() {
                if (this.limit === -1) {
                    return 0;
                }
                if (this.limit === 0) {
                    return this.lastPage;
                }

                let current = this.currentPage;
                let last = this.lastPage
                let delta = this.limit
                let left = current - delta
                let right = current + delta + 1
                let range = []
                let pages = []
                let l

                for (let i = 1; i <= last; i++) {
                    if (i === 1 || i === last || (i >= left && i < right)) {
                        range.push(i);
                    }
                }

                range.forEach(function (i) {
                    if (l) {
                        if (i - l === 2) {
                            pages.push(l + 1)
                        } else if (i - l !== 1) {
                            pages.push('...')
                        }
                    }
                    pages.push(i)
                    l = i;
                });
                return pages
            },

        },
        method: {
            requestMore(page) {
                if (page === '...') {
                    return
                }
                this.$emit('request-more',{ page })
            }
        }
    }
</script>
