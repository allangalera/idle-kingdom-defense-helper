<script>
  import * as styles from './index.css';
  import { sprinkles } from '$lib/styles/sprinkles.css';
  export let theme;
  import { supabaseClient } from '$lib/supabaseClient';
  import { session } from '$app/stores';
  import Text from '$lib/components/Text/index.svelte';
  import { loadFromZipson, user } from '$lib/shared/stores/user/index';
  import { updateSelectedProfile, profilesStore } from '$lib/shared/stores/user/profiles';
  import { onDestroy } from 'svelte';
  import debounce from 'lodash.debounce';

  let profiles = [];
  let isProfileLoaded = false;
  let isProfileFirstLoaded = false;
  let isProfileSaveError = false;
  let isProfileSaveSuccess = false;
  let isProfileBeginSaved = false;
  let isProfileChanged = false;
  let userData;

  async function loadData() {
    if (!$session.user) return;
    await supabaseClient.auth.api.getUser($session.accessToken);
    const { data } = await supabaseClient.from('profiles').select();

    profiles = data;
    isProfileLoaded = true;
  }

  const validateUserProfileData = async () => {
    if (!$session.user) return;
    if (profiles.length === 0) {
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
      let selectedProfile = profiles[0];

      if ($profilesStore?.selectedProfile) {
        let profileFromLocalStorage = profiles.find(
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
    isProfileSaveError = false;
    isProfileSaveSuccess = false;
    try {
      isProfileBeginSaved = true;
      const { data } = await supabaseClient
        .from('profiles')
        .update({ encoded_data: userData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .single();
      updateSelectedProfile(data);
      isProfileSaveSuccess = true;
    } catch (error) {
      isProfileSaveError = true;
    } finally {
      isProfileBeginSaved = false;
      isProfileChanged = false;
    }
  };

  const debouncedUpdateUserData = debounce(updateUserData, 10 * 1000);

  const userSubscriber = user.subscribe((value) => {
    userData = value;
    if (!isProfileFirstLoaded) return;
    isProfileChanged = true;
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

  $: profiles && isProfileLoaded && validateUserProfileData();
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
  {#if $session.user}
    <div class={styles.dataToBeSavedContainer}>
      <Text>
        {#if isProfileBeginSaved}
          Saving . . .
        {:else if isProfileSaveError}
          Data was not saved :(
        {:else if isProfileChanged}
          Data to be saved.
        {:else}
          All changes saved.
        {/if}
      </Text>
    </div>
  {/if}
</div>
