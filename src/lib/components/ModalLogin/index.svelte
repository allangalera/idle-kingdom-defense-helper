<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { supabaseClient } from '$lib/supabaseClient';

  export let open = false;
  export let onClose: () => void;

  let isLoading = false;
  let isError = false;
  let isSuccess = false;
  let message = null;
  let email;

  const onSubmit = async () => {
    isLoading = true;
    isError = false;
    isSuccess = false;
    message = null;
    try {
      const { error } = await supabaseClient.auth.signIn(
        { email },
        { redirectTo: window.location.origin }
      );
      if (error) throw error;
      isSuccess = true;
      message = 'Check your email for the login link!';
    } catch (error) {
      isError = true;
      message = error.error_description || error.message;
    } finally {
      isLoading = false;
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    isError = false;
    message = null;
    isSuccess = false;

    onClose();
  };
</script>

{#if open}
  <Portal>
    <Modal onClose={handleClose} footerJustifyContent="flex-end">
      <slot slot="header">
        <Heading textAlign="center">Sign in with a magic link</Heading>
      </slot>
      <slot slot="content">
        {#if isSuccess && message}
          <div
            class={sprinkles({
              background: 'green7',
              padding: 4,
              borderRadius: 'base',
            })}
          >
            <Text color="green12" textAlign="center">{message}</Text>
          </div>
        {:else}
          <Input label="E-mail" bind:value={email} disabled={isLoading} />
          {#if isError && message}
            <div
              class={sprinkles({
                background: 'red7',
                padding: 4,
                borderRadius: 'base',
              })}
            >
              <Text color="red12" textAlign="center">{message}</Text>
            </div>
          {/if}
        {/if}
      </slot>
      <slot slot="footer">
        <Button variant="secondary" disabled={isLoading} on:click={handleClose}>
          <Text color="white" textAlign="center">Close</Text>
        </Button>
        {#if !isSuccess}
          <Button variant="success" disabled={isLoading} on:click={onSubmit}>
            <Text color="white" textAlign="center">Sign in</Text>
          </Button>
        {/if}
      </slot>
    </Modal>
  </Portal>
{/if}
