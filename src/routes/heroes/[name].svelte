<script lang="ts">
  import HeroPage from '$lib/modules/hero/page/index.svelte';

  export let hero;
  export let heroUserData;
</script>

<HeroPage {hero} {heroUserData} />
