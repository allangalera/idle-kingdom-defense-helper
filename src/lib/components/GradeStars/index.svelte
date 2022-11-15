<script lang="ts">
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import type { Sprinkles } from '$lib/styles/sprinkles.css';
	import { convertGradeToStarLevel } from '$lib/utils';

	export let grade: number;
	export let size: Sprinkles['width'] = 8;

	const data = convertGradeToStarLevel(grade);
	console.log(data);
</script>

{#each { length: data.level } as level}
	<img
		class={sprinkles({
			width: size,
			height: size
		})}
		loading="lazy"
		src={`/images/icons/iconStarBig${Math.ceil(grade / 5)}.png`}
		alt="icon"
	/>
{/each}
