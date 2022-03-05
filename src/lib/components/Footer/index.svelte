<script>
	import * as styles from './index.css';
	import Text from '$lib/components/Text/index.svelte';
	import SiSvelte from 'svelte-icons-pack/si/SiSvelte';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import SiDiscord from 'svelte-icons-pack/si/SiDiscord';
	import SiReddit from 'svelte-icons-pack/si/SiReddit';
	import { theme } from '$lib/styles/themes/index.css';
</script>

<footer class={styles.container}>
	<div>
		<Text
			>Made with ❤️ and <Icon src={SiSvelte} color="#FF3E00" className={styles.svelteIcon} /></Text
		>
	</div>
	<div class={styles.socialIconsContainer}>
		<a class={styles.anchor} href="https://discord.gg/KMbhHrZrHF" target="_blank" rel="noreferrer"
			><Icon
				className={styles.discordIcon}
				src={SiDiscord}
				size={theme.sizes[8]}
				color="#5865F2"
			/></a
		>
		<a
			class={styles.anchor}
			href="https://www.reddit.com/r/Idle_Kingdom_Defense/"
			target="_blank"
			rel="noreferrer"
			><Icon
				className={styles.redditIcon}
				src={SiReddit}
				size={theme.sizes[8]}
				color="#FF4500"
			/></a
		>
	</div>
	<div>
		<Text
			>All rights belongs to <a
				class={styles.anchor}
				href="https://play.google.com/store/apps/dev?id=4782903676457533844"
				target="_blank"
				rel="noreferrer">StormX</a
			></Text
		>
	</div>
</footer>
