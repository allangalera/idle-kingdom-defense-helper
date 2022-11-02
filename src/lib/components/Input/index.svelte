<script lang="ts">
	import Text from '$lib/components/Text/index.svelte';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import * as styles from './index.css';
	import IMask from 'imask';

	export let label: string | undefined = undefined;
	export let value: string = '';
	export let maskOptions: any = undefined;
	export let pipeOptions: any = undefined;
	export let textAlign: Sprinkles['textAlign'] = 'left';
	export let id: string | undefined = undefined;
	export let disabled = false;
	export let readonly = false;
	export let required = false;
	export let type = 'text';
	export let name: string | undefined = undefined;

	let mask: any;
	let pipe: any;

	function validate() {
		if (type !== 'text') return;
		if (mask) {
			value = mask.resolve(value);
		}
		if (pipe) {
			value = pipe(value);
		}
	}

	const generatePipe = () => {
		pipe = IMask.createPipe(pipeOptions);
	};

	const generateMask = () => {
		mask = IMask.createMask(maskOptions);
	};

	$: pipeOptions && generatePipe();
	$: maskOptions && generateMask();
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
				textAlign
			})
		].join(' ')}
		{id}
		{name}
		{value}
		{disabled}
		{readonly}
		{type}
		{required}
		on:input={(e) => (value = e.currentTarget.value)}
	/>
</label>
