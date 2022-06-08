<script>
  import * as styles from './index.css';

  export let name;
</script>

<img loading="lazy" src={`images/heroes/${name}.png`} alt={name} title={name} class={styles.img} />
