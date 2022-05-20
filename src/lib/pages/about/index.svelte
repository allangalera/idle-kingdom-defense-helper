<script lang="ts">
  import Heading from '$lib/components/Heading/index.svelte';
  import Text from '$lib/components/Text/index.svelte';

  import * as styles from './index.css';
</script>

<Heading fontSize="3xl" textAlign="center">About</Heading>
<div class={styles.container}>
  <Text textAlign="center"
    >This is a fan made website. Initially, I made this for me to make it easier to do some
    calculations and then I started adding a few things people suggested. So it became a collective
    website made with the help of everyone that pointed out a mistake or asked for a feature.</Text
  >
  <Text textAlign="center">
    Thanks to everyone in the discord server for always being nice providing feedback and to discuss
    theories.
  </Text>
  <Text textAlign="center"
    >I want to give a special thanks to Mysterion for continuously being resourceful and helpful. He
    is the main reason I can keep everything updated fast.</Text
  >
  <Text textAlign="center"
    >And all of this was possible, of course, because StormX made an amazing and fun game.</Text
  >
</div>
