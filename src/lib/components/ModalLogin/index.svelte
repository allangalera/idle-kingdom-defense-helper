<script lang="ts">
	import Button from '$lib/components/Button/index.svelte';
	import Heading from '$lib/components/Heading/index.svelte';
	import Input from '$lib/components/Input/index.svelte';
	import Modal from '$lib/components/Modal/index.svelte';
	import Portal from '$lib/components/Portal/index.svelte';
	import Text from '$lib/components/Text/index.svelte';
	import { sprinkles } from '$lib/styles/sprinkles.css';
	import type { ActionResult } from '@sveltejs/kit';

	export let open = false;
	export let onClose: () => void;

	let isLoading = false;
	let isError = false;
	let isSuccess = false;
	let message: string | undefined;
	let email: string;
	let ref: any;

	const onSubmit = async () => {
		const data = new FormData(ref);

		isLoading = true;

		const response = await fetch(ref.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = await response.json();

		isLoading = false;

		if (result.type === 'success') {
			isSuccess = true;
			message = result.data?.message;
		}

		if (result.type === 'invalid') {
			isError = true;
			message = result.data?.message;
		}
	};

	const handleClose = () => {
		if (isLoading) return;

		isError = false;
		message = undefined;
		isSuccess = false;

		onClose();
	};
</script>

{#if open}
	<Portal>
		<Modal isOpen={open} onClose={handleClose} footerJustifyContent="flex-end">
			<slot slot="header">
				<Heading textAlign="center">Sign in with a magic link</Heading>
			</slot>
			<slot slot="content">
				{#if isSuccess && message}
					<div
						class={sprinkles({
							background: 'green7',
							padding: 4,
							borderRadius: 'base'
						})}
					>
						<Text color="green12" textAlign="center">{message}</Text>
					</div>
				{:else}
					<form
						action="/auth/login"
						method="post"
						bind:this={ref}
						on:submit|preventDefault={onSubmit}
					>
						<Input
							label="E-mail"
							name="email"
							type="email"
							bind:value={email}
							disabled={isLoading}
							required
						/>
						{#if isError && message}
							<div
								class={sprinkles({
									background: 'red7',
									padding: 4,
									borderRadius: 'base',
									marginTop: 4
								})}
							>
								<Text color="red12" textAlign="center">{message}</Text>
							</div>
						{/if}
					</form>
				{/if}
			</slot>
			<slot slot="footer">
				<Button variant="secondary" disabled={isLoading} on:click={handleClose}>
					<Text color="white" textAlign="center">Close</Text>
				</Button>
				{#if !isSuccess}
					<Button variant="success" disabled={isLoading} on:click={onSubmit}>
						<Text color="white" textAlign="center">Sign in</Text>
					</Button>
				{/if}
			</slot>
		</Modal>
	</Portal>
{/if}
