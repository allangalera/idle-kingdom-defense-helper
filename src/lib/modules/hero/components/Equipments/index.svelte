<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import CardArtifact from '$lib/components/CardArtifact/index.svelte';
	import CardBorder from '$lib/components/CardBorder/index.svelte';
	import CardGear from '$lib/components/CardGear/index.svelte';
	import GridItem from '$lib/components/GridItem/index.svelte';
	import ModalEditArtifactHeroEquip from '$lib/components/ModalEditArtifactHeroEquip/index.svelte';
	import ModalEditHeroEquip from '$lib/components/ModalEditHeroEquip/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { HeroGearEquip } from '$lib/types/enums';
	import { convertGradeToStarLevel } from '$lib/utils';
	import * as styles from './index.css';
	import { capitalCase } from 'change-case';

	export let hero;
	export let heroUserData;

	let isModalOpen = false;
	let isModalArtifactOpen = false;
	let selectedGearType;
	let selectedArtifactSlot;

	const openModal = (gearType) => {
		if (!heroUserData) return false;
		selectedGearType = gearType;
		isModalOpen = true;
	};

	const openArtifactModal = (slot) => {
		if (!heroUserData) return false;
		selectedArtifactSlot = slot;
		isModalArtifactOpen = true;
	};
</script>

<GridItem title="Equipment">
	<div class={styles.container}>
		<div class={styles.itemContainer}>
			<Text textAlign="center">{capitalCase(HeroGearEquip.weapon)}</Text>
			<Button variant="logic" on:click={() => openModal(HeroGearEquip.weapon)}>
				{#if heroUserData?.equip?.weapon}
					<CardGear
						gearType={{
							type: 'hero',
							equip: HeroGearEquip.weapon,
							...convertGradeToStarLevel(heroUserData.equip.weapon),
						}}
					/>
				{:else}
					<CardBorder />
				{/if}
			</Button>
		</div>
		<div class={styles.itemContainer}>
			<Text textAlign="center">{capitalCase(HeroGearEquip.helmet)}</Text>
			<Button variant="logic" on:click={() => openModal(HeroGearEquip.helmet)}>
				{#if heroUserData?.equip?.helmet}
					<CardGear
						gearType={{
							type: 'hero',
							equip: HeroGearEquip.helmet,
							...convertGradeToStarLevel(heroUserData.equip.helmet),
						}}
					/>
				{:else}
					<CardBorder />
				{/if}
			</Button>
		</div>
		<div class={styles.itemContainer}>
			<Text textAlign="center">{capitalCase(HeroGearEquip.chest)}</Text>
			<Button variant="logic" on:click={() => openModal(HeroGearEquip.chest)}>
				{#if heroUserData?.equip?.chest}
					<CardGear
						gearType={{
							type: 'hero',
							equip: HeroGearEquip.chest,
							...convertGradeToStarLevel(heroUserData.equip.chest),
						}}
					/>
				{:else}
					<CardBorder />
				{/if}
			</Button>
		</div>
		<div class={styles.itemContainer}>
			<Text textAlign="center">{capitalCase(HeroGearEquip.boots)}</Text>
			<Button variant="logic" on:click={() => openModal(HeroGearEquip.boots)}>
				{#if heroUserData?.equip?.boots}
					<CardGear
						gearType={{
							type: 'hero',
							equip: HeroGearEquip.boots,
							...convertGradeToStarLevel(heroUserData.equip.boots),
						}}
					/>
				{:else}
					<CardBorder />
				{/if}
			</Button>
		</div>
		<div class={styles.itemContainer}>
			<Text textAlign="center">Artifact Left Slot</Text>
			<Button variant="logic" on:click={() => openArtifactModal('left')}>
				{#if heroUserData?.artifacts?.left}
					<CardArtifact artifactData={heroUserData.artifacts.left} />
				{:else}
					<CardBorder />
				{/if}
			</Button>
		</div>
		<div class={styles.itemContainer}>
			<Text textAlign="center">Artifact Right Slot</Text>
			<Button variant="logic" on:click={() => openArtifactModal('right')}>
				{#if heroUserData?.artifacts?.right}
					<CardArtifact artifactData={heroUserData.artifacts.right} />
				{:else}
					<CardBorder />
				{/if}
			</Button>
		</div>
	</div>
</GridItem>

<ModalEditHeroEquip
	open={isModalOpen}
	onClose={() => {
		isModalOpen = false;
	}}
	gearType={selectedGearType}
	{hero}
	userHero={heroUserData}
/>

<ModalEditArtifactHeroEquip
	open={isModalArtifactOpen}
	onClose={() => {
		isModalArtifactOpen = false;
	}}
	{hero}
	userHero={heroUserData}
	artifactSlot={selectedArtifactSlot}
/>
