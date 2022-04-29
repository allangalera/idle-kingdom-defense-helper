<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { theme } from '$lib/styles/themes/index.css';
  import { returnRewardDataByStage } from '$lib/utils/stage';
  import Icon from 'svelte-icons-pack';
  import RiDeviceSave2Fill from 'svelte-icons-pack/ri/RiDeviceSave2Fill';

  import * as styles from './index.css';

  let stage;
  let seconds;

  let stages = [];

  const addStageToCompare = () => {
    if (!stage || !seconds) return;
    let reward = returnRewardDataByStage(+stage);
    console.log(reward);
    stages = [
      ...stages,
      {
        stage: +stage,
        ...reward,
      },
    ];
    stage = '';
    seconds = '';
  };
</script>

<div class={styles.bulkEditForm}>
  <Input
    textAlign="center"
    label="Stage"
    bind:value={stage}
    maskOptions={{
      mask: Number,
    }}
  />
  <Input
    textAlign="center"
    label="Time to finish (seconds)"
    bind:value={seconds}
    maskOptions={{
      mask: Number,
    }}
  />
  <Button variant="success" on:click={addStageToCompare}>
    <Icon className={styles.buttonIcon} src={RiDeviceSave2Fill} color={theme.colors.white} />
  </Button>
</div>
<div>
  {#each stages as cStage}
    <Text>{cStage.stage}</Text>
    <Text>{JSON.stringify(cStage.idle)}</Text>
  {/each}
</div>
