<script lang="ts">
  import * as styles from './index.css';
  import CardHero from '$lib/components/CardHero/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { match } from 'oxide.ts';
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

    return match(addType, [
      [
        1,
        match(effectType, [
          [4, `${value}/${durTime}s`],
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
          [103, `${Math.round(percentage * 100)}%`],
          () => `${Math.round(value * 100)}%`,
        ]),
      ],
      () => {
        if (units && time) return `${units}/${time}s`;
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
              loading="lazy"
              class={styles.tierIcon}
              src={`images/heroTier/iconGearQuality${hero.baseGrade}.png`}
              alt={`Tier icon`}
            />
          </div>
          <Text fontSize="xs">Lv {userHero?.level ?? 1}</Text>
        </div>
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
