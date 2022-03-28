<script lang="ts">
	import * as styles from './index.css';
	import { sprinkles, type Sprinkles } from '$lib/styles/sprinkles.css';
	export let fontSize: Sprinkles['fontSize'] = 'base';
	export let href;
	export let target = null;
	export let rel = null;

	let className = [
		styles.anchor,
		sprinkles({
			fontSize: fontSize,
			color: {
				lightMode: 'green10',
				darkMode: 'green11',
			},
		}),
	].join(' ');
</script>

<a class={className} on:click {href} {target} {rel}><slot /></a>
