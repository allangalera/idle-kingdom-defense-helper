<script lang="ts">
  import * as styles from './index.css';

  export let value;
  export let min;
  export let max;

  let sliderWidth = Math.max(((+value - min) * 100) / (max - min), 0);

  const calculateSliderWidth = () => {
    sliderWidth = Math.max(((+value - min) * 100) / (max - min), 0);
  };

  $: (value || min || max) && calculateSliderWidth();
</script>

<input
  class={styles.input}
  type="range"
  style={`background-size: ${sliderWidth}%`}
  {value}
  on:input={(e) => (value = e.currentTarget.value)}
  {min}
  {max}
  step={1}
/>
