<script lang="ts">
  import { Counter } from '$src/features/Counter';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Counter</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Current url is {data.url}</p>
{#each { length: 1000 }}
  <Counter />
  <hr />
{/each}
