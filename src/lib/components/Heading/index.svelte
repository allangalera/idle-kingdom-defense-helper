<script lang="ts">
	import type { FontSizes } from '$lib/styles/themes/index.css';

	import * as styles from './index.css';
	export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let fontSize: FontSizes = 'lg';
</script>

{#if as == 'h1'}
	<h1
		class={styles.headingRecipe({
			fontSize,
		})}
	>
		<slot />
	</h1>
{:else if as == 'h2'}
	<h2
		class={styles.headingRecipe({
			fontSize,
		})}
	>
		<slot />
	</h2>
{:else if as == 'h3'}
	<h3
		class={styles.headingRecipe({
			fontSize,
		})}
	>
		<slot />
	</h3>
{:else if as == 'h4'}
	<h4
		class={styles.headingRecipe({
			fontSize,
		})}
	>
		<slot />
	</h4>
{:else if as == 'h5'}
	<h5
		class={styles.headingRecipe({
			fontSize,
		})}
	>
		<slot />
	</h5>
{:else}
	<h6
		class={styles.headingRecipe({
			fontSize,
		})}
	>
		<slot />
	</h6>
{/if}
