<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import Input from '$src/ui/Input/Input.svelte';
  import type { EventHandler } from 'svelte/elements';

  const onsubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
    event.preventDefault();
  };
</script>

<SEO title="File load form" description="file load from" />

<div class="container my-4">
  <h1 class="mb-3">File load form</h1>

  <form {onsubmit}>
    <Input name="filename" label="Future filename" placeholder="Write filename" class="mb-4" required />
    <input name="files" accept="image/*" multiple type="file" required />
  </form>
</div>
