<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import type { PageProps } from '$svelte-kit/[city]/profile/$types';
  import { AuthApi } from '$src/api/AuthApi';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { AppRoutes } from '$src/services/AppRoutes';
  import Navigation from '$src/components/Navigation.svelte';
  import Header from '$src/components/Header.svelte';

  const { data } = $props() as PageProps;

  async function logout(): Promise<void> {
    const res = await AuthApi.logout();

    if (res.isOk()) {
      await goto(AppRoutes.city(page.params.city), { invalidateAll: true });
    }
  }
</script>

<SEO title="Profile {data.id}" description="Profile {data.id}" />

<Navigation />

<Header />

<div class="container my-4">
  <h1>Profile</h1>
  <p class="mt-1 mb-4 text-xs secondary">id: {data.id}</p>
  <p>email: {data.email}</p>

  <button class="small warn mt-10" onclick={logout}>Выйти</button>
</div>
