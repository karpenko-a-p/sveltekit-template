<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import Counter from '$src/features/Counter';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
</script>

<SEO title="Counter page" description="counter page" />

<div class="container flex flex-col">
  <h1>Welcome to SvelteKit</h1>
  <p class="badge self-start my-2">Current url is {data.url.origin}</p>
  {#each { length: 100 }}
    <div class="paper mb-3">
      <Counter />
    </div>
  {/each}
</div>
