<script lang="ts">
	import GridItem from '$lib/components/GridItem/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import Tooltip from '$lib/components/Tooltip/index.svelte';
	import { Attributes } from '$lib/types/enums';
	import { returnAttributeName } from '$lib/utils/hero';
	import type { HeroStats } from '$lib/utils/hero';
	import * as styles from './index.css';

	export let heroStats: HeroStats;

	const attributesOrder = [
		Attributes.hp,
		Attributes.atk,
		Attributes.def,
		Attributes.cri,
		Attributes.criDamage,
		Attributes.criResist,
		Attributes.criDamageResist,
		Attributes.dodge,
		Attributes.hit,
		Attributes.defPierce,
		Attributes.defPierceResist,
		Attributes.atkSpeed,
		Attributes.moveSpeed,
	];
</script>

<GridItem title="Stats">
	{#each attributesOrder as attr}
		<div class={styles.heroStat}>
			<Text>{returnAttributeName(attr)}:</Text>
			<Tooltip>
				<svelte:fragment slot="tooltip-content">
					<table>
						<tr>
							<td><Text textAlign="center">base</Text></td>
							<td />
							<td><Text textAlign="center">equip</Text></td>
							<td />
							<td><Text textAlign="center">skill</Text></td>
							<td />
							<td><Text textAlign="center">runes</Text></td>
							<td />
							<td><Text textAlign="center">artifacts</Text></td>
							<td />
							<td><Text textAlign="center">set bonus</Text></td>
						</tr>
						<tr>
							<td>
								<Text textAlign="center">
									{heroStats.composedStats.base[attr].toLocaleString()}
								</Text>
							</td>
							<td><Text textAlign="center">+</Text></td>
							<td>
								<Text textAlign="center">
									{heroStats.composedStats.equip[attr]?.toLocaleString() ?? 0}
								</Text>
							</td>
							<td><Text textAlign="center">+</Text></td>
							<td>
								<Text textAlign="center">
									{heroStats.composedStats.skill[attr]?.toLocaleString() ?? 0}
								</Text>
							</td>
							<td><Text textAlign="center">+</Text></td>
							<td>
								<Text textAlign="center">
									{heroStats.composedStats.runes[attr]?.toLocaleString() ?? 0}
								</Text>
							</td>
							<td><Text textAlign="center">+</Text></td>
							<td>
								<Text textAlign="center">
									{heroStats.composedStats.artifacts[attr]?.toLocaleString() ?? 0}
								</Text>
							</td>
							<td><Text textAlign="center">+</Text></td>
							<td>
								<Text textAlign="center">
									{heroStats.composedStats.equipSet[attr]?.toLocaleString() ?? 0}
								</Text>
							</td>
						</tr>
					</table>
				</svelte:fragment>
				<Text>{heroStats[attr].toLocaleString()}</Text>
			</Tooltip>
		</div>
	{/each}
</GridItem>
