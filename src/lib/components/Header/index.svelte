<script>
	import * as styles from './index.css';
	import { theme as themeStore } from '$lib/shared/stores/theme';
	import Heading from '$lib/components/Heading/index.svelte';
	import Toggle from '$lib/components/Toggle/index.svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiMoon from 'svelte-icons-pack/fi/FiMoon';
	import FiSun from 'svelte-icons-pack/fi/FiSun';

	import { theme } from '$lib/styles/themes/index.css';
	let checked = $themeStore === 'light' ? false : true;
	function switchTheme(checked) {
		themeStore.set(checked ? 'dark' : 'light');
	}

	$: switchTheme(checked);
</script>

<header class={styles.header}>
	<div class={styles.container}>
		<div class={styles.middle}>
			<Heading fontSize="2xl">IKD Helper</Heading>
		</div>
		<div class={styles.right}>
			<Icon src={FiSun} color={theme.colors.text.default} />
			<Toggle bind:checked />
			<Icon src={FiMoon} color={theme.colors.text.default} />
		</div>
	</div>
</header>
