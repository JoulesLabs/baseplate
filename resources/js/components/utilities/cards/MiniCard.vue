<template>
    <div class="meta-stat bg-white w-1/5 xs:w-full sm:w-full">
        <div>{{ day || '' }}</div>
        <div :class="mainSectionStyle">
            <div :class="primaryValueStyle">{{ stat.value }}</div>
            <span>
                <Up v-if="stat.increased" />
                <Down v-else />
                <span class="font-hairline text-sm text-gray-600">
                    {{ stat.alteration }}% <span v-if="daySince"> since {{ daySince }}</span>
                </span>
            </span>
        </div>
        <div :class="labelStyle">{{ stat.label }}</div>
    </div>
</template>

<script>
    import Up from "../arrows/Up"
    import Down from "../arrows/Down"

    export default {
        name: 'MiniCard',
        props: {
            stat: {
                required: true,
                type: Object
            },
            styles: {
                required: false,
                type: Object
            }
        },
        components: {
            Up,Down
        },

        data: () => ({
            dayMap: {
                1: 'Today',
                7: 'Last week',
                15: 'Last 15 days',
                30: 'Last month',
                60: 'Last two months',
                180: 'Last six months',
                '-1': 'Lifetime'
            },
            daySinceMap: {
                1: 'Yesterday',
                7: 'Last week',
                15: 'Last 15 days',
                30: 'Last month',
                60: 'Last two months',
                180: 'Last six months',
                '-1': 'Lifetime'
            },

        }),
        methods: {
            getStyle(prop,defaultValue = '') {
                if(this.styles) {
                    if(this.styles.hasOwnProperty(prop)) {
                        return this.styles[prop]
                    }
                }
                return defaultValue
            },
        },
        computed: {
            day() {
                return this.dayMap[this.stat.day]
            },
            daySince() {
                return this.daySinceMap[this.stat.day]
            },
            mainSectionStyle() {
                return this.getStyle('main','flex justify-around')
            },
            primaryValueStyle() {
                return this.getStyle('primary')
            },
            labelStyle() {
                return this.getStyle('label')
            }
        }
    }
</script>

<style scoped>
    .meta-stat {
        padding: 22px 15px;
        border-right: 2px solid #ebebeb;
    }
</style>
