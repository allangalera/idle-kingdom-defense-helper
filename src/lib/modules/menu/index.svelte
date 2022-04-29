<script lang="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Drawer from '$lib/components/Drawer/index.svelte';
  import ModalLoadFromToken from '$lib/components/ModalLoadFromToken/index.svelte';
  import Portal from '$lib/components/Portal/index.svelte';
  import Body from '$lib/modules/menu/components/Body/index.svelte';
  import Container from '$lib/modules/menu/components/Container/index.svelte';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { theme } from '$lib/styles/themes/index.css';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import RiSystemMenu3Line from 'svelte-icons-pack/ri/RiSystemMenu3Line';

  import * as styles from './index.css';

  let menuOpen = false;
  let isModalLoadFromToken = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  const onMenuClose = () => {
    menuOpen = false;
  };

  const onOpenModalLoadFromToken = () => {
    onMenuClose();
    isModalLoadFromToken = true;
  };
</script>

<Container>
  <Body onModalOpen={onOpenModalLoadFromToken} disableCloseButton />
</Container>

<div
  class={[
    styles.buttoContainer,
    sprinkles({
      display: {
        lg: 'block',
        xl: 'none',
      },
    }),
  ].join(' ')}
  on:click={toggleMenu}
>
  <Button>
    <Icon className={styles.menuIcon} src={RiSystemMenu3Line} color={theme.colors.white} />
  </Button>
</div>
{#if menuOpen}
  <Portal>
    <div
      class={sprinkles({
        display: {
          lg: 'block',
          xl: 'none',
        },
      })}
    >
      <Drawer onCloseOnOverlay={onMenuClose}>
        <Body {onMenuClose} onModalOpen={onOpenModalLoadFromToken} />
      </Drawer>
    </div>
  </Portal>
{/if}

<ModalLoadFromToken
  open={isModalLoadFromToken}
  onClose={() => {
    isModalLoadFromToken = false;
  }}
/>
