<script>
	import * as styles from './index.css';
	import { theme as themeStore, ThemeOptions } from '$lib/shared/stores/theme';
	import Heading from '$lib/components/Heading/index.svelte';
	import Toggle from '$lib/components/Toggle/index.svelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiMoon from 'svelte-icons-pack/fi/FiMoon';
	import FiSun from 'svelte-icons-pack/fi/FiSun';

	import { theme } from '$lib/styles/themes/index.css';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import { onMount } from 'svelte';

	let checked = false;

	function onChange(e) {
		// checked = e.target.checked;
		themeStore.set(
			e.target.checked
				? {
						theme: ThemeOptions.dark,
						isForced: true,
				  }
				: {
						theme: ThemeOptions.light,
						isForced: true,
				  }
		);
	}

	onMount(() => {
		checked = $themeStore.theme === ThemeOptions.dark;
	});

	$: checked = $themeStore.theme === ThemeOptions.dark;
</script>

<header
	class={[
		styles.header,
		sprinkles({
			background: 'slate1',
		}),
	].join(' ')}
>
	<div class={styles.container}>
		<div class={styles.middle}>
			<Heading fontSize={{ mobile: '2xl', tablet: '4xl' }}>IKD Helper</Heading>
		</div>
		<div class={styles.right}>
			<Icon src={FiSun} color={theme.themeColors.text.default} />
			<Toggle bind:checked on:change={onChange} />
			<Icon src={FiMoon} color={theme.themeColors.text.default} />
		</div>
	</div>
</header>
