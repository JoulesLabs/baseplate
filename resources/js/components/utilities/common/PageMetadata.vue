<template>
    <div>
        <div class="w-full p-5 bg-white">
            <span class="text-xl">{{ pageName }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageMetadata',
        props: {
            metadata: {
                type: Object,
                required: true
            }
        },
        computed: {
            pageName() {
                return this.metadata['page']
            }
        }
    }
</script>
