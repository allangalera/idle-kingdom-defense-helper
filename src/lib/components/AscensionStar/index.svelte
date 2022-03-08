<script lang="ts">
	import * as styles from './index.css';
	import { createEventDispatcher } from 'svelte';
	import start1 from '$lib/assets/iconStarBig1.png';
	import start2 from '$lib/assets/iconStarBig2.png';
	import start3 from '$lib/assets/iconStarBig3.png';
	import start4 from '$lib/assets/iconStarBig4.png';
	import start5 from '$lib/assets/iconStarBig5.png';

	export let selected;
	export let ascensionLevel = 0;

	const startLevels = [start1, start2, start3, start4, start5];

	const dispatch = createEventDispatcher();

	$: dispatch('selected', { selected });

	function onChange() {
		selected = !selected;
	}
</script>

<div role="button" on:click on:click={onChange}>
	{#if selected}
		<img src={startLevels[ascensionLevel]} alt="start level" />
	{:else}
		<img class={styles.fade} src={startLevels[ascensionLevel]} alt="start level" />
	{/if}
</div>
