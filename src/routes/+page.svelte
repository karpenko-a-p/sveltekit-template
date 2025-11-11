<script lang="ts">
  import { Counter } from '$src/features/Counter';
  import type { PageProps } from './$types';

  const { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Counter</title>
</svelte:head>

<div class="container flex flex-col">
  <h1>Welcome to SvelteKit</h1>
  <p class="badge self-start my-2">Current url is {data.url}</p>
  {#each { length: 100 }}
    <Counter />
    <hr />
  {/each}
</div>
