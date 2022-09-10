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
    if (!$session.user) return;
    await supabaseClient.auth.api.getUser($session.accessToken);
    const { data } = await supabaseClient.from('profiles').select();

    loadedData = data;
    isProfileLoaded = true;
  }

  const validateUserProfileData = async () => {
    if (!$session.user) return;
    if (loadedData.length === 0) {
      // save a default profile based on the user current data
      try {
        // double check if user already have a profile registered
        const { data: profilesCount } = await supabaseClient
          .from('profiles')
          .select('*', { count: 'exact' });
        if (profilesCount.length > 0) return;
        await supabaseClient.from('profiles').insert([
          {
            name: 'Default',
            encoded_data: $user,
            user_id: $session.user.id,
          },
        ]);
      } catch (error) {}
    } else {
      let selectedProfile = loadedData[0];

      if ($profilesStore?.selectedProfile) {
        let profileFromLocalStorage = loadedData.find(
          (profile) => profile.id === $profilesStore.selectedProfile.id
        );

        if (profileFromLocalStorage) selectedProfile = profileFromLocalStorage;
      }

      updateSelectedProfile(selectedProfile);
      loadFromZipson(selectedProfile.encoded_data);
      isProfileFirstLoaded = true;
    }
  };

  const updateUserData = async () => {
    const { id } = $profilesStore?.selectedProfile;
    if (!id) return;
    try {
      await supabaseClient
        .from('profiles')
        .update({ encoded_data: userData, updated_at: new Date().toISOString() })
        .match({ id });
    } catch (error) {}
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

  // TODO: change userData when profile changes
  // going to work when user can add more profiles
  // profilesStore.subscribe((value) => {
  // console.log({ profilesStore: value });
  // });

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
