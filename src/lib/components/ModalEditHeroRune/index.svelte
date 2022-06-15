<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import RuneIcon from '$lib/components/RuneIcon/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_RUNE_ENCHANT_LEVEL } from '$lib/db/runes';
  import { addOrUpdateHeroRune, removeHeroRune } from '$lib/shared/stores/user/heroes';
  import { returnAttributeName } from '$lib/utils/hero';
  import { returnRuneAttribute } from '$lib/utils/runes';

  import * as styles from './index.css';

  export let open = false;
  export let onClose: () => void;
  export let hero;
  export let userHero;
  export let rune;

  let enchantLevel = '0';
  let abilityMin = 0;
  let abilityMax = 0;
  let ability = '0';

  const onSubmit = () => {
    addOrUpdateHeroRune(hero.id, {
      id: rune.id,
      enchant: +enchantLevel,
      value: +ability,
    });
    onClose?.();
  };

  const onRemove = () => {
    removeHeroRune(hero.id, rune.id);
    onClose?.();
  };

  const initialValues = () => {
    if (rune) {
      enchantLevel = userHero?.runes?.[rune.id]?.enchant?.toString() ?? '0';
      abilityMin = rune && rune.abilityInitMin + rune.abilityIncMin * +enchantLevel;
      abilityMax = rune && rune.abilityInitMax + rune.abilityIncMax * +enchantLevel;
      ability = userHero?.runes?.[rune.id]?.value?.toString?.() ?? abilityMin?.toString();
    }
  };

  const update = () => {
    if (rune) {
      abilityMin = rune && rune.abilityInitMin + rune.abilityIncMin * +enchantLevel;
      abilityMax = rune && rune.abilityInitMax + rune.abilityIncMax * +enchantLevel;
      ability = Math.max(userHero?.runes?.[rune.id]?.value ?? 0, abilityMin).toString();
    }
  };

  $: rune && initialValues();
  $: enchantLevel && update();
</script>

{#if open}
  <Portal>
    <Modal {onClose} footerJustifyContent="flex-end" shouldCloseOnOverlay={false}>
      <slot slot="header">
        <Heading textAlign="center">Rune</Heading>
      </slot>
      <slot slot="content">
        <div class={styles.contentContainer}>
          <RuneIcon grade={rune.grade} abilityType={rune.abilityType} />
          <Text>{returnAttributeName(returnRuneAttribute(rune.abilityType))}</Text>
          <Input
            textAlign="center"
            label="Enchant Level"
            bind:value={enchantLevel}
            maskOptions={{
              mask: Number,
              min: 0,
              max: MAX_RUNE_ENCHANT_LEVEL,
            }}
          />
          <Text>Ability minimum: {abilityMin}</Text>
          <Text>Ability maximum: {abilityMax}</Text>
          <Input
            textAlign="center"
            label="Ability Level"
            bind:value={ability}
            maskOptions={{
              mask: Number,
              min: 0,
              max: abilityMax,
            }}
          />
        </div></slot
      >
      <slot slot="footer">
        <Button variant="secondary" on:click={onClose}>
          <Text as="span">Cancel</Text>
        </Button>
        <Button variant="danger" on:click={onRemove}>
          <Text color="white" as="span">Remove</Text>
        </Button>
        <Button
          variant="success"
          on:click={onSubmit}
          disabled={+ability < abilityMin || +ability > abilityMax}
        >
          <Text color="white" as="span">Save</Text>
        </Button>
      </slot>
    </Modal>
  </Portal>
{/if}
