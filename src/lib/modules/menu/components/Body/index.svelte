<script lang="ts">
  import DrawerBody from '$lib/components/DrawerBody/index.svelte';
  import Content from '$lib/modules/menu/components/Content/index.svelte';
  import Footer from '$lib/modules/menu/components/Footer/index.svelte';
  import Header from '$lib/modules/menu/components/Header/index.svelte';

  export let onModalOpen = () => void 0;
  export let onMenuClose = () => void 0;
  export let disableCloseButton = false;
</script>

<DrawerBody onClose={!disableCloseButton && onMenuClose}>
  <slot slot="header">
    <Header />
  </slot>
  <slot slot="content">
    <Content {onMenuClose} />
  </slot>
  <slot slot="footer">
    <Footer {onModalOpen} />
  </slot>
</DrawerBody>
