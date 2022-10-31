<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';

  export let id;
</script>

<Heading as="h3" marginBottom={4} fontSize="xl" {id}><slot /></Heading>
