<script context="module">
  import h1 from '$lib/modules/mdx/components/h1/index.svelte';
  import h2 from '$lib/modules/mdx/components/h2/index.svelte';
  import h3 from '$lib/modules/mdx/components/h3/index.svelte';
  import h4 from '$lib/modules/mdx/components/h4/index.svelte';
  import h5 from '$lib/modules/mdx/components/h5/index.svelte';
  import h6 from '$lib/modules/mdx/components/h6/index.svelte';
  import ul from '$lib/modules/mdx/components/ul/index.svelte';
  import ol from '$lib/modules/mdx/components/ol/index.svelte';
  import p from '$lib/modules/mdx/components/p/index.svelte';
  import a from '$lib/modules/mdx/components/a/index.svelte';
  import hr from '$lib/modules/mdx/components/hr/index.svelte';
  import th from '$lib/modules/mdx/components/th/index.svelte';
  import td from '$lib/modules/mdx/components/td/index.svelte';
  import tr from '$lib/modules/mdx/components/tr/index.svelte';
  import table from '$lib/modules/mdx/components/table/index.svelte';
  import code from '$lib/modules/mdx/components/code/index.svelte';
  import img from '$lib/modules/mdx/components/img/index.svelte';

  export { h1, h2, h3, h4, h5, h6, p, ul, ol, a, hr, th, td, tr, table, code, img };
</script>

<script lang="ts">
  import * as styles from './index.css';
</script>

<div class={styles.container}>
  <slot />
</div>
