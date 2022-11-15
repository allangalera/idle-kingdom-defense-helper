<script lang="ts">
	import Heading from '$lib/components/Heading/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import ExpeditionTable from '$lib/modules/expedition/ExpeditionTable/index.svelte';
	import * as styles from './index.css';

	export let raid;
</script>

<div class={styles.breadcrumb}>
	<Link href="/expedition">Expedition</Link>
	<Text>></Text>
	<Text>{raid.name}</Text>
</div>
<Heading textAlign="center" fontSize="3xl">{raid.name}</Heading>
<div class={styles.grid}>
	<ExpeditionTable data={raid.levels} />
</div>
