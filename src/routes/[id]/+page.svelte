<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import type { PageProps } from '$svelte-kit/[id]/$types';

  const { params }: PageProps = $props();
</script>

<SEO title="id {params.id}" description="page id {params.id}" />

<h1>{params.id}</h1>
