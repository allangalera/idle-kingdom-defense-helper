<script lang="ts">
	import PortalPage from '$lib/modules/portal/page/index.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PortalPage portal={data.portal} />
