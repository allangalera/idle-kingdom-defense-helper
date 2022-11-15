<script lang="ts">
	import Card from '$lib/components/Card/index.svelte';
	import CardHeroShard from '$lib/components/CardHeroShard/index.svelte';
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
	<div class={tableStyles[`table${2 + firstRow.rewards.length}Columns`]}>
		<div class={tableStyles.tableHeaderItem} style={`grid-row: span 2;`}>
			<Heading textAlign="center" fontSize="xl">Level</Heading>
		</div>
		<div class={tableStyles.tableHeaderItem} style={`grid-row: span 2;`}>
			<Heading textAlign="center" fontSize="xl">Stage difficulty</Heading>
		</div>
		<div
			class={tableStyles.tableHeaderItem}
			style={`grid-column: span ${firstRow.rewards.length};`}
		>
			<Heading textAlign="center" fontSize="xl">Rewards</Heading>
		</div>
		{#each firstRow.rewards as item}
			<div class={tableStyles.tableHeaderItem}>
				{#if item.t === 201}
					<CardHeroShard width={10} grade={item.gr} />
				{:else}
					<Card cardType={returnItemStringIdById(item)} width={10} />
				{/if}
			</div>
		{/each}
		{#each data as level, row}
			<div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
				<div class={tableStyles.tableItem}>
					<Text textAlign="center">{level.lv}</Text>
				</div>
				<div class={tableStyles.tableItem}>
					<Text textAlign="center">{level.difficultyStage}</Text>
				</div>
				{#each level.rewards as item}
					<div class={tableStyles.tableItem}>
						<Text>{getIdleKingdomNumberFormat(item.c)}</Text>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</GridItem>
