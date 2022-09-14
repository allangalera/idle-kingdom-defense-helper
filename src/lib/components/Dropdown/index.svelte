<script lang="ts">
  import Portal from '$lib/components/Portal/index.svelte';
  import { flip, offset, shift } from '@floating-ui/dom';
  import { createFloatingActions } from 'svelte-floating-ui';

  import * as styles from './index.css';

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'fixed',
    placement: 'top',
    middleware: [shift({ padding: 8 }), flip(), offset(8)],
    autoUpdate: true,
  });

  let showDropdown = false;

  const onClick = () => {
    showDropdown = !showDropdown;
  };

  let buttonRef;
  let dropdownRef;

  const onClickOutside = (e) => {
    const withinBoundaries =
      e.composedPath().includes(buttonRef) || e.composedPath().includes(dropdownRef);
    if (!withinBoundaries) {
      showDropdown = false;
    }
  };
</script>

<svelte:window on:click={onClickOutside} />

<span bind:this={buttonRef} on:click={onClick} use:floatingRef>
  <slot />
</span>

{#if showDropdown}
  <Portal>
    <div bind:this={dropdownRef} class={styles.container} use:floatingContent>
      <div class={styles.tooltip}>
        <slot name="tooltip-content" />
      </div>
    </div>
  </Portal>
{/if}
