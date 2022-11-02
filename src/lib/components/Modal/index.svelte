<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import { theme } from '$lib/styles/themes/index.css';
	import * as styles from './index.css';
	import { onMount } from 'svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiSystemCloseFill from 'svelte-icons-pack/ri/RiSystemCloseFill';
	import { fade } from 'svelte/transition';

	export let footerJustifyContent: Sprinkles['justifyContent'] = 'flex-start';
	export let onClose: () => void = () => void 0;
	export let shouldCloseOnOverlay = true;
	export let elementToFocusOnClose = null;
	export let isOpen = false;

	let closeButtonRef;

	onMount(() => {
		setTimeout(() => {
			closeButtonRef.focus();
		}, 100);
	});

	const handleOnClose = () => {
		if (elementToFocusOnClose) {
			elementToFocusOnClose.focus();
		}
		onClose?.();
	};
</script>

<div class={styles.wrapper} transition:fade={{ duration: 120 }}>
	<div class={styles.container}>
		<div class={styles.header}>
			<div class={styles.headerContainer}>
				<slot name="header" />
			</div>
			<div class={styles.headerCloseIconContainer}>
				<Button bind:ref={closeButtonRef} variant="logic" on:click={handleOnClose}>
					<Icon
						className={styles.headerCloseIcon}
						src={RiSystemCloseFill}
						color={theme.themeColors.baseColors.gray12}
					/>
				</Button>
			</div>
		</div>
		<div class={styles.content}>
			<slot name="content" />
		</div>
		{#if $$slots.footer}
			<div
				class={[
					styles.footer,
					sprinkles({
						justifyContent: footerJustifyContent
					})
				].join(' ')}
			>
				<slot name="footer" />
			</div>
		{/if}
	</div>
</div>
