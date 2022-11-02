<script lang="ts">
	import { page } from '$app/stores';
	import Text from '$lib/components/Text/index.svelte';
	import { loadFromZipson, user } from '$lib/shared/stores/user/index';
	import { updateSelectedProfile, profilesStore } from '$lib/shared/stores/user/profiles';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import { supabaseClient } from '$lib/supabaseClient';
	import * as styles from './index.css';
	import debounce from 'lodash.debounce';
	import { onDestroy } from 'svelte';

	export let theme: any;

	let profiles: any | null = [];
	let isProfileLoaded = false;
	let isProfileFirstLoaded = false;
	let isProfileSaveError = false;
	let isProfileSaveSuccess = false;
	let isProfileBeginSaved = false;
	let isProfileChanged = false;
	let userData: string;

	async function loadData() {
		if (!$page.data.session?.user) return;
		const { data } = await supabaseClient.from('profiles').select();

		profiles = data;
		isProfileLoaded = true;
	}

	$: if ($page.data.session) {
		loadData();
	}

	const validateUserProfileData = async () => {
		if (!$page.data.session?.user) return;
		if (profiles.length === 0) {
			// save a default profile based on the user current data
			try {
				// double check if user already have a profile registered
				const { data: profilesCount } = await supabaseClient
					.from('profiles')
					.select('*', { count: 'exact' });
				if (!profilesCount) return;
				if (profilesCount.length > 0) return;
				await supabaseClient.from('profiles').insert([
					{
						name: 'Default',
						encoded_data: $user,
						user_id: $page.data.session.user.id
					}
				]);
			} catch (error) {
				// error
			}
		} else {
			let selectedProfile = profiles[0];

			if ($profilesStore?.selectedProfile) {
				let profileFromLocalStorage = profiles.find(
					(profile: any) => profile.id === $profilesStore.selectedProfile.id
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
			background: 'gray1'
		})
	].join(' ')}
>
	<slot />
	{#if $page.data.session?.user}
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
