<script lang="ts">
	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import { getIdleKingdomNumberFormat } from '$lib/utils';
	import * as styles from './index.css';
	import type { CardTypes } from './type';
	import { returnCardTypeData } from './utils';
	import type { O } from '@mobily/ts-belt';

	export let width: Sprinkles['width'] = 24;
	export let value = 0;
	export let cardType: O.Option<CardTypes>;
	export let decimalNumbers = 0;

	let imageInfo = returnCardTypeData(cardType);
</script>

<CardBorder {width}>
	<div class={styles.cardContainerVariant[value ? 'with-value' : 'no-value']}>
		<div class={styles.imgContainer}>
			{#if imageInfo}
				<img
					loading="lazy"
					class={styles.img}
					src={imageInfo.src}
					alt={imageInfo.alt}
					title={imageInfo.alt}
				/>
			{/if}
		</div>
		{#if value}
			<div class={styles.textContainer}>
				<span>{getIdleKingdomNumberFormat(value, decimalNumbers)}</span>
			</div>
		{/if}
	</div>
</CardBorder>
