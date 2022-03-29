<script>
	import * as styles from './index.css';
	import { sprinkles } from '$lib/styles/sprinkles.css';
</script>

<main
	class={[
		styles.container,
		sprinkles({
			background: 'gray1',
			padding: {
				mobile: 4,
				tablet: 6,
			},
		}),
	].join(' ')}
>
	<slot />
</main>
