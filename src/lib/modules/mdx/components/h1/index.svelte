<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';

  export let id: string = null;
</script>

<Heading as="h1" marginBottom={4} fontSize="4xl" {id}><slot /></Heading>
