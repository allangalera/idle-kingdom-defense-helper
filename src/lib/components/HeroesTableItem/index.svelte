<script lang="ts">
	import * as styles from './index.css';
	import CardHero from '$lib/components/CardHero/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { heroesVisualization } from '$lib/shared/stores/heroesVisualization';
	import { HeroesVisualizationModes } from '$lib/enums';
	import { heroes, removeHero } from '$lib/shared/stores/user/heroes';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import RiDesignEdit2Fill from 'svelte-icons-pack/ri/RiDesignEdit2Fill';
	import RiSystemDeleteBinFill from 'svelte-icons-pack/ri/RiSystemDeleteBinFill';
	import RiSystemAddFill from 'svelte-icons-pack/ri/RiSystemAddFill';
	import ModalAddHero from '$lib/components/ModalAddHero/index.svelte';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import * as R from 'remeda';
	import { getIdleKingdomNumberFormat } from '$lib/utils';
	import { theme } from '$lib/styles/themes/index.css';

	export let hero;
	let addModalOpen = false;
	let userHero = $heroes?.heroes?.find((item) => item.id === hero.id);
	let heroStats;

	const borderColorByGrade = {
		0: 'yellow10',
		1: 'green10',
		2: 'blue10',
		3: 'plum10',
		4: 'orange10',
	};

	const backgroundColorByGrade = {
		0: 'yellow3',
		1: 'green3',
		2: 'blue3',
		3: 'plum3',
		4: 'orange3',
	};

	function formatSkillName(name) {
		return name ? name.replace('{0}', '').trim() : name;
	}

	function formatSkillValue(progressionAttributes, skill) {
		const { value, durTime, units, time, percentage, addType, effectType } = progressionAttributes;

		if (addType === 1 && effectType === 4) return `${value}/${durTime}s`;
		if (addType === 1 && effectType === 3) return `${value}s`;
		if (addType === 2 && effectType === 99 && durTime) return `${durTime}s`;
		if (addType === 2 && effectType === 99 && value) return `${value * 100}%`;
		if (addType === 2 && effectType === 99 && percentage) return `${percentage * 100}%`;
		if (addType === 2 && effectType === 9) return `${durTime}s`;
		if (addType === 2 && effectType === 21) return `${percentage * 100}%`;
		if (addType === 2 && effectType === 22) return `${percentage * 100}%`;
		if (addType === 2 && effectType === 23) return `${percentage * 100}%`;
		if (addType === 2 && effectType === 24) return `${percentage * 100}%`;
		if (addType === 2 && effectType === 101) return `${Math.round(percentage * 100)}%`;
		if (addType === 2 && effectType === 102) return `${percentage * 100}%`;
		if (addType === 2 && effectType === 103) return `${percentage * 100}%`;
		if (addType === 3 && effectType === 1) return `${Math.round(value * 100)}%`;
		if (addType === 3 && effectType === 501) return `${Math.round(value * 100)}%`;
		if (addType === 3 && effectType === 502) return `${Math.round(value * 100)}%`;
		if (addType === 3) return value;
		if (addType === 4 && effectType === 102) return `${Math.round(percentage * 100)}%`;
		if (units && time) return `${units}/${time}s`;

		return `${Math.round(value * 100)}%`;
	}

	const openAddModal = () => {
		addModalOpen = true;
	};

	const onRemoveHero = () => {
		removeHero(hero.id);
	};

	const calculateHeroStats = (currhero, currUserHero) => {
		let heroStats = R.pick(currhero, [
			'atk',
			'atkSpeed',
			'cri',
			'criDamage',
			'criDamageResist',
			'criResist',
			'def',
			'defPierce',
			'dodge',
			'hit',
			'hp',
			'incAtk',
			'incDef',
			'incHp',
			'moveSpeed',
		]);

		const currentLevel = currUserHero?.level ?? 1;

		const currentGrade = currUserHero?.grade ?? currhero.baseGrade;

		const currentAscension = currhero.ascension.find((asc) => asc.grade === currentGrade);

		heroStats.hp = (heroStats.hp + heroStats.incHp * (currentLevel - 1)) * currentAscension.incHp;
		heroStats.def =
			(heroStats.def + heroStats.incDef * (currentLevel - 1)) * currentAscension.incDef;
		heroStats.atk =
			(heroStats.atk + heroStats.incAtk * (currentLevel - 1)) * currentAscension.incAtk + 20;

		return heroStats;
	};

	heroes.subscribe((data) => {
		userHero = data?.heroes?.find((item) => item.id === hero.id) || null;
	});

	$: heroStats = calculateHeroStats(hero, userHero);
