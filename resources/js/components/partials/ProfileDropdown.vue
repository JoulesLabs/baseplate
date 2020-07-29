<template>
    <div class="relative">
        <button @click="isOpen = !isOpen" class="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-white-400 focus:outline-none focus:border-white-400">
            <img class="h-full w-full object-cover" src="https://avatars2.githubusercontent.com/u/20617352?s=460&u=6eaa4bcf4467c663c0bad7f22f21160aafba6651&v=4" alt="Your avatar">
        </button>
        <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"></button>
        <div v-if="isOpen" @click="logout" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
            <a href="#" class="block px-4 py-2 text-black hover:main-colour">{{ processing ? 'Signing out' : 'Sign out' }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            processing: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                isOpen: false
            }
        },
        created() {
            const handleEscape = (e) => {
                if (e.key === 'Esc' || e.key === 'Escape') {
                    this.isOpen = false
                }
            }
            document.addEventListener('keydown', handleEscape)
            this.$once('hook:beforeDestroy', () => {
                document.removeEventListener('keydown', handleEscape)
            })
        },
        methods: {
            logout() {
                if(! this.processing) {
                    this.$emit('logout')
                }
            }
        }
    }
</script>
