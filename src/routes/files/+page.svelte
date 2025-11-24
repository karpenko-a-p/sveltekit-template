<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import UploadedImages from '$src/components/UploadedImages.svelte';
  import { FileInput } from '$src/ui';
  import { BooleanState } from '$src/utils/BooleanState.svelte.ts';
  import type { EventHandler } from 'svelte/elements';
  import { FileApi } from '$src/api/FileApi.ts';

  let files = $state<Nilable<FileList>>();
  const sendingFiles = new BooleanState();
  const noFiles = $derived(!files?.length);

  const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    event.preventDefault();

    if (noFiles) return;

    sendingFiles.makeTrue();

    FileApi.createImage(files!).finally(sendingFiles.makeFalse);
  };
</script>

<SEO title="File load form" description="file load from" />

<div class="container my-4">
  <h1 class="mb-3">File load form</h1>

  <form {onsubmit}>
    <FileInput name="files" bind:files disabled={sendingFiles.state} accept="image/*" multiple type="file" required />
    <UploadedImages bind:files class="my-2" />
    <button class="mt-2 small" disabled={noFiles}>Сохранить</button>
  </form>
</div>
