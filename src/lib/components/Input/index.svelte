<script lang="ts">
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import IMask from 'imask';

  import * as styles from './index.css';

  export let label;
  export let value = '';
  export let maskOptions = undefined;
  export let pipeOptions = undefined;
  export let textAlign: Sprinkles['textAlign'] = 'left';
  export let id = undefined;
  export let disabled = false;
  export let readonly = false;
  export let type = 'text';

  let mask;
  let pipe;

  function validate() {
    if (type !== 'text') return;
    if (mask) {
      value = mask.resolve(value);
    }
    if (pipe) {
      value = pipe(value);
    }
  }

  const generatePipe = () => {
    console.log({ pipeOptions });
    pipe = IMask.createPipe(pipeOptions);
  };

  const generateMask = () => {
    console.log({ maskOptions });
    mask = IMask.createMask(maskOptions);
  };

  $: pipeOptions && generatePipe();
  $: maskOptions && generateMask();
  $: value && validate();
</script>

<label class={styles.container}>
  {#if label}
    <Text {textAlign}>{label}</Text>
  {/if}
  <input
    class={[
      styles.input,
      sprinkles({
        textAlign,
      }),
    ].join(' ')}
    {id}
    {value}
    {disabled}
    {readonly}
    {type}
    on:input={(e) => (value = e.currentTarget.value)}
  />
</label>
