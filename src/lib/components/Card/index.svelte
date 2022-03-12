<script lang="ts">
	import * as styles from './index.css';
	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import ascensionStoneIcon from '$lib/assets/iconEvolveStone.png';
	import goldCoinIcon from '$lib/assets/iconGold.png';
	import soulstoneIcon from '$lib/assets/iconSoul.png';
	import { getIdleKingdomNumberFormat } from '$lib/utils';
	export let value: number = 0;
	export let cardType: CardType;
</script>

<CardBorder>
	<div class={styles.teste}>
		<div class={styles.imgContainer}>
			{#if cardType === 'ascension-stone'}
				<img class={styles.img} src={ascensionStoneIcon} alt="Ascension Stone Icon" />
			{:else if cardType === 'coin'}
				<img class={styles.img} src={goldCoinIcon} alt="Coin Icon" />
			{:else if cardType === 'soulstone'}
				<img class={styles.img} src={soulstoneIcon} alt="Soulstone Icon" />
			{/if}
		</div>
		<div class={styles.textContainer}>
			<span>{getIdleKingdomNumberFormat(value)}</span>
		</div>
	</div>
</CardBorder>
