<script lang="ts">
	import * as styles from './index.css';
	import { createEventDispatcher } from 'svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiFillStar from 'svelte-icons-pack/ai/AiFillStar';
	import AiOutlineStar from 'svelte-icons-pack/ai/AiOutlineStar';
	import { theme } from '$lib/styles/themes/index.css';

	export let selected;
	export let ascensionLevel = 0;

	const dispatch = createEventDispatcher();

	$: dispatch('selected', { selected });

	function onChange() {
		selected = !selected;
	}
</script>

<div role="button" on:click on:click={onChange}>
	{#if selected}
		<Icon
			src={AiFillStar}
			color={theme.baseColor.ascensionList[ascensionLevel]}
			size={theme.sizes[8]}
		/>
	{:else}
		<Icon src={AiOutlineStar} color={theme.colors.text.default} size={theme.sizes[8]} />
	{/if}
</div>
