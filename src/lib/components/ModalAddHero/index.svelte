<script lang="ts">
  import * as styles from './index.css';
  import Portal from '$lib/components/Portal/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Button from '$lib/components/Button/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiSystemAddFill from 'svelte-icons-pack/ri/RiSystemAddFill';
  import RiSystemSubtractFill from 'svelte-icons-pack/ri/RiSystemSubtractFill';
  import { theme } from '$lib/styles/themes/index.css';
  import { addOrUpdateHero } from '$lib/shared/stores/user/heroes';

  import { MAX_HERO_LEVEL } from '$lib/constants';
  import type { Grades } from '$lib/types';
  export let open = false;
  export let onClose: VoidFunction;
  export let hero;
  export let userHero = null;

  let userHeroGrade: Grades = userHero?.grade || hero.baseGrade;
  let userHeroLevel: string = userHero?.level?.toString() || '1';

  const subtractGrade = () => {
    userHeroGrade = Math.max(userHeroGrade - 1, hero.baseGrade) as Grades;
  };
  const addGrade = () => {
    userHeroGrade = Math.min(userHeroGrade + 1, 25) as Grades;
  };

  const onSubmit = () => {
    addOrUpdateHero({
      id: hero.id,
      level: +userHeroLevel,
      grade: userHeroGrade,
    });
    onClose?.();
  };

  const updateUserHeroData = (userHeroUpdatedData) => {
    userHeroGrade = userHeroUpdatedData?.grade || hero.baseGrade;
    userHeroLevel = userHeroUpdatedData?.level?.toString() || '1';
  };

  $: updateUserHeroData(userHero);
</script>

{#if open}
  <Portal>
    <Modal {onClose} footerJustifyContent="flex-end" shouldCloseOnOverlay={false}>
      <slot slot="header">
        <Heading textAlign="center">{hero.name}</Heading>
      </slot>
      <slot slot="content">
        <div class={styles.contentContainer}>
          <div class={styles.gradeContainer}>
            <InputGrade bind:grade={userHeroGrade} />
          </div>
          <Input
            label="Level"
            maskOptions={{
              mask: Number,
              min: 1,
              max: MAX_HERO_LEVEL,
            }}
            bind:value={userHeroLevel}
          />
        </div>
      </slot>
      <slot slot="footer">
        <Button variant="danger" on:click={onClose}>
          <Text color="white" as="span">Cancel</Text>
        </Button>
        <Button variant="success" on:click={onSubmit}>
          <Text color="white" as="span">Save</Text>
        </Button>
      </slot>
    </Modal>
  </Portal>
{/if}
