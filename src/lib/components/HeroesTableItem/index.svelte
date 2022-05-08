<script lang="ts">
  import CardHero from '$lib/components/CardHero/index.svelte';
  import ModalAddHero from '$lib/components/ModalAddHero/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import Tooltip from '$lib/components/Tooltip/index.svelte';
  import { HeroesVisualizationModes } from '$lib/enums';
  import { heroesVisualization } from '$lib/shared/stores/heroesVisualization';
  import { heroes, removeHero } from '$lib/shared/stores/user/heroes';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { theme } from '$lib/styles/themes/index.css';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import { getRuneById } from '$lib/utils/runes';
  import { match } from 'oxide.ts';
  import * as R from 'remeda';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiDesignEdit2Fill from 'svelte-icons-pack/ri/RiDesignEdit2Fill';
  import RiSystemAddFill from 'svelte-icons-pack/ri/RiSystemAddFill';
  import RiSystemDeleteBinFill from 'svelte-icons-pack/ri/RiSystemDeleteBinFill';

  import * as styles from './index.css';

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
    5: 'red10',
  };

  const backgroundColorByGrade = {
    0: 'yellow3',
    1: 'green3',
    2: 'blue3',
    3: 'plum3',
    4: 'orange3',
    5: 'red3',
  };

  function formatSkillName(name) {
    return name ? name.replace('{0}', '').trim() : name;
  }

  function formatSkillValue(progressionAttributes) {
    const { value, durTime, units, time, percentage, addType, effectType } = progressionAttributes;

    return match(addType, [
      [
        1,
        match(effectType, [
          [4, `${value}|${durTime}s`],
          [3, `${value}s`],
          () => `${Math.round(value * 100)}%`,
        ]),
      ],
      [
        2,
        match(effectType, [
          [9, `${durTime}s`],
          [21, `${Math.round(percentage * 100)}%`],
          [22, `${Math.round(percentage * 100)}%`],
          [23, `${Math.round(percentage * 100)}%`],
          [24, `${Math.round(percentage * 100)}%`],
          [
            99,
            () => {
              if (durTime) return `${durTime}s`;
              if (percentage) return `${Math.round(percentage * 100)}%`;
              return `${Math.round(value * 100)}%`;
            },
          ],
          [101, `${Math.round(percentage * 100)}%`],
          [102, `${Math.round(percentage * 100)}%`],
          [103, `${Math.round(percentage * 100)}%`],
          () => `${Math.round(value * 100)}%`,
        ]),
      ],
      [
        3,
        match(effectType, [
          [1, `${Math.round(value * 100)}%`],
          [501, `${Math.round(value * 100)}%`],
          [502, `${Math.round(value * 100)}%`],
          () => value,
        ]),
      ],
      [
        4,
        match(effectType, [
          [102, `${Math.round(percentage * 100)}%`],
          [103, `${Math.round(percentage * 100)}%|${durTime}s`],
          () => `${Math.round(value * 100)}%`,
        ]),
      ],
      () => {
        if (units && time) return `${units}|${time}s`;
        return `${Math.round(value * 100)}%`;
      },
    ]);
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

    const firstCritDmgRune = getRuneById(1);
    const firstAtkRune = getRuneById(2);

    const currentLevel = currUserHero?.level ?? 1;

    const currentGrade = currUserHero?.grade ?? currhero.baseGrade;

    const currentAscension = currhero.ascension.find((asc) => asc.grade === currentGrade);

    heroStats.criDamage += firstCritDmgRune.abilityInitMin;

    heroStats.hp = (heroStats.hp + heroStats.incHp * (currentLevel - 1)) * currentAscension.incHp;
    heroStats.def =
      (heroStats.def + heroStats.incDef * (currentLevel - 1)) * currentAscension.incDef;
    heroStats.atk =
      (heroStats.atk + heroStats.incAtk * (currentLevel - 1)) * currentAscension.incAtk +
      firstAtkRune.abilityInitMin;
    return heroStats;
  };

  const calculateDPS = (stats) => {
    const criRatio = stats.cri / 10000;
    const criDamageRatio = stats.criDamage / 10000;
    const normalDamage = stats.atk * stats.atkSpeed;
    const criticalDamage = stats.atk * stats.atkSpeed * (1 + criDamageRatio);
    const normalDamageRatio = Math.max(1 - criRatio, 0);
    const criticalDamageRatio = Math.min(criRatio, 1);
    return getIdleKingdomNumberFormat(
      normalDamageRatio * normalDamage + criticalDamage * criticalDamageRatio,
      2
    );
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
              loading="lazy"
              class={styles.tierIcon}
              src={`images/heroTier/iconGearQuality${hero.baseGrade}.png`}
              alt={`Tier icon`}
            />
          </div>
          <Text fontSize="xs">Lv {userHero?.level ?? 1}</Text>
        </div>
        {#if $heroesVisualization !== HeroesVisualizationModes.compact}
          <div class={styles.statsContainer}>
            <div class={styles.stats}>
              <img
                loading="lazy"
                class={styles.statsIcons}
                src="images/icons/iconHp.png"
                alt="Heart icon"
              />
              <Text fontSize="xs">{getIdleKingdomNumberFormat(heroStats.hp)}</Text>
            </div>
            <div class={styles.stats}>
              <img
                loading="lazy"
                class={styles.statsIcons}
                src="images/icons/iconPower.png"
                alt="Heart icon"
              />
              <Text fontSize="xs">{getIdleKingdomNumberFormat(heroStats.atk)}</Text>
            </div>
            <div class={styles.stats}>
              <img
                loading="lazy"
                class={styles.statsIcons}
                src="images/icons/iconDef.png"
                alt="Heart icon"
              />
              <Text fontSize="xs">{getIdleKingdomNumberFormat(heroStats.def)}</Text>
            </div>
          </div>
        {/if}
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
            loading="lazy"
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
              <Text textAlign="center" fontSize="xs" fontFamily="mono"
                >{formatSkillValue(step)}</Text
              >
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/if}
  {#if $heroesVisualization === HeroesVisualizationModes.detailed}
    <div class={styles.heroStats}>
      {#each Object.keys(R.omit( heroStats, ['hp', 'incHp', 'def', 'incDef', 'atk', 'incAtk'] )) as stats}
        <div class={styles.heroStat}>
          <Text>{stats}:</Text>
          <Text>{heroStats[stats]}</Text>
        </div>
      {/each}
      <div class={styles.heroStat}>
        <Text
          ><Tooltip text="This doens't take Hit and enemy's dodge into account.">DPS (?)</Tooltip
          >:</Text
        >
        <Text>{calculateDPS(heroStats)}</Text>
      </div>
    </div>
    <div class={styles.tableItemRight}>
      {#each hero.skills as skill, i (skill.name)}
        <div class={styles.skill}>
          <img
            loading="lazy"
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
                <Text textAlign="center" fontSize="xs" fontFamily="mono"
                  >{formatSkillValue(step)}</Text
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
