<script lang="ts">
  import GridItem from '$lib/components/GridItem/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { craft } from '$lib/db/archer';
  import * as tableStyles from '$lib/styles/table.css';

  import * as styles from './index.css';
</script>

<GridItem title="Archer Quality/Property Craft Rates">
  <div class={styles.archerDropRateTable}>
    <div class={tableStyles.tableItem} />
    <div class={tableStyles.tableItem} />
    <div class={tableStyles.tableItem}>
      <img class={styles.propertyIcons} src="/images/icons/iconGearQuality1.png" alt="Tier C" />
    </div>
    <div class={tableStyles.tableItem}>
      <img class={styles.propertyIcons} src="/images/icons/iconGearQuality2.png" alt="Tier C" />
    </div>
    <div class={tableStyles.tableItem}>
      <img class={styles.propertyIcons} src="/images/icons/iconGearQuality3.png" alt="Tier C" />
    </div>
    <div class={tableStyles.tableItem}>
      <img class={styles.propertyIcons} src="/images/icons/iconGearQuality4.png" alt="Tier C" />
    </div>
    <div class={tableStyles.tableRowVariant.otherRow}>
      <div class={tableStyles.tableItem} />
      <div class={tableStyles.tableItem} />
      {#each craft.QUALITY_RATES as quality}
        <div class={tableStyles.tableItem}><Text>{quality.toFixed(1)}%</Text></div>
      {/each}
    </div>
    <div class={tableStyles.tableRowVariant.row}>
      <div class={tableStyles.tableItem}><Text>None</Text></div>
      <div class={tableStyles.tableItem}>
        <Text>{((1 - craft.PROPERTY_RATE) * 100).toFixed(1)}%</Text>
      </div>
      {#each craft.QUALITY_RATES as quality}
        <div class={tableStyles.tableItem}>
          <Text>{((1 - craft.PROPERTY_RATE) * quality).toFixed(1)}%</Text>
        </div>
      {/each}
    </div>
    <div class={tableStyles.tableRowVariant.otherRow}>
      <div class={tableStyles.tableItem}>
        <img class={styles.propertyIcons} src="/images/icons/iconIce.png" alt="Property Ice" />
      </div>
      <div class={tableStyles.tableItem}>
        <Text>{((craft.PROPERTY_RATE / 4) * 100).toFixed(1)}%</Text>
      </div>
      {#each craft.QUALITY_RATES as quality}
        <div class={tableStyles.tableItem}>
          <Text>{((craft.PROPERTY_RATE / 4) * quality).toFixed(1)}%</Text>
        </div>
      {/each}
    </div>
    <div class={tableStyles.tableRowVariant.row}>
      <div class={tableStyles.tableItem}>
        <img class={styles.propertyIcons} src="/images/icons/iconElectric.png" alt="Property Ice" />
      </div>
      <div class={tableStyles.tableItem}>
        <Text>{((craft.PROPERTY_RATE / 4) * 100).toFixed(1)}%</Text>
      </div>
      {#each craft.QUALITY_RATES as quality}
        <div class={tableStyles.tableItem}>
          <Text>{((craft.PROPERTY_RATE / 4) * quality).toFixed(1)}%</Text>
        </div>
      {/each}
    </div>
    <div class={tableStyles.tableRowVariant.otherRow}>
      <div class={tableStyles.tableItem}>
        <img class={styles.propertyIcons} src="/images/icons/iconPoison.png" alt="Property Ice" />
      </div>
      <div class={tableStyles.tableItem}>
        <Text>{((craft.PROPERTY_RATE / 4) * 100).toFixed(1)}%</Text>
      </div>
      {#each craft.QUALITY_RATES as quality}
        <div class={tableStyles.tableItem}>
          <Text>{((craft.PROPERTY_RATE / 4) * quality).toFixed(1)}%</Text>
        </div>
      {/each}
    </div>
    <div class={tableStyles.tableRowVariant.row}>
      <div class={tableStyles.tableItem}>
        <img class={styles.propertyIcons} src="/images/icons/iconFire.png" alt="Property Ice" />
      </div>
      <div class={tableStyles.tableItem}>
        <Text>{((craft.PROPERTY_RATE / 4) * 100).toFixed(1)}%</Text>
      </div>
      {#each craft.QUALITY_RATES as quality}
        <div class={tableStyles.tableItem}>
          <Text>{((craft.PROPERTY_RATE / 4) * quality).toFixed(1)}%</Text>
        </div>
      {/each}
    </div>
  </div>
</GridItem>
