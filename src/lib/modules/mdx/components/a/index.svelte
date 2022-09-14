<script lang="ts">
  import Link from '$lib/components/Link/index.svelte';

  export let href;

  let target = '_self';

  const getTargetValue = () => {
    try {
      const urlData = new URL(href);
      if (urlData.host !== window.location.host) {
        target = '_blank';
      }
    } catch (err) {
      // error
    }
  };

  $: href && getTargetValue();
</script>

<Link {href} {target}>
  <slot />
</Link>
