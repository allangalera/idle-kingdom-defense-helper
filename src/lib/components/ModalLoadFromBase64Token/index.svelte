<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { loadFromBase64 } from '$lib/shared/stores/user/index';

  export let open = false;
  export let onClose: () => void;

  let tokenToLoad;

  const onSubmit = () => {
    if (!tokenToLoad) return;

    loadFromBase64(tokenToLoad);

    tokenToLoad = '';

    onClose?.();
  };
</script>

{#if open}
  <Portal>
    <Modal {onClose} footerJustifyContent="flex-end">
      <slot slot="header">
        <Heading textAlign="center">Load from Base 64 token</Heading>
      </slot>
      <slot slot="content">
        <Input label="Token" bind:value={tokenToLoad} />
      </slot>
      <slot slot="footer">
        <Button variant="danger" on:click={onClose}>
          <Text color="white" textAlign="center">Cancel</Text>
        </Button>
        <Button variant="success" on:click={onSubmit}>
          <Text color="white" textAlign="center">Load</Text>
        </Button>
      </slot>
    </Modal>
  </Portal>
{/if}
