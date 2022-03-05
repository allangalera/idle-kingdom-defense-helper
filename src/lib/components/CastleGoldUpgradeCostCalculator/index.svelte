<script>
	import * as styles from './index.css';
	import Input from '$lib/components/Input/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import goldIcon from '$lib/assets/gold_icon.png';
	let currentLevel = '1';
	let targetLevel = '2';
	let goldNeeded = '0';
	import { getIdleKingdomNumberFormat } from '$lib/utils';
	import { calculateCastleUpgradeCostWithMap } from '$lib/utils/castle-gold';
	import { CASTLE_MAX_LEVEL } from '$lib/constants';
	$: goldNeeded = getIdleKingdomNumberFormat(
		calculateCastleUpgradeCostWithMap({
			currentLevel: +currentLevel,
			targetLevel: +targetLevel,
		})
	);
</script>

<div class={styles.container}>
	<Input
		label="Current Level"
		bind:value={currentLevel}
		maskOptions={{
			mask: Number,
			min: 0,
			max: CASTLE_MAX_LEVEL - 1,
		}}
	/>
	<Input
		label="Target Level"
		bind:value={targetLevel}
		maskOptions={{
			mask: Number,
			min: 0,
			max: CASTLE_MAX_LEVEL,
		}}
	/>
	<div class={styles.result}>
		<Text>{goldNeeded}</Text>
		<img class={`lazy ${styles.icon}`} src={goldIcon} alt="gold coin" title="Gold coin" />
	</div>
</div>
