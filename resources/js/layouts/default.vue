<template>
  <div class="container-xl">
<!--    navbar was here-->
    <Navbar />
    <div class="container mx-auto max-w-full flex mb-4 h-screen">
    </div>
  </div>
</template>

<script>
import Navbar from "../components/partials/Navbar"
import Sidebar from "../components/partials/Sidebar"

export default {
    components: {
      Navbar,
      Sidebar
    },
    mounted() {
        _log('default-layout')
    }
}

</script>
