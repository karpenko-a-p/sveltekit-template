<script lang="ts">
  import { page } from '$app/state';
  import IconCheck from '@tabler/icons-svelte/icons/check';
  import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
  import IconLogin from '@tabler/icons-svelte/icons/login-2';
  import Header from '$src/components/Header.svelte';
  import SEO from '$src/components/SEO.svelte';
  import Navigation from '$src/components/Navigation.svelte';
  import Input from '$src/ui/Input/Input.svelte';
  import { AuthApi } from '$src/api/AuthApi';
  import { goto } from '$app/navigation';
  import { Route } from '$src/utils/Route';
  import Footer from '$src/components/Footer.svelte';

  let register = $state(true);
  let email = $state('');
  let password = $state('');
  let errors = $state<string[]>([]);

  function toggleRegister(): void {
    register = !register;
  }

  async function onsubmit(): Promise<void> {
    // prettier-ignore
    const result = register
      ? await AuthApi.register(email, password)
      : await AuthApi.login(email, password);

    if (result.isFail()) {
      errors = result.value.length ? result.value : ['Внутренняя ошибка сервиса, попробуйте авторизоваться позже'];
      return;
    }

    await goto(Route.profile(page.params.city!), { invalidateAll: true });
  }
</script>

<SEO title="{page.data.city.name} | Авторизация" description="Авторизация" />

<Navigation />

<Header />

<main class="container my-auto py-10">
  <a href="/{page.params.city}" class="flex items-center mb-4">
    <IconChevronLeft />На главную
  </a>

  <div class="flex gap-5 max-mobile:flex-col">
    <form {onsubmit} class="flex-1 flex flex-col gap-2">
      <Input bind:value={email} required autocomplete="email" label="Электронная почта" />
      <Input bind:value={password} required autocomplete="current-password" label="Пароль" type="password" />

      {#each errors as error}
        <p class="small text-red-500">• {error}</p>
      {/each}

      <div class="flex justify-between">
        <button class="ghost self-start small" type="button" onclick={toggleRegister}>
          {#if register}
            Уже есть аккаунт
          {:else}
            Создать аккаунт
          {/if}
        </button>

        <button type="submit" class="small">
          <IconLogin />Войти
        </button>
      </div>
    </form>

    <div class="bg-linear-to-r from-cyan-500 to-blue-500 *:text-white rounded-xl p-4 flex-1">
      <h2 class="text-3xl max-mobile:text-2xl mb-3">
        {#if register}
          Регистрация
        {:else}
          Войти в профиль
        {/if}
      </h2>
      <p class="flex items-center gap-1"><IconCheck />Авторизация это круто</p>
      <p class="flex items-center gap-1"><IconCheck />Сможешь заходить в профиль</p>
      <p class="flex items-center gap-1"><IconCheck />И выходить из профиля</p>
    </div>
  </div>
</main>

<Footer />
