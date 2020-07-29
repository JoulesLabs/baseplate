<template>
	<div class="flex flex-col rounded">
		<span v-for="(error,i) in errors" :key="i" v-text="error" class="pt-1 text-red-500 text-sm break-words subpixel-antialiased"></span>
	</div>
</template>

<script>
export default{
	name: 'FormErrors',

	props: {
		errors: {
			type: Array,
			required: true,
		}
	}
}

</script>
