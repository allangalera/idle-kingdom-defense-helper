<script lang="ts">
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';

  import * as styles from './index.css';

  export let text = null;

  let open = false;
  let el;
  let x;
  let y;
  let maxWidth;

  const onShow = () => {
    const boundingClientRect = el.getBoundingClientRect();
    x = boundingClientRect.left + boundingClientRect.width / 2;
    y = boundingClientRect.top;
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const spaceOnTheLeft = (viewportWidth - x) * 2 - 16;
    const spaceOnTheRight = (viewportWidth - (viewportWidth - x)) * 2 - 16;
    maxWidth = Math.min(spaceOnTheLeft, spaceOnTheRight);

    if (!open) open = true;
  };

  const onHide = () => {
    if (open) open = false;
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
  bind:this={el}
>
  <slot />
</span>
{#if open}
  <Portal>
    <div class={styles.container} style="top: {y}px; left: {x}px; max-width: {maxWidth}px">
      <div class={styles.tooltip}>
        <slot name="tooltip-content" />
        {#if text}
          <Text textAlign="center">{text}</Text>
        {/if}
      </div>
      <div class={styles.triangle} />
    </div>
  </Portal>
{/if}
