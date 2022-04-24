<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import FortressEdit from '$lib/components/FortressEdit/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { CONQUEST_FORTRESS_MAX_LEVEL } from '$lib/db/conquest';
  import {
    addFortress,
    removeFortress,
    updateFortressLevel,
  } from '$lib/shared/stores/user/conquest';
  import { theme } from '$lib/styles/themes/index.css';
  import { match } from 'oxide.ts';
  import * as R from 'remeda';
  import Icon from 'svelte-icons-pack';
  import RiDeviceSave2Fill from 'svelte-icons-pack/ri/RiDeviceSave2Fill';

  import * as styles from './index.css';

  export let open = false;
  export let onClose: () => void;
  export let kingdom;

  let title;
  let currentLevel = '1';

  const formatTitle = () => {
    const continentName = R.pathOr(kingdom, ['continent'], '');
    const kingdomName = R.pathOr(kingdom, ['name'], '');
    title = `${continentName} - ${kingdomName}`;
  };

  const bulkEditSubmit = () => {
    kingdom.fortressIds.forEach((item) => {
      if (+currentLevel) {
        addFortress({ id: item, level: +currentLevel });
        updateFortressLevel(item, +currentLevel);
      } else {
        removeFortress(item);
      }
    });
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
        <div class={styles.bulkEditContainer}>
          <div>
            <Heading textAlign="center">Bulk Edit Fortress</Heading>
            <Text textAlign="center" fontSize="xs">Set all fortress to the level selected</Text>
            <Text textAlign="center" fontSize="xs"
              >If set to 0 or empty it will remove all fortress</Text
            >
          </div>
          <div class={styles.bulkEditForm}>
            <Input
              textAlign="center"
              label="Target Level"
              bind:value={currentLevel}
              maskOptions={{
                mask: Number,
                min: 0,
                max: CONQUEST_FORTRESS_MAX_LEVEL,
              }}
            />
            <Button variant="success" on:click={bulkEditSubmit}>
              <Icon
                className={styles.buttonIcon}
                src={RiDeviceSave2Fill}
                color={theme.colors.white}
              />
            </Button>
          </div>
        </div>
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
