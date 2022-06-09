<script lang="ts">
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_STAGE_LEVEL } from '$lib/constants';
  import { ruinConst } from '$lib/db/ruins';
  import { stage } from '$lib/shared/stores/user/stage';
  import { getEnemyPattern } from '$lib/utils/ruins';

  import * as styles from './index.css';

  let stageLevel = $stage.stage.toString();
  let enemyPattern = [];

  const updateEnemyPattern = () => {
    enemyPattern = getEnemyPattern(+stageLevel);
  };

  stage.subscribe((value) => {
    if (value.stage) stageLevel = value.stage.toString();
  });

  $: stageLevel && updateEnemyPattern();
</script>

<div class={styles.container}>
  <Input
    textAlign="center"
    bind:value={stageLevel}
    maskOptions={{
      mask: Number,
      min: 0,
      max: MAX_STAGE_LEVEL,
    }}
    label="Current stage"
  />
  <Text>Enemies:</Text>
  <div class={styles.resultsContainer}>
    {#each enemyPattern as enemies, idx}
      <div class={styles.flex}>
        <div>
          <Text fontSize="lg" textAlign="center">{idx + 1}</Text>
          {#if ruinConst.REWARD.CASH[idx]}
            <Text
              >{ruinConst.REWARD.CASH[idx]}<img
                class={styles.icon}
                loading="lazy"
                src={`images/icons/iconRuby.png`}
                alt="enemy"
              /></Text
            >
          {/if}
        </div>
        {#each Object.keys(enemies) as enemy}
          {#if enemies[enemy].unitType === 5}
            <img
              loading="lazy"
              src={`images/enemies/enemy${enemies[enemy].unitId}.png`}
              alt="enemy"
            />
          {/if}
        {/each}
      </div>
    {/each}
  </div>
</div>