</script>

<div class={styles.tableItem}>
	<div class={styles.tableItemLeft}>
		<div class={styles.cardInfoContainer}>
			<CardHero width={14} heroTypeBadgeWidth={4} hero={{ ...hero, ...userHero }} />
			<div class={styles.infoContainer}>
				<div class={styles.basicInfo}>
					<div class={styles.heroNameAndTier}>
						<Text fontSize="base" fontWeight="bold">{hero.name}</Text>
						<img
							class={styles.tierIcon}
							src={`images/heroTier/iconGearQuality${hero.baseGrade}.png`}
							alt={`Tier icon`}
						/>
					</div>
					<Text fontSize="xs">Lv {userHero?.level ?? 1}</Text>
				</div>
				<div class={styles.statsContainer}>
					<div class={styles.stats}>
						<img class={styles.statsIcons} src="images/icons/iconHp.png" alt="Heart icon" />
						<Text fontSize="xs">{getIdleKingdomNumberFormat(heroStats.hp)}</Text>
					</div>
					<div class={styles.stats}>
						<img class={styles.statsIcons} src="images/icons/iconPower.png" alt="Heart icon" />
						<Text fontSize="xs">{getIdleKingdomNumberFormat(heroStats.atk)}</Text>
					</div>
					<div class={styles.stats}>
						<img class={styles.statsIcons} src="images/icons/iconDef.png" alt="Heart icon" />
						<Text fontSize="xs">{getIdleKingdomNumberFormat(heroStats.def)}</Text>
					</div>
				</div>
			</div>
		</div>
		<div class={styles.actions}>
			{#if hero.level}
				<div class={styles.actionButtonVariant.primary} role="button" on:click={openAddModal}>
					<Icon className={styles.buttonIcons} src={RiDesignEdit2Fill} color={theme.colors.white} />
				</div>
				<div class={styles.actionButtonVariant.danger} role="button" on:click={onRemoveHero}>
					<Icon
						className={styles.buttonIcons}
						src={RiSystemDeleteBinFill}
						color={theme.colors.white}
					/>
				</div>
			{:else}
				<div class={styles.actionButtonVariant.success} role="button" on:click={openAddModal}>
					<Icon className={styles.buttonIcons} src={RiSystemAddFill} color={theme.colors.white} />
				</div>
			{/if}
		</div>
	</div>
	{#if $heroesVisualization === HeroesVisualizationModes.minimal}
		<div class={styles.tableItemRightMinimal}>
			{#each hero.skills as skill, i (skill.name)}
				<div class={styles.skillMinimal}>
					<img
						class={styles.skillImage}
						src={`images/heroSkills/heroSkill${hero.id.toString().padStart(2, '0')}_${i + 1}.png`}
						alt={formatSkillName(skill.name)}
					/>
					{#each skill.progression as step, grade}
						<div
							class={[
								styles.skillProgression,
								sprinkles({
									borderColor: borderColorByGrade[grade],
									background: backgroundColorByGrade[grade],
								}),
							].join(' ')}
						>
							<Text textAlign="center" fontWeight="bold" fontSize="xs"
								>{formatSkillValue(step, skill)}</Text
							>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
	{#if $heroesVisualization === HeroesVisualizationModes.detailed}
		<div class={styles.tableItemRight}>
			{#each hero.skills as skill, i (skill.name)}
				<div class={styles.skill}>
					<img
						class={styles.skillImage}
						src={`images/heroSkills/heroSkill${hero.id.toString().padStart(2, '0')}_${i + 1}.png`}
						alt={formatSkillName(skill.name)}
					/>
					<div>
						<Text fontSize="sm">{formatSkillName(skill.name)}</Text>
						<Text fontSize="xs">{skill.desc}</Text>
					</div>
					<div class={styles.skillDescription}>
						{#each skill.progression as step, grade}
							<div
								class={[
									styles.skillProgression,
									sprinkles({
										borderColor: borderColorByGrade[grade],
										background: backgroundColorByGrade[grade],
									}),
								].join(' ')}
							>
								<Text textAlign="center" fontWeight="bold" fontSize="xs"
									>{formatSkillValue(step, skill)}</Text
								>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<ModalAddHero
	open={addModalOpen}
	onClose={() => {
		addModalOpen = false;
	}}
	{hero}
	{userHero}
/>
