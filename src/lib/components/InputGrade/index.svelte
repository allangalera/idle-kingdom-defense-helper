<script lang="ts">
	import * as styles from './index.css';

	import type { Grades } from '$lib/types';
	import { convertGradeToStarLevel } from '$lib/utils';
	import { RarityEnum } from '$lib/enums';

	export let grade: Grades = 1;

	let convertedGrade;

	const imagesByGrade = {
		[RarityEnum.common]: 'images/ranking/iconStarBig1.png',
		[RarityEnum.uncommon]: 'images/ranking/iconStarBig2.png',
		[RarityEnum.rare]: 'images/ranking/iconStarBig3.png',
		[RarityEnum.epic]: 'images/ranking/iconStarBig4.png',
		[RarityEnum.legendary]: 'images/ranking/iconStarBig5.png',
	};

	$: convertedGrade = convertGradeToStarLevel(grade);
</script>

<div>
	{#each { length: 5 } as _, i}
		<img loading="lazy"
			class={styles.imageVariant[convertedGrade.level > i ? 'default' : 'disabled']}
			src={imagesByGrade[convertedGrade.rarity]}
			alt="Grade star icon"
		/>
	{/each}
</div>
