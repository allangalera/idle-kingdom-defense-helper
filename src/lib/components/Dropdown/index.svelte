<script lang="ts">
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { flip, offset, shift } from '@floating-ui/dom';
  import { createFloatingActions } from 'svelte-floating-ui';
  import clickOutside from 'svelte-outside-click';

  import * as styles from './index.css';

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'fixed',
    placement: 'top',
    middleware: [shift({ padding: 8 }), flip(), offset(8)],
    autoUpdate: true,
  });

  let showDropdown: boolean = false;

  const onClick = () => {
    showDropdown = true;
  };

  const onClickOutside = () => {
    showDropdown = false;
  };
</script>

<span on:click={onClick} use:floatingRef use:clickOutside={onClickOutside}>
  <slot />
</span>

{#if showDropdown}
  <Portal>
    <div class={styles.container} use:floatingContent>
      <div class={styles.tooltip}>
        <slot name="tooltip-content" />
      </div>
    </div>
  </Portal>
{/if}
