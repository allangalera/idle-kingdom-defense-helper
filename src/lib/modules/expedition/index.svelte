<script lang="ts">
	import Heading from '$lib/components/Heading/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import * as tableStyles from '$lib/styles/table.css';
	import { getRowStyling } from '$lib/styles/utils';
	import { raidRewardsMapBySlugifiedName } from '$lib/utils/raid';
	import * as styles from './index.css';
</script>

<Heading textAlign="center" fontSize="3xl">Expedition</Heading>
<div class={styles.grid}>
	<div class={tableStyles.table1Columns}>
		{#each Array.from(raidRewardsMapBySlugifiedName) as raid, row}
			<div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
				<div class={tableStyles.tableItem}>
					<Link href={`/expedition/${raid[0]}`}>{raid[1].name}</Link>
				</div>
			</div>
		{/each}
	</div>
</div>
