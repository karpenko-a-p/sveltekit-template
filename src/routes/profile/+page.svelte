<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import type { PageProps } from '$svelte-kit/profile/$types';

  const { data } = $props() as PageProps;
</script>

<SEO title="Profile {data.id}" description="Profile {data.id}" />

<div class="container my-4">
  <h1>Profile</h1>
  <p class="mt-1 mb-4 text-xs secondary">id: {data.id}</p>
  <p>email: {data.email}</p>
</div>
