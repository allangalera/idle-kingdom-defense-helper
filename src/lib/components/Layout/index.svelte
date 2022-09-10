<script>
  import * as styles from './index.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  export let theme;
  import { supabaseClient } from '$lib/supabaseClient';
  import { session } from '$app/stores';
  import { loadFromZipson, user } from '$lib/shared/stores/user/index';
  import { updateSelectedProfile, profilesStore } from '$lib/shared/stores/user/profiles';
  import { onDestroy } from 'svelte';
  import debounce from 'lodash.debounce';

  let loadedData = [];
  let isProfileLoaded = false;
  let isProfileFirstLoaded = false;
  let userData;

  async function loadData() {
    await supabaseClient.auth.api.getUser($session.accessToken);
    const { data } = await supabaseClient.from('profiles').select();

    loadedData = data;
    isProfileLoaded = true;
  }

  const validateUserProfileData = async () => {
    console.log('validateUserProfileData');
    if (!$session.user) return;
    if (loadedData.length === 0) {
      console.log('try to save current token on default profile');
      try {
        await supabaseClient.from('profiles').insert([
          {
            name: 'Default',
            encoded_data: $user,
            user_id: $session.user.id,
          },
        ]);
      } catch (error) {}
    } else {
      console.log('now there is a profile created');
      let selectedProfile = loadedData[0];
      if ($profilesStore?.selectedProfile) {
        selectedProfile = loadedData.find(
          (profile) => profile.id === $profilesStore.selectedProfile.id
        );
        console.log('existing profile', selectedProfile.id);
      } else {
        updateSelectedProfile(selectedProfile);
      }

      loadFromZipson(selectedProfile.encoded_data);
      isProfileFirstLoaded = true;
    }
  };

  const updateUserData = async () => {
    console.log('updateUserData');
    const { id } = $profilesStore?.selectedProfile;
    if (!id) return;
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .update({ encoded_data: userData })
        .match({ id });
      console.log({ data, error });
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedUpdateUserData = debounce(updateUserData, 10 * 1000);

  const userSubscriber = user.subscribe((value) => {
    userData = value;
    if (!isProfileFirstLoaded) return;
    debouncedUpdateUserData();
  });

  session.subscribe((value) => {
    if (value) {
      loadData();
    }
  });

  profilesStore.subscribe((value) => {
    console.log({ profilesStore: value });
  });

  onDestroy(() => {
    userSubscriber();
  });

  $: loadedData && isProfileLoaded && validateUserProfileData();
</script>

<div
  class={[
    styles.container,
    theme,
    sprinkles({
      background: 'gray1',
    }),
  ].join(' ')}
>
  <slot />
</div>
