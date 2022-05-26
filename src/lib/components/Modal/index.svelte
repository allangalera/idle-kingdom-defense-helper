<script lang="ts">
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import type { Sprinkles } from '$lib/styles/sprinkles.css';
  import { theme } from '$lib/styles/themes/index.css';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiSystemCloseFill from 'svelte-icons-pack/ri/RiSystemCloseFill';
  import { fade } from 'svelte/transition';

  import * as styles from './index.css';

  export let footerJustifyContent: Sprinkles['justifyContent'] = 'flex-start';
  export let onClose: () => void = () => void 0;
  export let shouldCloseOnOverlay = true;
</script>

<div
  class={styles.wrapper}
  on:click={shouldCloseOnOverlay && onClose}
  transition:fade={{ duration: 120 }}
>
  <div class={styles.container} on:click|preventDefault|stopPropagation>
    <div class={styles.header}>
      <div class={styles.headerContainer}>
        <slot name="header" />
      </div>
      <div class={styles.headerCloseIconContainer} on:click={onClose}>
        <Icon
          className={styles.headerCloseIcon}
          src={RiSystemCloseFill}
          color={theme.themeColors.baseColors.gray12}
        />
      </div>
    </div>
    <div class={styles.content}>
      <slot name="content" />
    </div>
    {#if $$slots.footer}
      <div
        class={[
          styles.footer,
          sprinkles({
            justifyContent: footerJustifyContent,
          }),
        ].join(' ')}
      >
        <slot name="footer" />
      </div>
    {/if}
  </div>
</div>
