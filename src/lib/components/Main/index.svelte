<script>
	import * as styles from './index.css';
	import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<main
	class={[
		styles.container,
		sprinkles({
			background: 'slate1',
		}),
	].join(' ')}
>
	<slot />
</main>
