<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import FortressEdit from '$lib/components/FortressEdit/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import * as R from 'remeda';

  import * as styles from './index.css';

  export let open = false;
  export let onClose: () => void;
  export let kingdom;

  let title;

  const formatTitle = () => {
    const continentName = R.pathOr(kingdom, ['continent'], '');
    const kingdomName = R.pathOr(kingdom, ['name'], '');
    title = `${continentName} - ${kingdomName}`;
  };

  $: kingdom && formatTitle();
</script>

{#if open}
  <Portal>
    <Modal {onClose} footerJustifyContent="flex-end" shouldCloseOnOverlay={false}>
      <slot slot="header">
        <Heading textAlign="center">{title}</Heading>
      </slot>
      <slot slot="content">
        <Heading textAlign="center">Fortress</Heading>
        <div class={styles.fortressContainer}>
          {#each kingdom.fortressIds as fortress, index}
            <FortressEdit key={index + 1} fortressId={fortress} />
          {/each}
        </div>
      </slot>
      <slot slot="footer">
        <Button on:click={onClose}>
          <Text color="white" as="span">Close</Text>
        </Button>
      </slot>
    </Modal>
  </Portal>
{/if}
