<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';

  export let id;
</script>

<Heading as="h2" marginBottom={4} fontSize="3xl" {id}><slot /></Heading>
