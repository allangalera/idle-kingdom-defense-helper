<script lang="ts">
	import HeroPage from '$lib/modules/hero/page/index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<HeroPage hero={data.hero} />
