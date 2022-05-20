<script lang="ts">
  import Link from '$lib/components/Link/index.svelte';

  import * as styles from './index.css';
</script>

<nav class={styles.menu}>
  <Link href="/" fontSize="2xl">Home</Link>
  <Link href="/heroes" fontSize="2xl">Heroes</Link>
  <Link href="/heroes/tier-list" fontSize="2xl">Heroes Tier List</Link>
  <Link href="/conquest-rewards" fontSize="2xl">Conquest rewards</Link>
  <Link href="/information-and-requirements" fontSize="2xl">Info & Requirements</Link>
  <Link href="/event-dungeons" fontSize="2xl">Event Dungeons</Link>
  <Link href="/about" fontSize="2xl">About</Link>
</nav>
