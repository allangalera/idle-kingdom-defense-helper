<script lang="ts">
	import * as styles from './index.css';
	import { user } from '$lib/shared/stores/user';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiSystemMenu3Line from 'svelte-icons-pack/ri/RiSystemMenu3Line';
	import RiDocumentFileCopyLine from 'svelte-icons-pack/ri/RiDocumentFileCopyLine';
	import Text from '$lib/components/Text/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';
	import ModalLoadFromBase64Token from '$lib/components/ModalLoadFromBase64Token/index.svelte';
	import ModalLoadFromToken from '$lib/components/ModalLoadFromToken/index.svelte';
	import Tooltip from '$lib/components/Tooltip/index.svelte';
	import Link from '$lib/components/Link/index.svelte';
	import Button from '$lib/components/Button/index.svelte';
	import Drawer from '$lib/components/Drawer/index.svelte';
	import Portal from '$lib/components/Portal/index.svelte';
	import { theme } from '$lib/styles/themes/index.css';

	let menuOpen = false;
	let isModalLoadFromBase64Token = false;
	let isModalLoadFromToken = false;

	let tooltipText = 'Copy';

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	const onMenuClose = () => {
		menuOpen = false;
	};

	const onOpenModalLoadFromBase64Token = () => {
		menuOpen = false;
		isModalLoadFromBase64Token = true;
	};

	const onOpenModalLoadFromToken = () => {
		menuOpen = false;
		isModalLoadFromToken = true;
	};

	const onClickCopyToClipboard = () => {
		copyToClipboard($user);
		tooltipText = 'Copied!';
		setTimeout(() => (tooltipText = 'Copy'), 2000);
	};

	const copyToClipboard = (str) => {
		if (navigator && navigator.clipboard && navigator.clipboard.writeText)
			return navigator.clipboard.writeText(str);
		return Promise.reject('The Clipboard API is not available.');
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
				<nav class={styles.menu}>
					<Link href="/" fontSize="2xl" on:click={toggleMenu}>Home</Link>
					<Link href="/heroes" fontSize="2xl" on:click={toggleMenu}>Heroes</Link>
					<Link href="/heroes/tier-list" fontSize="2xl" on:click={toggleMenu}>Heroes Tier List</Link
					>
					<Link href="/conquest-rewards" fontSize="2xl" on:click={toggleMenu}>Conquest rewards</Link
					>
				</nav>
			</slot>
			<slot slot="footer">
				<div class={styles.menuFooter}>
					<div class={styles.tokenInputContainer}>
						<Input label="Token" readonly value={$user} />
						<Tooltip text={tooltipText}>
							<Button on:click={onClickCopyToClipboard}>
								<Icon
									className={styles.tokenCopyIcon}
									src={RiDocumentFileCopyLine}
									color={theme.colors.white}
								/></Button
							>
						</Tooltip>
					</div>
					<Button on:click={onOpenModalLoadFromBase64Token}
						><Text color="white" textAlign="center">Load from old token</Text></Button
					>
					<Button on:click={onOpenModalLoadFromToken}
						><Text color="white" textAlign="center">Load from token</Text></Button
					>
				</div>
			</slot>
		</Drawer>
	</Portal>
{/if}

<ModalLoadFromBase64Token
	open={isModalLoadFromBase64Token}
	onClose={() => {
		isModalLoadFromBase64Token = false;
	}}
/>
<ModalLoadFromToken
	open={isModalLoadFromToken}
	onClose={() => {
		isModalLoadFromToken = false;
	}}
/>
