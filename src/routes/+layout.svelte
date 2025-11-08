<script lang="ts">
	import '$src/app.css';
	import type { LayoutProps } from './$types';

	const { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Svelte template</title>
	<meta name="description" content="Svelte template" />
	<meta name="keywords" content="svelte,template" />
	<meta name="robots" content="index,follow" />
</svelte:head>

{@render children()}
