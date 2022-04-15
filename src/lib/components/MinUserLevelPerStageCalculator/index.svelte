<script lang="ts">
  import * as styles from './index.css';
  import { stageClearReward } from '$lib/db/stage';
  import { userLv } from '$lib/db/user';
  import * as R from 'remeda';

  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';

  let stage = '1';
  let result = '';

  const calculateMinimumLevel = (stg: number) => {
    let sumExp = 0;
    for (let currStg = 1; currStg <= stg; currStg++) {
      let rewardData = stageClearReward[0];
      for (let stgClearReward of R.reverse(stageClearReward)) {
        if (stgClearReward.lv <= stg) {
          rewardData = stgClearReward;
        } else {
          break;
        }
      }
      let dLv = currStg - rewardData.lv;
      sumExp += Math.floor(rewardData.expInit + rewardData.expInc * dLv);
    }
    let userLevel = 1;
    for (let user of userLv) {
      if (user.exp > sumExp) {
        break;
      }
      userLevel = user.id;
    }
    result = userLevel.toString();
  };

  $: calculateMinimumLevel(+stage);
</script>

<Input
  textAlign="center"
  label="Stage"
  bind:value={stage}
  maskOptions={{
    mask: Number,
    min: 0,
    max: 50000,
  }}
/>
<Text textAlign="center">{result}</Text>
