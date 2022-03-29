<script lang="ts">
	import * as styles from './index.css';
	import { createEventDispatcher } from 'svelte';

	export let selected;
	export let ascensionLevel = 0;

	const startLevels = [
		'images/ranking/iconStarBig1.png',
		'images/ranking/iconStarBig2.png',
		'images/ranking/iconStarBig3.png',
		'images/ranking/iconStarBig4.png',
		'images/ranking/iconStarBig5.png',
	];

	const dispatch = createEventDispatcher();

	$: dispatch('selected', { selected });

	function onChange() {
		selected = !selected;
	}
</script>

<div class={styles.button} role="button" on:click on:click={onChange}>
	{#if selected}
		<img loading="lazy" src={startLevels[ascensionLevel]} alt="start level" />
	{:else}
		<img loading="lazy" class={styles.fade} src={startLevels[ascensionLevel]} alt="start level" />
	{/if}
</div>
