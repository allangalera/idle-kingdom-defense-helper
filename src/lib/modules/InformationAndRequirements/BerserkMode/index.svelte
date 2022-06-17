<script lang="ts">
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { berserkMode } from '$lib/db/contents';
  import * as tableStyles from '$lib/styles/table.css';
  import { concatClasses } from '$lib/styles/utils';
  import { getRowStyling } from '$lib/styles/utils';

  import * as styles from './index.css';
</script>

<GridItem title="Berserk Mode">
  <div class={tableStyles.table8Columns}>
    <div class={concatClasses(tableStyles.tableHeaderItem, styles.doubleRow)}>
      <Heading textAlign="center" fontSize="base">Level</Heading>
    </div>
    <div class={concatClasses(tableStyles.tableHeaderItem, styles.doubleRow)}>
      <Heading textAlign="center" fontSize="base">Time to Activate</Heading>
    </div>
    <div class={concatClasses(tableStyles.tableHeaderItem, styles.effectsHeader)}>
      <Heading textAlign="center" fontSize="base">Effects</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="base">ATK</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="base">HP</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="base">DEF</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="base">C.C Trigger Resist</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="base">C.C Duration Resist</Heading>
    </div>
    <div class={tableStyles.tableHeaderItem}>
      <Heading textAlign="center" fontSize="base">C.C Effect Resist</Heading>
    </div>
    {#each berserkMode.EFFECTS as effect, idx}
      <div class={tableStyles.tableRowVariant[getRowStyling(idx)]}>
        <div class={tableStyles.tableItem}>
          <Text>{idx + 1}</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{berserkMode.START_TIME[idx] / 60} min</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{Math.round(effect.atk * 100)}%</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{Math.round(effect.hp * 100)}%</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{Math.round(effect.def * 100)}%</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{Math.round(effect.debuffRegist * 100)}%</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{Math.round(effect.debuffDurRegist * 100)}%</Text>
        </div>
        <div class={tableStyles.tableItem}>
          <Text textAlign="center">{Math.round(effect.debuffEffRegist * 100)}%</Text>
        </div>
      </div>
    {/each}
  </div>
</GridItem>
