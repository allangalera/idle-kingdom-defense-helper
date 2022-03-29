<script lang="ts">
	import * as styles from './index.css';
	import { user } from '$lib/shared/stores/user';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiSystemMenu3Line from 'svelte-icons-pack/ri/RiSystemMenu3Line';
	import RiSystemCloseFill from 'svelte-icons-pack/ri/RiSystemCloseFill';
	import Text from '$lib/components/Text/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';
	import ModalLoadFromToken from '$lib/components/ModalLoadFromToken/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import Button from '$lib/components/Button/index.svelte';
	import Drawer from '$lib/components/Drawer/index.svelte';
	import Portal from '$lib/components/Portal/index.svelte';
	import { theme } from '$lib/styles/themes/index.css';

	let menuOpen = false;
	let isModalLoadFromToken = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	const onMenuClose = () => {
		menuOpen = false;
	};

	const onOpenModalLoadFromToken = () => {
		menuOpen = false;
		isModalLoadFromToken = true;
	};
</script>

<div class={styles.buttoContainer} on:click={toggleMenu}>
	<Button>
		<Icon className={styles.menuIcon} src={RiSystemMenu3Line} color={theme.colors.white} />
	</Button>
</div>
{#if menuOpen}
	<Portal>
		<Drawer onClose={onMenuClose}>
			<slot slot="header">
				<Heading textAlign="center" fontSize="2xl">Menu</Heading>
			</slot>
			<slot slot="content">
				<div class={styles.menu}>
					<Link href="/" fontSize="2xl" on:click={toggleMenu}>Home</Link>
					<Link href="/heroes" fontSize="2xl" on:click={toggleMenu}>Heroes</Link>
					<Link href="/conquest-rewards" fontSize="2xl" on:click={toggleMenu}>Conquest rewards</Link
					>
				</div>
			</slot>
			<slot slot="footer">
				<div class={styles.menuFooter}>
					<Input label="Token" readonly value={$user} />
					<Button on:click={onOpenModalLoadFromToken}
						><Text color="white" textAlign="center">Load from token</Text></Button
					>
				</div>
			</slot>
		</Drawer>
	</Portal>
	<!-- <div class={styles.menuContainer}>
		<div class={styles.menuHeader}>
			<Heading fontSize="3xl">Menu</Heading>
			<div class={styles.iconContainer} on:click={toggleMenu}>
				<Icon
					className={styles.menuIcon}
					src={RiSystemCloseFill}
					color={theme.themeColors.baseColors.gray12}
				/>
			</div>
		</div>
		<div class={styles.menu}>
			<Link href="/" fontSize="2xl" on:click={toggleMenu}>Home</Link>
			<Link href="/heroes" fontSize="2xl" on:click={toggleMenu}>Heroes</Link>
			<Link href="/conquest-rewards" fontSize="2xl" on:click={toggleMenu}>Conquest rewards</Link>
		</div>
		<div class={styles.menuFooter}>
			<Input label="Token" readonly value={$user} />
			<Button on:click={onOpenModalLoadFromToken}
				><Text color="white" textAlign="center">Load from token</Text></Button
			>
		</div>
	</div> -->
{/if}

<ModalLoadFromToken
	open={isModalLoadFromToken}
	onClose={() => {
		isModalLoadFromToken = false;
	}}
/>
