<script lang="ts">
	import * as styles from './index.css';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiSystemMenu3Line from 'svelte-icons-pack/ri/RiSystemMenu3Line';
	import RiSystemCloseFill from 'svelte-icons-pack/ri/RiSystemCloseFill';
	import Heading from '$lib/components/Heading/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import { theme } from '$lib/styles/themes/index.css';
	let menuOpen = false;
	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<div class={styles.buttoContainer}>
	<div on:click={toggleMenu}>
		<Icon
			className={styles.menuIcon}
			src={RiSystemMenu3Line}
			size={theme.sizes[8]}
			color={theme.themeColors.baseColors.slate12}
		/>
	</div>
</div>
{#if menuOpen}
	<div class={styles.menuContainer}>
		<div class={styles.menuHeader}>
			<Heading fontSize="3xl">Menu</Heading>
			<div class={styles.iconContainer} on:click={toggleMenu}>
				<Icon
					className={styles.menuIcon}
					src={RiSystemCloseFill}
					size={theme.sizes[8]}
					color={theme.themeColors.baseColors.slate12}
				/>
			</div>
		</div>
		<div class={styles.menu}>
			<Link href="/" fontSize="2xl">Home</Link>
			<Link href="/heroes" fontSize="2xl">Heroes</Link>
		</div>
	</div>
{/if}
