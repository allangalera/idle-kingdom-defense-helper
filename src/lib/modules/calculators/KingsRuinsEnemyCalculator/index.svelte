<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import Toggle from '$lib/components/Toggle/index.svelte';
	import { MAX_STAGE_LEVEL } from '$lib/constants';
	import { ruinConst } from '$lib/db/ruins';
	import {
		calculatorsInformationStore,
		updateCalculatorInformation
	} from '$lib/shared/stores/user/calculatorsInformation';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import { theme } from '$lib/styles/themes/index.css';
	import { getEnemyPattern } from '$lib/utils/ruins';
	import * as styles from './index.css';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiSystemArrowLeftSLine from 'svelte-icons-pack/ri/RiSystemArrowLeftSLine';
	import RiSystemArrowRightSLine from 'svelte-icons-pack/ri/RiSystemArrowRightSLine';

	const CALCULATOR_STORE_KEY = 'KINGS_RUIN_ENEMY_CALCULATOR';

	let stageLevel = $calculatorsInformationStore?.[CALCULATOR_STORE_KEY]?.stageLevel ?? '1';
	let enemyPattern: ReturnType<typeof getEnemyPattern> = [];
	let showOnlyWithCashReward: boolean = false;

	const updateEnemyPattern = () => {
		let stageLevelAsNumber = +stageLevel;
		if (stageLevelAsNumber) enemyPattern = getEnemyPattern(stageLevelAsNumber);
	};

	const onAddStageLevel = () => {
		stageLevel = Math.min(+stageLevel + 1, MAX_STAGE_LEVEL).toString();
	};

	const onRemoveStageLevel = () => {
		stageLevel = Math.max(1, +stageLevel - 1).toString();
	};

	const updateStore = () => {
		updateCalculatorInformation(CALCULATOR_STORE_KEY, {
			stageLevel
		});
	};

	const filterEnemyPatters = () => {
		if (showOnlyWithCashReward) {
			enemyPattern = enemyPattern.filter((pattern) => !!ruinConst.REWARD.CASH[pattern.id - 1]);
		}
	};

	const update = () => {
		updateEnemyPattern();
		updateStore();
		filterEnemyPatters();
	};

	$: (stageLevel || showOnlyWithCashReward) && update();
</script>

<div class={styles.container}>
	<div class={styles.inputContainer}>
		<Button variant="primary" on:click={onRemoveStageLevel} disabled={+stageLevel === 1}>
			<Icon className={styles.menuIcon} src={RiSystemArrowLeftSLine} color={theme.colors.white} />
		</Button>
		<Input
			label="Stage when the game daily reset"
			textAlign="center"
			bind:value={stageLevel}
			maskOptions={{
				mask: Number,
				min: 0,
				max: MAX_STAGE_LEVEL
			}}
		/>
		<Button on:click={onAddStageLevel} disabled={+stageLevel === MAX_STAGE_LEVEL}>
			<Icon className={styles.menuIcon} src={RiSystemArrowRightSLine} color={theme.colors.white} />
		</Button>
		<div
			class={sprinkles({
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			})}
		>
			<Text>Hide sweepable</Text>
			<Toggle bind:checked={showOnlyWithCashReward} />
		</div>
	</div>
	<Text>Enemies:</Text>
	<div class={styles.resultsContainer}>
		{#each enemyPattern as pattern, idx}
			<div class={styles.flex}>
				<div>
					<Text fontSize="lg" textAlign="center">{pattern.id}</Text>
					{#if ruinConst.REWARD.CASH[pattern.id - 1]}
						<Text
							>{ruinConst.REWARD.CASH[pattern.id - 1]}<img
								class={styles.icon}
								loading="lazy"
								src={`images/icons/iconRuby.png`}
								alt="enemy"
							/></Text
						>
					{/if}
				</div>
				{#each pattern.enemies as enemy}
					{#if enemy.unitType === 5}
						<img loading="lazy" src={`images/enemies/enemy${enemy.unitId}.png`} alt="enemy" />
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>
