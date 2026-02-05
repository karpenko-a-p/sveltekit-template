<script lang="ts">
  import SEO from '$src/components/SEO.svelte';
  import Navigation from '$src/components/Navigation.svelte';
  import Header from '$src/components/Header.svelte';
  import { page } from '$app/state';
  import Footer from '$src/components/Footer.svelte';
</script>

<SEO title="{page.data.city.name} | Главная" description="Интернет-магазин" />

<Navigation />

<Header />

<div class="container">
  <p>Lorem ipsum dolor sit amet.</p>
</div>

<Footer />
