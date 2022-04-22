<script lang="ts">
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import IMask from 'imask';

  import * as styles from './index.css';

  export let label;
  export let value = '';
  export let maskOptions = undefined;
  export let textAlign: Sprinkles['textAlign'] = 'left';
  export let id = undefined;
  export let disabled = false;
  export let readonly = false;

  function validate() {
    if (maskOptions) {
      const mask = IMask.createMask(maskOptions);
      value = mask.resolve(value);
    }
  }

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
    type="text"
    {id}
    {value}
    {disabled}
    {readonly}
    on:input={(e) => (value = e.currentTarget.value)}
  />
</label>
