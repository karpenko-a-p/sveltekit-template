<script lang="ts">
  import IconHome from '@tabler/icons-svelte/icons/send';
  import { slide } from 'svelte/transition';
  import { browser } from 'globals';

  interface Props {
    cityName: string;
  }

  const { cityName }: Props = $props();

  let opened = $state(false);

  $effect(() => {
    cityName;
    opened = false;
  })
</script>

<nav class="py-1 bg-neutral-100">
  <div class="container flex justify-between">
    <p class="secondary">Тестовый проект</p>
    <button class="ghost p-0 pr-1.5 gap-0" onclick={() => (opened = !opened)}>
      <IconHome class="h-4" />
      {cityName}
    </button>
  </div>

  {#if browser && opened}
    <div transition:slide class="container flex flex-col my-2">
      <a href="/msk">Москва</a>
      <a href="/spb">Санкт-Петербург</a>
      <a href="/vlg">Волгоград</a>
    </div>
  {/if}
</nav>
