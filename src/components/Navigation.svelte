<script lang="ts">
  import IconSend from '@tabler/icons-svelte/icons/send';
  import { slide } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { page } from '$app/state';

  let opened = $state(false);
  const cityName = $derived(page.data.city.name);

  $effect(() => {
    cityName;
    opened = false;
  })
</script>

<nav class="py-1 bg-neutral-100">
  <div class="container flex justify-between">
    <p class="secondary small">Для лиц старше 18 лет</p>
    <button class="ghost small p-0 gap-0 max-mobile:gap-0.5" onclick={() => (opened = !opened)}>
      <IconSend class="h-4 max-mobile:size-3" />
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
