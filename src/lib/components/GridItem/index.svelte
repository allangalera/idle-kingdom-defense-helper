<script lang="ts">
	import Heading from '$lib/components/Heading/index.svelte';
	import * as styles from './index.css';

	export let title: string | null = null;
	export let full = false;
</script>

<div class={styles.containerVariant[full ? 'full' : 'default']}>
	{#if title}
		<div class={styles.title}>
			<Heading as="h2" fontSize="xl" fontWeight="semibold" textAlign="center">{title}</Heading>
		</div>
	{/if}
	<div class={styles.content}>
		<slot />
	</div>
</div>
