<script lant="ts">
  import Button from '$lib/components/Button/index.svelte';
  import Input from '$lib/components/Input/index.svelte';
  import Text from '$lib/components/Text/index.svelte';
  import { user } from '$lib/shared/stores/user';
  import { theme } from '$lib/styles/themes/index.css';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import Tooltip from '$lib/components/Tooltip/index.svelte';
  import RiDocumentFileCopyLine from 'svelte-icons-pack/ri/RiDocumentFileCopyLine';

  import * as styles from './index.css';

  export let onModalOpen = () => void 0;
  let tooltipText = 'Copy';

  const onClickCopyToClipboard = () => {
    copyToClipboard($user);
    tooltipText = 'Copied!';
    setTimeout(() => (tooltipText = 'Copy'), 2000);
  };

  const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
  };
</script>

<div class={styles.menuFooter}>
  <div class={styles.tokenInputContainer}>
    <Input label="Token" readonly value={$user} />
    <Tooltip text={tooltipText}>
      <Button on:click={onClickCopyToClipboard}>
        <Icon
          className={styles.tokenCopyIcon}
          src={RiDocumentFileCopyLine}
          color={theme.colors.white}
        /></Button
      >
    </Tooltip>
  </div>
  <Button on:click={onModalOpen}
    ><Text color="white" textAlign="center">Load from token</Text></Button
  >
</div>
