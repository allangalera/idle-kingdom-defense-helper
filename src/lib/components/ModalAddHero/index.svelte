<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Heading from '$lib/components/Heading/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import InputGrade from '$lib/components/InputGrade/index.svelte';
  import Modal from '$lib/components/Modal/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { MAX_HERO_LEVEL, type HeroType, type UserHero } from '$lib/db/heroes';
  import { addOrUpdateHero } from '$lib/shared/stores/user/heroes';

  import * as styles from './index.css';

  export let open = false;
  export let onClose: () => void;
  export let hero: HeroType;
  export let userHero: UserHero | null | undefined = null;

  let userHeroGrade = userHero?.grade || hero.baseGrade;
  let userHeroLevel: string = userHero?.level?.toString() || '1';

  const onSubmit = () => {
    addOrUpdateHero({
      id: hero.id,
      level: +userHeroLevel,
      grade: userHeroGrade,
    });
    onClose?.();
  };

  const updateUserHeroData = (userHeroUpdatedData: UserHero | null | undefined) => {
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
							max: MAX_HERO_LEVEL
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
