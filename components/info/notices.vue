<template>
	<div>
		<ul v-if="notices.length > 0">
			<li
			:key="i"
			v-for="(notice,i) in notices">
				<h5>
					{{ notice }}
				</h5>
			</li>
		</ul>

		<h6 v-else>
			There are no notices currently.
		</h6>
	</div>
</template>

<script>
	export default{
		name: 'notices',
		data(){
			return {
				notices: [
					'Guide is currently not completely up to date, thus it is temporarily not available. It will be updated soon.'
				]
			}
		}
	}
</script>