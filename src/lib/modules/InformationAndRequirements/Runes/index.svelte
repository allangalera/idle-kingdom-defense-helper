<script lang="ts">
  import GradeStars from '$lib/components/GradeStars/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_RUNE_ENCHANT_LEVEL, runes } from '$lib/db/runes';
  import * as tableStyles from '$lib/styles/table.css';
  import { concatClasses, getRowStyling } from '$lib/styles/utils';
  import { returnAttributeName } from '$lib/utils/hero';
  import { returnRuneAttribute } from '$lib/utils/runes';

  import * as styles from './index.css';
</script>

<GridItem title="Runes" full>
  <div class={tableStyles.table28Columns}>
    <div class={concatClasses(styles.tableHeader, styles.tripleRow, styles.stickyLeft)}>
      <Heading textAlign="center" fontSize="xl">Grade</Heading>
    </div>
    <div class={concatClasses(styles.tableHeader, styles.tripleRow, styles.stickyLeft)}>
      <Heading textAlign="center" fontSize="xl">Ability</Heading>
    </div>
    <div
      class={concatClasses(tableStyles.tableHeaderItem, styles.aLotOfColumns, styles.stickyLeft)}
    >
      <Heading textAlign="center" fontSize="xl">Enchant Level</Heading>
    </div>
    {#each { length: MAX_RUNE_ENCHANT_LEVEL + 1 } as _, idx}
      <div
        class={concatClasses(
          tableStyles.tableHeaderItem,
          styles.doubleColumn,
          styles.minWidthMaxContent
        )}
      >
        <Heading textAlign="center" fontSize="xl">+ {idx}</Heading>
      </div>
    {/each}
    {#each { length: MAX_RUNE_ENCHANT_LEVEL + 1 } as _}
      <div class={concatClasses(tableStyles.tableHeaderItem, styles.tableSpacing)}>
        <Heading textAlign="center" fontSize="xl">Min</Heading>
      </div>
      <div class={concatClasses(tableStyles.tableHeaderItem, styles.tableSpacing)}>
        <Heading textAlign="center" fontSize="xl">Max</Heading>
      </div>
    {/each}
    {#each runes as rune, idx (rune.id)}
      <div class={tableStyles.tableRowVariant[getRowStyling(idx)]}>
        <div class={concatClasses(tableStyles.tableItem, styles.stickyLeft)}>
          <GradeStars grade={rune.grade} size={4} />
        </div>
        <div
          class={concatClasses(tableStyles.tableItem, styles.stickyLeft, styles.minWidthMaxContent)}
        >
          <Text textAlign="center"
            >{returnAttributeName(returnRuneAttribute(rune.abilityType))}</Text
          >
        </div>
        {#each { length: MAX_RUNE_ENCHANT_LEVEL + 1 } as _, idx}
          <div class={concatClasses(tableStyles.tableItem, styles.minWidthMaxContent)}>
            <Text>{rune.abilityInitMin + rune.abilityIncMin * idx}</Text>
          </div>
          <div class={concatClasses(tableStyles.tableItem, styles.minWidthMaxContent)}>
            <Text>{rune.abilityInitMax + rune.abilityIncMax * idx}</Text>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</GridItem>
