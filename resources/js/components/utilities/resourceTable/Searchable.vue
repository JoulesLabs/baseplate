<template>
    <div>
        <label v-if="label" for="username">{{ label }}</label>
        <input v-model="model" @keyup="emit" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" :placeholder="placeholder">
    </div>
</template>

<script>
    export default {
        name: 'Searchable',
        props: {
            identifier: {
                required: true,
                type: String
            },
            label: {
                required: false,
                type: String
            },
            placeholder: {
                required: false,
                type: String
            },
        },
        data() {
            return {
                model: null
            }
        },
        methods: {
            emit() {
                this.$emit('triggered-filter', { identifier: this.identifier, value: this.model })
            }
        }
    }
</script>
