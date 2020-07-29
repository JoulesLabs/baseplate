<template>
    <div class="flex h-screen">
        <div class="w-6/12 bg-white flex">
            <div class="w-1/2 mx-auto self-center">
                <form @submit.prevent="login">
                        <div class="mb-3">
                         <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                           Email
                         </label>
                         <input v-model="form.email" class="shadow appearance-none border no-outline focus:outline-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="username" type="text" placeholder="Email">
                       </div>
                       <div class="mb-3">
                         <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                           Password (
                                <small @click="showPassword = !showPassword" class="cursor-pointer">
                                    <i v-if="showPassword" class="fas fa-eye-slash"></i>
                                    <i v-else class="fas fa-eye"></i>
                                </small>
                             )
                         </label>
                         <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="shadow appearance-none border no-outline focus:outline-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" id="password" placeholder="******************">
                       </div>

                       <div class="flex items-center justify-between">
                         <a class="inline-block align-baseline font-bold text-sm" href="#">
                           Forgot Password?
                         </a>
                         <button :disabled="processing" :class="processing ? 'app-colour-secondary' : 'app-colour'" class="hover:app-colour-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-none" type="submit">
                           Sign In
                         </button>
                       </div>
                       <!-- processing div -->
                       <div>
                           <div v-if="processing">
                               show section loader
                           </div>
                           <FormErrors :errors="errors" />
                       </div>
                       <!-- processing div ends -->
                </form>
            </div>
        </div>

        <div class="w-6/12 bg-scroll bg-contain bg-center bg-no-repeat" :style="{'background-image': `url(${bg})`}"></div>
    </div>
</template>

<script>

    import BACKGROUND_IMAGE from '~/assets/images/backgrounds/auth/login.png'

    export default {
        layout: 'auth',

        middleware: 'guest',

        data: () => ({

            // use require
            bg: 'https://cdn.dribbble.com/users/3750797/screenshots/13865762/media/10ac6577cf7698dcfa3abdcb7effed6d.jpg',

            form: {
                email: null,
                password: null,
            },

            showPassword: false,

            errors: [],
            processing: false
        }),

        mounted() {
            _log(this.$store.getters["user/loggedIn"])
        },
        methods: {
            login() {
                this.processing = false

                this.request()
                    .to('login')
                    .with(this.form)
                    .success(async (res) => {
                        await this.$store.dispatch('user/login',res.data)
                        this.route.push({ name: 'home' })
                    })
                    .error((err,errorBag) => {
                        this.errors = errorBag.errors
                    })
                    .endsWith(() => {
                        this.processing = false
                    })
                    .send()
            }
        }
    }
</script>
