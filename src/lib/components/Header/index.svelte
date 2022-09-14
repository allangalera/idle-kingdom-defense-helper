<script>
  import { session } from '$app/stores';
  import * as styles from './index.css';
  import { theme as themeStore, ThemeOptions } from '$lib/shared/stores/theme';
  import Heading from '$lib/components/Heading/index.svelte';
  import Toggle from '$lib/components/Toggle/index.svelte';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import Tooltip from '$lib/components/Tooltip/index.svelte';
  import ModalLogin from '$lib/components/ModalLogin/index.svelte';
  import ModalAddProfile from '$lib/components/ModalAddProfile/index.svelte';
  import Button from '$lib/components/Button/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import Dropdown from '$lib/components/Dropdown/index.svelte';
  import { user } from '$lib/shared/stores/user/index';
  import FiMoon from 'svelte-icons-pack/fi/FiMoon';
  import FiSun from 'svelte-icons-pack/fi/FiSun';
  import RiUserUserSettingsLine from 'svelte-icons-pack/ri/RiUserUserSettingsLine';

  import { theme } from '$lib/styles/themes/index.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  import { onMount } from 'svelte';
  import { profilesStore, updateSelectedProfile } from '$lib/shared/stores/user/profiles';
  import { clearUserLocalData } from '$lib/shared/stores/user';
  import { goto } from '$app/navigation';
  import { supabaseClient } from '$lib/supabaseClient';

  let checked = false;
  let isModalLoginOpen = false;
  let isModalAddProfileOpen = false;
  let isSaveOnCooldown = false;

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

  // const onOpenModalAddProfile = () => {
  //   isModalAddProfileOpen = true;
  // };

  const onCloseModalAddProfile = () => {
    isModalAddProfileOpen = false;
  };

  const updateUserData = async () => {
    const { id } = $profilesStore?.selectedProfile;
    if (!id) return;
    isSaveOnCooldown = true;
    try {
      const { data } = await supabaseClient
        .from('profiles')
        .update({ encoded_data: $user, updated_at: new Date().toISOString() })
        .eq('id', id)
        .single();
      updateSelectedProfile(data);
    } catch (error) {
      // error
    } finally {
      setTimeout(() => {
        isSaveOnCooldown = false;
      }, 30 * 1000);
    }
  };

  const onLogout = () => {
    clearUserLocalData();
    updateSelectedProfile(null);
    goto('/api/auth/logout');
  };

  supabaseClient.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') onLogout();
  });

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
      <Dropdown>
        <Button>
          <Icon
            className={sprinkles({
              size: 6,
            })}
            src={RiUserUserSettingsLine}
            color={theme.themeColors.text.default}
            size={theme.sizes[6]}
          /></Button
        >
        <svelte:fragment slot="tooltip-content">
          <div
            class={sprinkles({
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            })}
          >
            <div
              class={sprinkles({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              })}
            >
              <Text>Theme</Text>
              <div
                class={sprinkles({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                })}
              >
                <Icon src={FiSun} color={theme.themeColors.text.default} />
                <Toggle bind:checked on:change={onChange} />
                <Icon src={FiMoon} color={theme.themeColors.text.default} />
              </div>
            </div>
            <hr
              class={sprinkles({
                width: 'full',
              })}
            />
            {#if $session?.user?.id}
              <Text>{$session.user.email}</Text>
              <Button on:click={onLogout}>
                <Text color="white" textAlign="center">Sign out</Text></Button
              >
            {:else}
              <Button on:click={onOpenModalLogin}>
                <Text color="white" textAlign="center">Login</Text>
              </Button>
            {/if}
            {#if $session.user}
              <hr
                class={sprinkles({
                  width: 'full',
                })}
              />
              <Text>Latest change saved</Text>
              <Text>{new Date($profilesStore?.selectedProfile?.updated_at).toLocaleString()}</Text>
              <Tooltip>
                <Button on:click={updateUserData} width="full" disabled={isSaveOnCooldown}>
                  <Text color="white" textAlign="center">Save data</Text>
                </Button>
                <svelte:fragment slot="tooltip-content">
                  <Text>You can only save every 30 seconds</Text>
                </svelte:fragment>
              </Tooltip>
            {/if}
          </div>
        </svelte:fragment>
      </Dropdown>
    </div>
  </div>
</header>

<ModalLogin open={isModalLoginOpen} onClose={onCloseModalLogin} />
<ModalAddProfile open={isModalAddProfileOpen} onClose={onCloseModalAddProfile} />
