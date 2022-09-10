<script>
  import { session } from '$app/stores';
  import * as styles from './index.css';
  import { theme as themeStore, ThemeOptions } from '$lib/shared/stores/theme';
  import Heading from '$lib/components/Heading/index.svelte';
  import Toggle from '$lib/components/Toggle/index.svelte';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import ModalLogin from '$lib/components/ModalLogin/index.svelte';
  import ModalAddProfile from '$lib/components/ModalAddProfile/index.svelte';
  import Button from '$lib/components/Button/index.svelte';
  import Link from '$lib/components/Link/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import Dropdown from '$lib/components/Dropdown/index.svelte';
  import FiMoon from 'svelte-icons-pack/fi/FiMoon';
  import FiSun from 'svelte-icons-pack/fi/FiSun';

  import { theme } from '$lib/styles/themes/index.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { onMount } from 'svelte';
  import { updateSelectedProfile } from '$lib/shared/stores/user/profiles';
  import { clearUserLocalData } from '$lib/shared/stores/user';
  import { goto } from '$app/navigation';

  let checked = false;
  let isModalLoginOpen = false;
  let isModalAddProfileOpen = false;
  let profiles = [];

  function onChange(e) {
    // checked = e.target.checked;
    themeStore.set(
      e.target.checked
        ? {
            theme: ThemeOptions.dark,
            isForced: true,
          }
        : {
            theme: ThemeOptions.light,
            isForced: true,
          }
    );
  }

  onMount(() => {
    checked = $themeStore.theme === ThemeOptions.dark;
  });

  const onOpenModalLogin = () => {
    isModalLoginOpen = true;
  };

  const onCloseModalLogin = () => {
    isModalLoginOpen = false;
  };

  const onOpenModalAddProfile = () => {
    isModalAddProfileOpen = true;
  };

  const onCloseModalAddProfile = () => {
    isModalAddProfileOpen = false;
  };

  const onLogout = () => {
    clearUserLocalData();
    updateSelectedProfile(null);
    goto('/api/auth/logout');
  };

  $: checked = $themeStore.theme === ThemeOptions.dark;
</script>

<header
  class={[
    styles.header,
    sprinkles({
      background: 'gray1',
    }),
  ].join(' ')}
>
  <div class={styles.container}>
    <div class={styles.middle}>
      <Heading fontSize={{ sm: '2xl', md: '4xl' }}>IKD Helper</Heading>
    </div>
    <div class={styles.right}>
      <Icon src={FiSun} color={theme.themeColors.text.default} />
      <Toggle bind:checked on:change={onChange} />
      <Icon src={FiMoon} color={theme.themeColors.text.default} />
      {#if $session?.user?.id}
        <Dropdown>
          <Button>
            <Text color="white" textAlign="center">View profile</Text></Button
          >
          <svelte:fragment slot="tooltip-content">
            <Text>{$session.user.email}</Text>
            <!-- <Text>Profiles:</Text>
            {#if profiles.length === 0}
              <Text>No profile</Text>
              <Button on:click={onOpenModalAddProfile}>
                <Text color="white" textAlign="center">Create profile</Text></Button
              >
            {/if} -->
            <Button on:click={onLogout}>
              <Text color="white" textAlign="center">Sign out</Text></Button
            >
          </svelte:fragment>
        </Dropdown>
      {:else}
        <Button on:click={onOpenModalLogin}>
          <Text color="white" textAlign="center">Login</Text>
        </Button>
      {/if}
    </div>
  </div>
</header>

<ModalLogin open={isModalLoginOpen} onClose={onCloseModalLogin} />
<ModalAddProfile open={isModalAddProfileOpen} onClose={onCloseModalAddProfile} />
