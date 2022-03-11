<script lang="ts">
	import * as styles from './index.css';
	import Text from '$lib/components/Text/index.svelte';
	export let stageData: {
		stage: number;
		enemy: {
			color: string;
			type: number;
		};
	};
</script>

<div class={styles.flex}>
	<Text fontSize="lg"
		>{stageData.stage} (<Text as="span" color={stageData.enemy.color}>{stageData.enemy.type}</Text
		>)</Text
	>
</div>
