<script lang="ts">
	import Heading from '$lib/components/Heading/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { stagesByLegion } from '$lib/db/portal';
	import LegionTable from '$lib/modules/portal/LegionTable/index.svelte';
	import * as styles from './index.css';

	export let portal;
</script>

<div class={styles.breadcrumb}>
	<Link href="/portal">Portals</Link>
	<Text>></Text>
	<Text>{portal.name}</Text>
</div>
<Heading textAlign="center" fontSize="3xl">{portal.name}</Heading>
<div class={styles.grid}>
	<LegionTable data={stagesByLegion[portal.name]} />
</div>
