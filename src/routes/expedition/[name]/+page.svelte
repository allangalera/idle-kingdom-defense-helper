<script lang="ts">
	import ExpeditionPage from '$lib/modules/expedition/page/index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ExpeditionPage raid={data.raid} />
