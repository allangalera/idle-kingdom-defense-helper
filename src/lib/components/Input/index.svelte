<script>
	import * as styles from './index.css';
	import Text from '$lib/components/Text/index.svelte';
	import IMask from 'imask';
	export let label;
	export let value = '';
	export let maskOptions = undefined;

	function validate() {
		if (maskOptions) {
			const mask = IMask.createMask(maskOptions);
			value = mask.resolve(value);
		}
	}

	$: value && validate();
</script>

<label class={styles.container}>
	<Text>{label}</Text>
	<input
		class={styles.input}
		type="text"
		{value}
		on:input={(e) => (value = e.currentTarget.value)}
	/>
</label>
