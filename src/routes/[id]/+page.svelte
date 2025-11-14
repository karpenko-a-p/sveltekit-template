<script lang="ts">
  import type { PageProps } from '$svelte-kit/[id]/$types';

  const { params }: PageProps = $props();
</script>

<h1>{params.id}</h1>
