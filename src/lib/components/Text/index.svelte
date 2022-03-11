<script lang="ts">
	import * as styles from './index.css';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	export let as: 'p' | 'span' = 'p';
	export let fontSize = 'base';
	export let color = 'slate12';

	let className = [
		styles.paragraph,
		sprinkles({
			color: color,
			fontSize: fontSize,
		}),
	].join(' ');
</script>

{#if as === 'p'}
	<p class={className}>
		<slot />
	</p>
{:else if as === 'span'}
	<span class={className}>
		<slot />
	</span>
{/if}
