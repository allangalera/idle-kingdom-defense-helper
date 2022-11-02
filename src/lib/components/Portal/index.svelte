<script lang="ts">
	import * as styles from './index.css';
	import { onDestroy, onMount } from 'svelte';

	let ref: any;
	let portal: any;
	const mainDiv = document.querySelector('body > div');

	onMount(() => {
		portal = document.createElement('div');
		mainDiv?.appendChild(portal);
		portal.appendChild(ref);
	});

	onDestroy(() => {
		mainDiv?.removeChild(portal);
	});
</script>

<div class={styles.container}>
	<div bind:this={ref}>
		<slot />
	</div>
</div>
