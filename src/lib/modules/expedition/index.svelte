<script lang="ts">
  import Card from '$lib/components/Card/index.svelte';
  import CardHeroShard from '$lib/components/CardHeroShard/index.svelte';
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { raidInfo, raidInfoGroupByType } from '$lib/db/raid';
  import langJSON from '$lib/gameInfo/lang.json';
  import * as tableStyles from '$lib/styles/table.css';
  import { getRowStyling } from '$lib/styles/utils';
  import { returnItemStringIdById } from '$lib/utils/items';
  import { returnRaidRewards } from '$lib/utils/raid';

  import * as styles from './index.css';
</script>

<Heading textAlign="center" fontSize="3xl">Expedition</Heading>
<div class={styles.grid}>
  {#each Object.keys(raidInfoGroupByType) as expeditionType}
    <GridItem title={langJSON[`RAID_BOSS_NAME_${expeditionType}`]}>
      <div class={tableStyles.table3Columns}>
        <div class={tableStyles.tableHeaderItem}>
          <Heading textAlign="center" fontSize="xl">Level</Heading>
        </div>
        <div class={tableStyles.tableHeaderItem}>
          <Heading textAlign="center" fontSize="xl">Stage difficulty</Heading>
        </div>
        <div class={tableStyles.tableHeaderItem}>
          <Heading textAlign="center" fontSize="xl">Rewards</Heading>
        </div>
        {#each raidInfoGroupByType[expeditionType] as level, row}
          <div class={tableStyles.tableRowVariant[getRowStyling(row)]}>
            <div class={tableStyles.tableItem}>
              <Text textAlign="center">{level.lv}</Text>
            </div>
            <div class={tableStyles.tableItem}>
              <Text textAlign="center">{level.difficultyStage}</Text>
            </div>
            <div class={tableStyles.tableItem}>
              {#each returnRaidRewards(level) as item}
                <Card cardType={returnItemStringIdById(item)} width={16} value={item.c} />
              {/each}
              {#each level.rewardInfo.rewards as item}
                {#if item.t === 201}
                  <CardHeroShard width={16} value={item.c} grade={item.gr} />
                {:else}
                  <Card cardType={returnItemStringIdById(item)} width={16} value={item.c} />
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </GridItem>
  {/each}
</div>
