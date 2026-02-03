<script lang="ts">
  import type { PageProps } from '$svelte-kit/[city]/$types';
  import SEO from '$src/components/SEO.svelte';
  import Navigation from '$src/components/Navigation.svelte';
  import Counter from '$src/features/Counter';
  import Header from '$src/components/Header.svelte';

  const { data }: PageProps = $props();
</script>

<SEO title="Counter page" description="counter page" />

<Navigation cityName={data.city.name} />

<Header token={data.token} />

<div class="container flex flex-col">
  {#each { length: 10 }}
    <div class="paper mb-3">
      <Counter />
    </div>
  {/each}
</div>
