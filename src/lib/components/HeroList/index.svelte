<script>
	import { container } from './index.css';
	import Hero from '$lib/components/Hero/index.svelte';
	export let heroList;
</script>

<div class={container}>
	{#each heroList as hero}
		<Hero {hero} />
	{/each}
</div>
