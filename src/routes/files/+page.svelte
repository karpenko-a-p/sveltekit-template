<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import UploadedImages from '$src/components/UploadedImages.svelte';
  import { FileInput, Input } from '$src/ui';
  import type { EventHandler } from 'svelte/elements';

  const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  let files = $state<Nilable<FileList>>();
</script>

<SEO title="File load form" description="file load from" />

<div class="container my-4">
  <h1 class="mb-3">File load form</h1>

  <form {onsubmit}>
    <FileInput name="files" bind:files accept="image/*" multiple type="file" required />
    <UploadedImages bind:files class="my-2" />
  </form>
</div>
