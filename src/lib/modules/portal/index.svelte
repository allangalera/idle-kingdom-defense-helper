<script lang="ts">
	import Heading from '$lib/components/Heading/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { portalLegionsMapByNameSlugified } from '$lib/db/portal';
	import * as tableStyles from '$lib/styles/table.css';
	import { getRowStyling } from '$lib/styles/utils';
	import * as styles from './index.css';
</script>

<Heading textAlign="center" fontSize="3xl">Portal</Heading>
<div class={styles.grid}>
	<div class={tableStyles.table1Columns}>
		{#each Array.from(portalLegionsMapByNameSlugified) as legion, row}
			<div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
				<div class={tableStyles.tableItem}>
					<Link href={`/portal/${legion[0]}`}>{legion[1].name}</Link>
				</div>
			</div>
		{/each}
	</div>
</div>
