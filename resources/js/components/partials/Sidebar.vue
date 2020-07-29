<template>
    <div class="w-128 main-colour h-screen hidden sm:block">
        <ul class="list-reset">
            <li v-for="(item,i) in items" :key="i">
                <router-link :to="item.url" class="block rounded p-3">
                    <i class="faded-text fas" :class="item.icon"></i>
                    {{ item.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    { icon: 'fa-tachometer-alt', name: 'Dashboard', url: 'dashboard' },
                ]
            }
        }
    }
</script>
