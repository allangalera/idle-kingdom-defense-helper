<script>
  export let name;
</script>

<img
  loading="lazy"
  src={`images/heroes/${name}.png`}
  alt={name}
  style="vertical-align:middle;"
  title={name}
  height="50rem"
  width="auto"
/>
