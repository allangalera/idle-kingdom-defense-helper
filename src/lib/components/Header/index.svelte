<script>
	import * as styles from './index.css';
	import { theme } from '$lib/shared/stores/theme';
	import Button from '$lib/components/Button/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';

	function switchTheme() {
		theme.set($theme === 'light' ? 'dark' : 'light');
	}
</script>

<header class={styles.container}>
	<div class={styles.left} />
	<div class={styles.middle}>
		<Heading fontSize="2xl">Idle Kingdom Defense Helper</Heading>
	</div>
	<div class={styles.right}>
		<Button on:click={switchTheme}>Switch theme: {$theme}</Button>
	</div>
</header>
