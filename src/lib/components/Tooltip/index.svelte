<script lang="ts">
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { flip, offset, shift } from '@floating-ui/dom';
  import { arrow, createFloatingActions } from 'svelte-floating-ui';
  import { writable } from 'svelte/store';

  import * as styles from './index.css';

  export let text: string = null;

  const arrowRef = writable(null);
  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'fixed',
    placement: 'top',
    middleware: [shift({ padding: 8 }), flip(), offset(12), arrow({ element: arrowRef })],
    autoUpdate: true,
    onComputed(computed) {
      if (!$arrowRef) return;
      const { placement, middlewareData } = computed;
      const { x, y } = middlewareData.arrow;
      const currentPlacement = placement.split('-')[0];
      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[currentPlacement];

      const rotation = {
        top: 'rotate(0deg)',
        right: 'rotate(90deg)',
        bottom: 'rotate(180deg)',
        left: 'rotate(-90deg)',
      }[currentPlacement];

      Object.assign($arrowRef.style, {
        left: x ? `${x}px` : 'unset',
        top: y ? `${y}px` : 'unset',
        transform: rotation,
        [staticSide]: '-12px',
      });
    },
  });

  let showTooltip = false;

  const onShow = () => {
    showTooltip = true;
  };

  const onHide = () => {
    showTooltip = false;
  };

  const onMouseOver = () => {
    onShow();
  };

  const onMouseLeave = () => {
    onHide();
  };

  const onFocus = () => {
    onShow();
  };

  const onBlur = () => {
    onHide();
  };
</script>

<span
  on:mouseover={onMouseOver}
  on:mouseleave={onMouseLeave}
  on:focus={onFocus}
  on:blur={onBlur}
  use:floatingRef
>
  <slot />
</span>

{#if showTooltip}
  <Portal>
    <div class={styles.container} use:floatingContent>
      <div class={styles.tooltip}>
        {#if text}
          <Text>{text}</Text>
        {:else}
          <slot name="tooltip-content" />
        {/if}
      </div>
      <div class={styles.triangle} bind:this={$arrowRef} />
    </div>
  </Portal>
{/if}
