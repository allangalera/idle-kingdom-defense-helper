<script>
	import * as styles from './index.css';
	import Text from '$lib/components/Text/index.svelte';
</script>

<button class={styles.button} on:click>
	<slot />
</button>
