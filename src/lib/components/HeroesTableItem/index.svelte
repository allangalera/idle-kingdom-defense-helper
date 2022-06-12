<script lang="ts">
  import CardHero from '$lib/components/CardHero/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import ModalAddHero from '$lib/components/ModalAddHero/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import Tooltip from '$lib/components/Tooltip/index.svelte';
  import { HeroesVisualizationModes } from '$lib/enums';
  import { heroesVisualization } from '$lib/shared/stores/heroesVisualization';
  import { heroes, removeHero } from '$lib/shared/stores/user/heroes';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { theme } from '$lib/styles/themes/index.css';
  import { getIdleKingdomNumberFormat } from '$lib/utils';
  import {
    calculateHeroStats,
    formatSkillDescription,
    formatSkillName,
    formatSkillValue,
    isCurrentSkillLevel,
  } from '$lib/utils/hero';
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

  const openAddModal = () => {
    addModalOpen = true;
  };

  const onRemoveHero = () => {
    removeHero(hero.id);
  };

  heroes.subscribe((data) => {
    userHero = data?.heroes?.find((item) => item.id === hero.id) || null;
  });

  $: heroStats = calculateHeroStats(hero, userHero);
</script>

<div class={styles.tableItem}>
  <div class={styles.tableItemLeft}>
    <div class={styles.cardInfoContainer}>
      <CardHero width={20} heroTypeBadgeWidth={4} hero={{ ...hero, ...userHero }} />
      <div class={styles.infoContainer}>
        <div class={styles.basicInfo}>
          <div class={styles.heroNameAndTier}>
            <a href={`/heroes/${hero.name.toLowerCase()}`}>
              <Text fontSize="base" fontWeight="bold">{hero.name}</Text></a
            >
            <img
              loading="lazy"
              class={styles.tierIcon}
              src={`images/heroTier/iconGearQuality${hero.baseGrade}.png`}
              alt={`Tier icon`}
            />
          </div>
          <Text fontSize="sm">Lv {userHero?.level ?? 1}</Text>
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
          <Tooltip>
            <slot slot="tooltip-content">
              <Heading textAlign="center">{formatSkillName(skill.name)}</Heading>
              <Text textAlign="center"
                >{formatSkillDescription(skill, i, hero.grade ?? hero.baseGrade, hero)}</Text
              >
            </slot>
            <img
              loading="lazy"
              class={styles.skillImage}
              src={`/images/heroSkills/heroSkill${hero.id.toString().padStart(2, '0')}_${
                i + 1
              }.png`}
              alt={formatSkillName(skill.name)}
            />
          </Tooltip>
          {#each skill.progression as step, grade}
            <div
              class={[
                styles.skillProgression,
                sprinkles({
                  borderColor: borderColorByGrade[grade],
                  background: backgroundColorByGrade[grade],
                  opacity: isCurrentSkillLevel(hero.grade ?? hero.baseGrade, i, grade) ? 1 : 0.5,
                }),
              ].join(' ')}
            >
              <Text textAlign="center" fontSize="xs" fontFamily="mono"
                >{formatSkillValue(hero, skill, step)}</Text
              >
            </div>
          {/each}
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
