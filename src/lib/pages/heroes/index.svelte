<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import HeroAscensionUsed from '$lib/components/HeroAscensionUsed/index.svelte';
  import HeroesTable from '$lib/components/HeroesTable/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { defaultSortingHeroes, heroes } from '$lib/db/heroes';
  import { HeroesSearchValues, HeroesVisualizationModes } from '$lib/enums';
  import { heroesVisualization } from '$lib/shared/stores/heroesVisualization';
  import { heroes as heroesStore } from '$lib/shared/stores/user/heroes';
  import { matchSorter } from 'match-sorter';

  import * as styles from './index.css';

  let searchParameter;

  let filteredHeroes = heroes;

  let searchKeys = [
    HeroesSearchValues.name,
    HeroesSearchValues.skillName,
    HeroesSearchValues.skillDescription,
  ];

  function onChangeViewMode(event) {
    const { value } = event.target;
    heroesVisualization.set(value);
  }

  function onChangeSearchKeys(event) {
    const { value, checked } = event.target;
    if (checked) searchKeys = [...searchKeys, value];
    else searchKeys = searchKeys.filter((key) => key !== value);
  }

  function searchHero(input, keys) {
    let userHeroes = heroes.map((hero) => {
      let userHero = ($heroesStore.heroes ?? []).find((userH) => userH.id === hero.id);
      return {
        ...hero,
        ...userHero,
      };
    });
    userHeroes = defaultSortingHeroes(userHeroes);

    return matchSorter(userHeroes, input, {
      keys,
      sorter: (rankedItems) => rankedItems,
      threshold: matchSorter.rankings.CONTAINS,
    });
  }

  heroesStore.subscribe(() => {
    filteredHeroes = searchHero(searchParameter, searchKeys);
  });

  $: filteredHeroes = searchHero(searchParameter, searchKeys);
</script>

<Heading textAlign="center" fontSize="3xl">Heroes</Heading>
<div class={styles.container}>
  <div class={styles.formContainer}>
    <Input label="Search" bind:value={searchParameter} />
    <div class={styles.configurations}>
      <div class={styles.inputGroup}>
        <Text>Attributes to search:</Text>
        <div class={styles.inputContainer}>
          <label class={styles.input}>
            <input
              type="checkbox"
              value={HeroesSearchValues.name}
              checked
              on:change={onChangeSearchKeys}
            />
            <Text>name</Text>
          </label>
          <label class={styles.input}>
            <input
              type="checkbox"
              value={HeroesSearchValues.skillName}
              checked
              on:change={onChangeSearchKeys}
            />
            <Text>Skill name</Text>
          </label>
          <label class={styles.input}>
            <input
              type="checkbox"
              value={HeroesSearchValues.skillDescription}
              checked
              on:change={onChangeSearchKeys}
            />
            <Text>Skill description</Text>
          </label>
        </div>
      </div>
      <div class={styles.inputGroup}>
        <Text>View Mode</Text>
        <div class={styles.inputContainer}>
          <label class={styles.input}>
            <input
              type="radio"
              name="view-mode"
              value={HeroesVisualizationModes.compact}
              checked={$heroesVisualization === HeroesVisualizationModes.compact}
              on:change={onChangeViewMode}
            />
            <Text>Compact</Text>
          </label>
          <label class={styles.input}>
            <input
              type="radio"
              name="view-mode"
              value={HeroesVisualizationModes.minimal}
              checked={$heroesVisualization === HeroesVisualizationModes.minimal}
              on:change={onChangeViewMode}
            />
            <Text>Minimal</Text>
          </label>
        </div>
      </div>
    </div>
  </div>
  <HeroesTable heroes={filteredHeroes} />
  <Heading textAlign="center" fontSize="2xl">Status</Heading>
  <HeroAscensionUsed />
</div>
