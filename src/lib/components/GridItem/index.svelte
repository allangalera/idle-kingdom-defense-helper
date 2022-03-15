<script>
	import * as styles from './index.css';
	import Heading from '$lib/components/Heading/index.svelte';
	export let title;
	export let full = false;
</script>

<div class={styles.containerVariant[full ? 'full' : 'default']}>
	<div class={styles.title}>
		<Heading as="h2" fontSize="xl" fontWeight="semibold">{title}</Heading>
	</div>
	<div class={styles.content}>
		<slot />
	</div>
</div>
