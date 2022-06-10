<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { addOrUpdateHeroGear, removeHeroGear } from '$lib/shared/stores/user/heroes';
  import { capitalCase } from 'change-case';

  import * as styles from './index.css';

  export let open = false;
  export let onClose: () => void;
  export let hero;
  export let userHero;
  export let gearType;

  let userHeroGrade = userHero?.equip?.[gearType] ?? 1;

  const onSubmit = () => {
    addOrUpdateHeroGear(hero.id, gearType, userHeroGrade);
    onClose?.();
  };

  const onRemove = () => {
    removeHeroGear(hero.id, gearType);
    onClose?.();
  };

  const reset = () => {
    userHeroGrade = userHero?.equip?.[gearType] ?? 1;
  };

  $: open && reset();
</script>

{#if open}
  <Portal>
    <Modal {onClose} footerJustifyContent="flex-end" shouldCloseOnOverlay={false}>
      <slot slot="header">
        <Heading textAlign="center">{capitalCase(gearType)}</Heading>
      </slot>
      <slot slot="content">
        <div class={styles.contentContainer}>
          <div class={styles.gradeContainer}>
            <InputGrade bind:grade={userHeroGrade} />
          </div>
        </div></slot
      >
      <slot slot="footer">
        <Button variant="secondary" on:click={onClose}>
          <Text color="white" as="span">Cancel</Text>
        </Button>
        <Button variant="danger" on:click={onRemove}>
          <Text color="white" as="span">Remove</Text>
        </Button>
        <Button variant="success" on:click={onSubmit}>
          <Text color="white" as="span">Save</Text>
        </Button>
      </slot>
    </Modal>
  </Portal>
{/if}
