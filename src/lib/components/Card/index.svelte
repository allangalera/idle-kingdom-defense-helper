<script lang="ts">
	import * as styles from './index.css';
	import ascensionStoneIcon from '$lib/assets/Ascension.png';
	import goldCoinIcon from '$lib/assets/gold_icon.png';
	import soulstoneIcon from '$lib/assets/Soulstone.png';
	import { getIdleKingdomNumberFormat } from '$lib/utils';
	export let value: number = 0;
	export let cardType: string = 'ascension-stone';
</script>

<div class={styles.wrapper}>
	<div class={styles.container}>
		<div class={styles.border2}>
			<div class={styles.inner}>
				<div class={styles.teste}>
					<div class={styles.imgContainer}>
						{#if cardType === 'ascension-stone'}
							<img class={styles.img} src={ascensionStoneIcon} alt="icooon" />
						{:else if cardType === 'coin'}
							<img class={styles.img} src={goldCoinIcon} alt="icooon" />
						{:else if cardType === 'soulstone'}
							<img class={styles.img} src={soulstoneIcon} alt="icooon" />
						{/if}
					</div>
					<div class={styles.textContainer}>
						<span>{getIdleKingdomNumberFormat(value)}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
