<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';

  export let id;
</script>

<Heading as="h6" marginBottom={4} fontSize="sm" {id}><slot /></Heading>
