<script>
	import * as styles from './index.css';
	export let theme;
</script>

<div class={`${styles.container} ${theme}`}>
	<slot />
</div>
