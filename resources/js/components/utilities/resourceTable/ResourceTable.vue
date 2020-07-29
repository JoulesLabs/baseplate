<template>
    <div class="mt-2">
<!--        filter section-->
        <div v-if="filter" :class="filterContainerStyle">
            <div v-for="(filter,j) in filters" :key="j">
                <Selectable v-if="filter.type === 'dropdown'" @triggered-filter="notifyParent"
                            :preselected="filter.preselected" :identifier="filter.identifer" :options="filter.options"
                            :column="filter.column || null" :text="filter.text || null"
                            :class="filterItemStyle"
                />
                <Searchable v-if="filter.type === 'search'" @triggered-filter="notifyParent" :identifier="filter.identifer"
                            :placeholder="filter.placeholder" :model="filter.model"
                            :class="filterItemStyle"
                />
            </div>
            <div v-if="filters.length > 0">
                <button :class="resetButtonStyle">reset filter</button>
                <button :class="applyButtonStyle">apply filter</button>
            </div>
        </div>
<!--        filter section ends here-->
        <div v-if="items.length > 0" :load="triggerModelAllocation"></div>

        <div class="bg-white">
            <table class="w-full m-0 table-fixed text-sm">
                <thead>
                <tr class="text-center">
                    <th class="capitalize" v-for="(header,i) in headers" :key="i">{{ displayHeader(header) }}</th>
                    <th v-if="hasActions" class="capitalize">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in items" :key=i :class="i % 2 === 0 ? 'bg-gray-100' : ''" class="table-row text-center leading-relaxed h-18 mb-22" >
                    <td v-for="(header,j) in headers" :key="j" v-html="draw(item,header)"></td>

                    <td v-if="hasActions">
<!--                        show dropdown or single item-->
                        <div v-if="useDropDownInAction">
                            <select v-model="selectedAction[i]" @change="triggerEvent($event,item,null,i)" class="block appearance-none w-auto p-2 bg-white border border-gray-400 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="_" disabled selected>
                                    <i class="fas fa-wrench"></i>
                                    Options
                                </option>
                                <option v-for="(action,k) in actions" :key="k">
                                    <i v-if="action.icon" :class="action.icon" />
                                    {{ action.text }}
                                </option>
                            </select>
                        </div>
                        <div v-else :class="actionRowStyles">
                            <span class='mr-1 cursor-pointer' v-for="(action,k) in actions" :key="k" @click="triggerEvent($event,item,action.identifier)">
                                <i v-if="action.icon" :class="action.icon" />
                                {{ action.text }}
                            </span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div v-if="allowPagination" class="flex justify-center">
                <pagination v-if="resource.source" :align="'center'" :data="resource.source" :limit="10" @pagination-change-page="requestForPageChange"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Admin from "../badges/Admin"
    import Selectable from "./Selectable"
    import Searchable from "./Searchable"

    export default {
        name: 'ResourceTable',
        props: {
            resource: {
                required: true,
                type: Object
            }
        },
        components: {
            Selectable,
            Admin,
            Searchable
        },
        data: () => ({
            selectedAction: []
        }),
        mounted() {
            this.items.forEach((_,i) => {
                this.selectedAction[i] = '_'
            })
        },
        computed: {
            headers() {
                return this.resource.headers
            },
            loading() {
                return this.resource.loading
            },
            processing() {
                return this.resource.processing
            },
            paginator() {
                if(this.resource['source']) {
                    return this.resource['source']
                }
                return null
            },
            items() {
                if(this.paginator) {
                    return this.resource['source']['data']
                }
                return []
            },
            drawables() {
                if(this.resource.hasOwnProperty('drawables')) {
                    return this.resource['drawables']
                }
                return null
            },
            actions() {
                return this.resource.hasOwnProperty('actions') ? this.resource['actions'] : []
            },
            hasActions() {
                return this.actions.length > 0
            },
            allowPagination() {
                if(this.resource.hasOwnProperty('paginate')) {
                    return this.resource['paginate']
                }

                return true
            },
            styles() {
                if(this.resource['styles']) {
                    return this.resource['styles']
                }

                return null
            },
            actionRowStyles() {
                if(this.styles) {
                    return this.styles['action']['row'] || ''
                }

                return ''
            },
            filter() {
                return this.resource.hasOwnProperty('filter') ? this.resource['filter'] : null
            },
            filters() {
                if(! this.filter) { return [] }

                return this.filter.hasOwnProperty('filters') ? this.filter['filters'] : []
            },
            filterContainerStyle(){
                return this.filterStyles('container')
            },
            filterOptionsStyle(){ // TODO rename
                return this.filterStyles('options')
            },
            filterItemStyle(){ // TODO rename
                return this.filterStyles('item')
            },
            resetButtonStyle() {
                return this.filterStyles('reset')
            },
            applyButtonStyle() {
                return this.filterStyles('apply')
            },
            useDropDownInAction() {
                return this.resource.hasOwnProperty('useDropDownInAction') ? this.resource['useDropDownInAction'] : false
            },
            /**
             * HACK
             */
            triggerModelAllocation() {
                this.items.forEach((_,i) => {
                    this.selectedAction[i] = '_'
                })
            }
        },
        methods: {
            getDrawable(name) {
                if(! this.drawables) return null
                return this.drawables[name]
            },
            draw(item, column) {
                if (!column) {
                    return null
                }
                let col, draw
                [col, draw] = column.split('|')


                let columnName, displayAs
                [columnName, displayAs] = col.split(':')

                if (!draw) {
                    return item[columnName]
                }
                if (draw !== 'draw') {
                    return null
                }


                let handler = this.getDrawable(columnName)

                if (!handler) return null

                return handler(item)
            },
            displayHeader(header) {
                header = header.split('|')[0]

                let columnName, displayAs
                [columnName,displayAs] = header.split(':')

                if(displayAs) return displayAs

                return columnName.split('_').join(' ')
            },
            triggerEvent(event,item,identifier = null,index = null) {
                if(! identifier) {
                    identifier = this.selectedAction[index]
                }
                this.$emit('action-fired',{ event, data: item, identifier })
            },
            notifyParent(data) {
                this.$emit(data.identifier,{ value: data.value })
            },
            requestForPageChange(page) {
                this.$emit('paginate', { page })
            },
            filterStyles(prop,defaultValue = '') {
                if(this.styles) {
                    if(this.styles.hasOwnProperty('filter')) {
                        return this.styles['filter'][prop]
                    }
                }
                return defaultValue
            },

        }
    }
</script>

<style>
    tr.table-row>td {
        padding: 1rem;
    }
    .pagination {
        display: flex;
        margin: 10px auto;
        padding: 5px;
    }
    .pagination .page-item {
        margin: 0 2px;
        padding: 8px;
        border-radius: 2px;
        background-color: #ededed;
        color: black;
    }
</style>
