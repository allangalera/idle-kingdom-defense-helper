<script lang="ts">
	import * as styles from './index.css';
	import { sprinkles, type Sprinkles } from '$lib/styles/sprinkles.css';
	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let fontSize: Sprinkles['fontSize'] = 'lg';
	export let fontWeight: Sprinkles['fontWeight'] = 'normal';
	export let textAlign: Sprinkles['textAlign'] = 'left';

	let className = [
		styles.heading,
		sprinkles({
			fontSize: fontSize,
			fontWeight: fontWeight,
			textAlign: textAlign,
			color: 'slate12',
		}),
	].join(' ');
</script>

{#if as == 'h1'}
	<h1 class={className}>
		<slot />
	</h1>
{:else if as == 'h2'}
	<h2 class={className}>
		<slot />
	</h2>
{:else if as == 'h3'}
	<h3 class={className}>
		<slot />
	</h3>
{:else if as == 'h4'}
	<h4 class={className}>
		<slot />
	</h4>
{:else if as == 'h5'}
	<h5 class={className}>
		<slot />
	</h5>
{:else}
	<h6 class={className}>
		<slot />
	</h6>
{/if}
