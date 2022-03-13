<script lang="ts">
	import * as styles from './index.css';
	import Text from '$lib/components/Text/index.svelte';
	import IMask from 'imask';
	import { sprinkles, type Sprinkles } from '$lib/styles/sprinkles.css';
	export let label;
	export let value = '';
	export let maskOptions = undefined;
	export let textAlign: Sprinkles['textAlign'] = 'left';

	function validate() {
		if (maskOptions) {
			const mask = IMask.createMask(maskOptions);
			value = mask.resolve(value);
		}
	}

	$: value && validate();
</script>

<label class={styles.container}>
	<Text {textAlign}>{label}</Text>
	<input
		class={[
			styles.input,
			sprinkles({
				textAlign,
			}),
		].join(' ')}
		type="text"
		{value}
		on:input={(e) => (value = e.currentTarget.value)}
	/>
</label>
