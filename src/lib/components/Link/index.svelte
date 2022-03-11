<script lang="ts">
	import * as styles from './index.css';
	export let href;
	export let target;
	export let rel;
</script>

<a class={styles.anchor} {href} {target} {rel}><slot /></a>
