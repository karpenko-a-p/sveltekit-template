<script lang="ts">
  import IconLogin from '@tabler/icons-svelte/icons/login-2';
  import IconUser from '@tabler/icons-svelte/icons/user';
  import { page } from '$app/state';

  const authorized = $derived(page.data.jwtToken);
  const notAuthPage = $derived(!page.url.pathname.endsWith('/auth'));
</script>

<header class="container py-2 flex justify-between items-center">
  <a href="/{page.params.city}" class="no-underline">
    <h1 class="text-2xl max-mobile:text-xl">
      MY<span class="font-normal">ПОРТАЛ</span>
    </h1>
  </a>

  {#if authorized}
    <a href="/{page.params.city}/profile">
      <button class="small ghost">
        <IconUser />
        Профиль
      </button>
    </a>
  {:else if notAuthPage}
    <a href="/{page.params.city}/auth">
      <button class="secondary small">
        <IconLogin />
        Войти
      </button>
    </a>
  {/if}
</header>
