<script lang="ts">
	import { counter } from './counter.store.svelte';

	let count = $state(0);
	let over10 = $derived(count > 10);
</script>

<h3>Counter component</h3>

<div class="flex gap-3 items-center">
	<button class="secondary small" onclick={() => count--}>Decrement</button>
	<p>Current count is {count}</p>
	<button class="secondary small" onclick={() => count++}>Increment</button>
	{#if over10}
		<button class="secondary small" onclick={() => (count = 0)}>Reset</button>
	{/if}
</div>

<p class="my-2">Another counter, but it's bounded with global store</p>

<div class="flex gap-3 items-center">
	<button class="secondary small" onclick={counter.decrement}>Decrement</button>
	<p>Current count is {counter.count}</p>
	<button class="secondary small" onclick={counter.increment}>Increment</button>
  {#if counter.over10}
		<button class="secondary small" onclick={counter.reset}>Reset</button>
	{/if}
</div>
