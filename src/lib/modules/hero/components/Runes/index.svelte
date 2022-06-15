<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import ModalEditHeroRune from '$lib/components/ModalEditHeroRune/index.svelte';
  import RuneIcon from '$lib/components/RuneIcon/index.svelte';
  import { MAX_HERO_GRADE } from '$lib/db/heroes';
  import { runes } from '$lib/db/runes';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { getLevelFromGrade, getRarityFromGrade } from '$lib/utils/hero';

  import * as styles from './index.css';

  export let hero;
  export let heroUserData;

  let isModalOpen = false;
  let selectedRune;

  const onOpenModal = (rune) => {
    if (!heroUserData) return false;
    selectedRune = rune;
    isModalOpen = true;
  };
</script>

<GridItem title="Runes" full>
  <div class={styles.container}>
    <div class={styles.gridContainer}>
      {#each { length: MAX_HERO_GRADE } as _, index}
        <div class={styles.gradeHeader}>
          {#each { length: getLevelFromGrade(index + 1) } as _}
            <img
              loading="lazy"
              class={styles.start}
              src={`/images/icons/iconStarBig${getRarityFromGrade(index + 1)}.png`}
              alt="ranking icon"
            />
          {/each}
        </div>
      {/each}
      {#each runes as rune}
        <div
          style={`grid-column: ${rune.grade}; grid-row: ${rune.idx + 1};`}
          class={[
            styles.runeContainer,
            sprinkles({
              opacity: heroUserData?.runes?.[rune.id] ? 1 : 0.5,
            }),
          ].join(' ')}
        >
          <Button variant="logic" on:click={() => onOpenModal(rune)}>
            <RuneIcon grade={rune.grade} abilityType={rune.abilityType} />
          </Button>
        </div>
      {/each}
    </div>
  </div>
</GridItem>
<ModalEditHeroRune
  open={isModalOpen}
  onClose={() => {
    isModalOpen = false;
  }}
  rune={selectedRune}
  {hero}
  userHero={heroUserData}
/>
