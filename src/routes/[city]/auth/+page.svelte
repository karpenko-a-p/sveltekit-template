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

  let register = $state(true);
  let email = $state('');
  let password = $state('');

  const toggleRegister = (): boolean => (register = !register);
  const onsubmit = (): Promise<void> => (register ? AuthApi.register(email, password) : AuthApi.login(email, password));
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

      <div class="flex justify-between">
        <button class="ghost self-start small" onclick={toggleRegister}>
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
