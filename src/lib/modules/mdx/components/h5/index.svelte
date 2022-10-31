<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';

  export let id;
</script>

<Heading as="h5" marginBottom={4} fontSize="base" {id}><slot /></Heading>
