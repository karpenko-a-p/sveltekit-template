<script lang="ts">
  import IconLogin from '@tabler/icons-svelte/icons/login-2';
  import { page } from '$app/state';

  const token = $derived(page.data.token);
</script>

<header class="container py-2 flex justify-between items-center">
  <h1 class="text-2xl max-mobile:text-xl">
    MY<span class="font-normal">ПОРТАЛ</span>
  </h1>

  {#if token}
    <p>{token.id} {token.email}</p>
  {:else}
    <a href="{page.params.city}/auth">
      <button class="secondary small">
        <IconLogin />
        Войти
      </button>
    </a>
  {/if}
</header>
