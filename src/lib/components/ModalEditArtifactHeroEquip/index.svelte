<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Select from '$lib/components/Select/index.svelte';
  import SelectButtons from '$lib/components/SelectButtons/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { abilitiesIdsAllowed, artifacts } from '$lib/db/artifacts';
  import {
    addOrUpdateHeroArtifact,
    addOrUpdateHeroGear,
    removeHeroArtifact,
    removeHeroGear,
  } from '$lib/shared/stores/user/heroes';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { returnAbilityName } from '$lib/utils/abilities';
  import type { Abilities } from '$lib/utils/abilities';
  import * as R from 'remeda';

  import * as styles from './index.css';

  export let open = false;
  export let onClose: () => void;
  export let hero;
  export let userHero;
  export let artifactSlot: 'left' | 'right';

  let title;

  const initialArtifactData = {
    type: 1,
    grade: 1,
    enhancementLevel: '1',
    abilities: {
      1: {
        type: abilitiesIdsAllowed[0],
        level: 0,
      },
      2: {
        type: abilitiesIdsAllowed[0],
        level: 0,
      },
      3: {
        type: abilitiesIdsAllowed[0],
        level: 0,
      },
      4: {
        type: abilitiesIdsAllowed[0],
        level: 0,
      },
    },
  };

  let userHeroArtifactData = userHero?.artifacts?.[artifactSlot] ?? R.clone(initialArtifactData);

  const onSubmit = () => {
    addOrUpdateHeroArtifact(hero.id, artifactSlot, userHeroArtifactData);
    onClose?.();
  };

  const onRemove = () => {
    removeHeroArtifact(hero.id, artifactSlot);
    onClose?.();
  };

  const reset = () => {
    userHeroArtifactData = userHero?.artifacts?.[artifactSlot] ?? R.clone(initialArtifactData);
  };

  const artifactTypeOptions = artifacts.map((item) => ({ name: item.name, value: item.id }));

  const abilitiesOptions = abilitiesIdsAllowed.map((ability) => {
    return {
      name: returnAbilityName(ability as Abilities),
      value: ability,
    };
  });

  $: open && reset();
  $: title = artifactSlot === 'left' ? 'Artifact Left Slot' : 'Artifact Right Slot';
</script>

{#if open}
  <Portal>
    <Modal {onClose} footerJustifyContent="flex-end" shouldCloseOnOverlay={false}>
      <svelte:fragment slot="header">
        <Heading textAlign="center">{title}</Heading>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div
          class={sprinkles({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 4,
          })}
        >
          <SelectButtons bind:value={userHeroArtifactData.type} options={artifactTypeOptions} />
          <InputGrade bind:grade={userHeroArtifactData.grade} />
          <Input
            textAlign="center"
            label="Enchantment Level"
            bind:value={userHeroArtifactData.enhancementLevel}
            maskOptions={{
              mask: Number,
              min: 0,
            }}
          />
          <div>
            <Text textAlign="center">First ability</Text>
            <div class={styles.abilityContainer}>
              <Select
                label="Name"
                textAlign="center"
                bind:value={userHeroArtifactData.abilities[1].type}
                options={abilitiesOptions}
              />
              <Input
                textAlign="center"
                label="Level"
                bind:value={userHeroArtifactData.abilities[1].level}
                maskOptions={{
                  mask: Number,
                  min: 0,
                }}
              />
            </div>
          </div>
          <div>
            <Text textAlign="center">Second ability</Text>
            <div class={styles.abilityContainer}>
              <Select
                label="Name"
                textAlign="center"
                bind:value={userHeroArtifactData.abilities[2].type}
                options={abilitiesOptions}
              />
              <Input
                textAlign="center"
                label="Level"
                bind:value={userHeroArtifactData.abilities[2].level}
                maskOptions={{
                  mask: Number,
                  min: 0,
                }}
              />
            </div>
          </div>
          <div>
            <Text textAlign="center">Third ability</Text>
            <div class={styles.abilityContainer}>
              <Select
                label="Name"
                textAlign="center"
                bind:value={userHeroArtifactData.abilities[3].type}
                options={abilitiesOptions}
              />
              <Input
                textAlign="center"
                label="Level"
                bind:value={userHeroArtifactData.abilities[3].level}
                maskOptions={{
                  mask: Number,
                  min: 0,
                }}
              />
            </div>
          </div>
          <div>
            <Text textAlign="center">Fourth ability</Text>
            <div class={styles.abilityContainer}>
              <Select
                label="Name"
                textAlign="center"
                bind:value={userHeroArtifactData.abilities[4].type}
                options={abilitiesOptions}
              />
              <Input
                textAlign="center"
                label="Level"
                bind:value={userHeroArtifactData.abilities[4].level}
                maskOptions={{
                  mask: Number,
                  min: 0,
                }}
              />
            </div>
          </div>
        </div>
      </svelte:fragment>
      <svelte:fragment slot="footer">
        <Button variant="secondary" on:click={onClose}>
          <Text color="white" as="span">Cancel</Text>
        </Button>
        <Button variant="danger" on:click={onRemove}>
          <Text color="white" as="span">Remove</Text>
        </Button>
        <Button variant="success" on:click={onSubmit}>
          <Text color="white" as="span">Save</Text>
        </Button>
      </svelte:fragment>
    </Modal>
  </Portal>
{/if}
