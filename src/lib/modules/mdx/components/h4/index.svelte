<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';

  export let id;
</script>

<Heading as="h4" marginBottom={4} fontSize="lg" {id}><slot /></Heading>
