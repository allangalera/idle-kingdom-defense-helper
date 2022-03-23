<script lang="ts">
	import * as styles from './index.css';
	import Input from '$lib/components/Input/index.svelte';
	import Card from '$lib/components/Card/index.svelte';
	let currentLevel = '1';
	let targetLevel = '2';
	let result = {
		coins: 0,
		souls: 0,
	};
	let dataCoins = [];
	let dataSoulStones = [];
	let dataCoinsTotal = [];
	let dataSoulStonesTotal = [];
	const incCoins = [
		3, 4, 3, 4, 4, 3, 4, 3, 4, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 4, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3,
		4, 3, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
	];
	const incSoulstones = [2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
	import { heroUpgradeCostCalculatorParameterSchema } from '$lib/utils';
	import { onMount } from 'svelte';
	import { MAX_HERO_LEVEL } from '$lib/constants';

	onMount(() => {
		dataSoulStones = [];
		dataSoulStonesTotal = [];
		let soulstoneDelta = 10;
		let soulstoneCost = 200;
		for (let i = 0; i < 10; i++) {
			dataSoulStones.push(soulstoneCost);
			if (dataSoulStonesTotal.length != 0)
				dataSoulStonesTotal.push(
					dataSoulStonesTotal[dataSoulStonesTotal.length - 1] + soulstoneCost
				);
			else dataSoulStonesTotal.push(soulstoneCost);
			soulstoneCost += soulstoneDelta;
		}
		dataSoulStones.push(soulstoneCost);
		dataSoulStonesTotal.push(dataSoulStonesTotal[dataSoulStonesTotal.length - 1] + soulstoneCost);
		for (let i = 0; i < 11989; i++) {
			if (i != 0 && i % 10 == 0) {
				soulstoneDelta += i % 20 == 0 ? 2 : 3;
			}
			soulstoneCost += soulstoneDelta + incSoulstones[i % incSoulstones.length];
			dataSoulStones.push(soulstoneCost);
			dataSoulStonesTotal.push(dataSoulStonesTotal[dataSoulStonesTotal.length - 1] + soulstoneCost);
		}
		dataCoins = [];
		dataCoinsTotal = [];
		let coinsDelta = 5;
		let lastCoinsDelta = 5;
		let coinsCost = 100;
		for (let i = 0; i < 10; i++) {
			dataCoins.push(coinsCost);
			if (dataCoinsTotal.length != 0)
				dataCoinsTotal.push(dataCoinsTotal[dataCoinsTotal.length - 1] + coinsCost);
			else dataCoinsTotal.push(coinsCost);
			coinsCost += coinsDelta;
		}
		dataCoins.push(coinsCost);
		dataCoinsTotal.push(dataCoinsTotal[dataCoinsTotal.length - 1] + coinsCost);
		for (let i = 0; i < 11989; i++) {
			if (i % 10 === 0) {
				if (i > 0) {
					coinsDelta = lastCoinsDelta;
				}
			}
			coinsCost += coinsDelta + incCoins[i % incCoins.length];
			lastCoinsDelta = coinsDelta + incCoins[i % incCoins.length];
			dataCoins.push(coinsCost);
			dataCoinsTotal.push(dataCoinsTotal[dataCoinsTotal.length - 1] + coinsCost);
		}
		result = calculate(+currentLevel, +targetLevel);
	});
	function calculate(currLevel, tarLevel) {
		const validation = heroUpgradeCostCalculatorParameterSchema.safeParse({
			currentLevel: currLevel,
			targetLevel: tarLevel,
		});
		if (!validation.success) return { coins: 0, souls: 0 };
		const { currentLevel: level, targetLevel: target } = validation.data;
		let cs = 0;
		let sss = 0;
		if (level > 1) {
			cs = dataCoinsTotal[target - 2] - dataCoinsTotal[level - 2];
			sss = dataSoulStonesTotal[target - 2] - dataSoulStonesTotal[level - 2];
		} else if (level === 1) {
			cs = dataCoinsTotal[target - 2] || 0;
			sss = dataSoulStonesTotal[target - 2] || 0;
		} else {
			cs = 0;
			sss = 0;
		}
		return {
			coins: cs,
			souls: sss,
		};
	}
	$: result = calculate(+currentLevel, +targetLevel);
</script>

<div class={styles.container}>
	<Input
		textAlign="center"
		label="Current Level"
		bind:value={currentLevel}
		maskOptions={{
			mask: Number,
			min: 0,
			max: MAX_HERO_LEVEL - 1,
		}}
	/>
	<Input
		textAlign="center"
		label="Target Level"
		bind:value={targetLevel}
		maskOptions={{
			mask: Number,
			min: 0,
			max: MAX_HERO_LEVEL,
		}}
	/>
	<div class={styles.result}>
		<div class={styles.goldResult}>
			<Card cardType="coin" value={result.coins} />
		</div>
		<div class={styles.soulResult}>
			<Card cardType="soulstone" value={result.souls} />
		</div>
	</div>
</div>
