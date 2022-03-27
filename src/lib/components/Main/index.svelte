<script>
	import * as styles from './index.css';
	import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<main
	class={[
		styles.container,
		sprinkles({
			background: 'slate1',
			padding: {
				mobile: 2,
				tablet: 4,
			},
		}),
	].join(' ')}
>
	<slot />
</main>
