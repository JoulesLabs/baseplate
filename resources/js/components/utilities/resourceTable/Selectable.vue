<template>
    <div>
        <select @change="emit" v-model="selected" class="block appearance-none w-full p-2 bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option v-for="(option,i) in options" :key="i" :value="renderValue(option)">{{ renderText(option) }}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'Selectable',
        props: {
            options: {
                required: true,
                type: Array
            },
            column: {
                required: false,
                type: String
            },
            text: {
                required: false,
                type: String
            },
            identifier: {
                required: true,
                type: String
            },
            preselected: {
                required: false,
            }
        },
        data() {
            return {
                selected: null,
            }
        },
        created() {
            this.selected = this.preselected
        },
        methods: {
            renderValue(option) {
                if(this.column) {
                    return option[this.column]
                }

                return option
            },
            renderText(option) {
                if(this.text) {
                    return option[this.text]
                }

                return option
            },
            emit() {
                this.$emit('triggered-filter',{ identifier: this.identifier, value: this.selected })
            }
        }
    }
</script>
