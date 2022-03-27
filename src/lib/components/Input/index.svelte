<script lang="ts">
	import * as styles from './index.css';
	import Text from '$lib/components/Text/index.svelte';
	import IMask from 'imask';
	import { sprinkles, type Sprinkles } from '$lib/styles/sprinkles.css';
	export let label;
	export let value = '';
	export let maskOptions = undefined;
	export let textAlign: Sprinkles['textAlign'] = 'left';
	export let disabled: boolean = false;
	export let readonly: boolean = false;

	function validate() {
		if (maskOptions) {
			const mask = IMask.createMask(maskOptions);
			value = mask.resolve(value);
		}
	}

	$: value && validate();
</script>

<label class={styles.container}>
	{#if label}
		<Text {textAlign}>{label}</Text>
	{/if}
	<input
		class={[
			styles.input,
			sprinkles({
				textAlign,
			}),
		].join(' ')}
		type="text"
		{value}
		{disabled}
		{readonly}
		on:input={(e) => (value = e.currentTarget.value)}
	/>
</label>
