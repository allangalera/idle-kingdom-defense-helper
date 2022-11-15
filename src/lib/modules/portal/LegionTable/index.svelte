<script lang="ts">
	import Card from '$lib/components/Card/index.svelte';
	import GridItem from '$lib/components/GridItem/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import * as tableStyles from '$lib/styles/table.css';
	import { getRowStyling } from '$lib/styles/utils';
	import { getIdleKingdomNumberFormat } from '$lib/utils';
	import { returnItemStringIdById } from '$lib/utils/items';

	export let data;
	let firstRow = data[0];
</script>

<GridItem>
	<div
		class={tableStyles[
			`table${1 + firstRow.clearReward.length + firstRow.reclearReward.length}Columns`
		]}
	>
		<div class={tableStyles.tableHeaderItem} style={`grid-row: span 2;`}>
			<Heading textAlign="center" fontSize="xl">Level</Heading>
		</div>
		<div
			class={tableStyles.tableHeaderItem}
			style={`grid-column: span ${firstRow.clearReward.length};`}
		>
			<Heading textAlign="center" fontSize="xl">Clear Reward</Heading>
		</div>
		<div
			class={tableStyles.tableHeaderItem}
			style={`grid-column: span ${firstRow.reclearReward.length};`}
		>
			<Heading textAlign="center" fontSize="xl">Sweep Reward</Heading>
		</div>
		{#each firstRow.clearReward as item}
			<div class={tableStyles.tableHeaderItem}>
				<Card cardType={returnItemStringIdById(item)} width={10} />
			</div>
		{/each}
		{#each firstRow.reclearReward as item}
			<div class={tableStyles.tableHeaderItem}>
				<Card cardType={returnItemStringIdById(item)} width={10} />
			</div>
		{/each}
		{#each data as level, row}
			<div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
				<div class={tableStyles.tableItem}>
					<Text textAlign="center">{level.lv}</Text>
				</div>
				{#each level.clearReward as item}
					<div class={tableStyles.tableItem}>
						<Text>{getIdleKingdomNumberFormat(item.c)}</Text>
					</div>
				{/each}
				{#each level.reclearReward as item}
					<div class={tableStyles.tableItem}>
						<Text>{getIdleKingdomNumberFormat(item.c)}</Text>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</GridItem>
