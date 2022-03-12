<script lang="ts">
	import * as styles from './index.css';

	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import Text from '$lib/components/Text/index.svelte';

	export let value: number;
</script>

<CardBorder>
	<div class={styles.container}>
		<img class={styles.background} src="images/rarity/bgRarity1.png" alt="Shard Card Background" />
		<img class={styles.iconShard} src="images/icons/iconPiece.png" alt="Icon Piece Shard" />
		<div class={styles.question}>
			<Text color="white" fontSize="3xl">?</Text>
		</div>
		<div class={styles.counter}>
			<Text color="white" fontSize="xl">{value}</Text>
		</div>
	</div>
</CardBorder>
