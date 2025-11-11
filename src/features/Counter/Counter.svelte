<script lang="ts">
  import { counter, CounterStore } from './CounterStore.svelte';

  const localCounter = new CounterStore();
  let count = $state(0);
  let over10 = $derived(count > 10);
</script>

<h3>Counter component</h3>

<div class="flex items-center gap-3">
  <button class="secondary small" onclick={() => count--}>Decrement</button>
  <p>Current count is {count}</p>
  <button class="secondary small" onclick={() => count++}>Increment</button>
  {#if over10}
    <button class="secondary small" onclick={() => (count = 0)}>Reset</button>
  {/if}
</div>

<p class="my-2">Another counter, but it's bounded with global store</p>

<div class="flex items-center gap-3">
  <button class="secondary small" onclick={counter.decrement}>Decrement</button>
  <p>Current count is {counter.count}</p>
  <button class="secondary small" onclick={counter.increment}>Increment</button>
  {#if counter.over10}
    <button class="secondary small" onclick={counter.reset}>Reset</button>
  {/if}
</div>

<p class="my-2">Below one is counter store, but initialized locally and behaves like first one</p>

<div class="flex items-center gap-3">
  <button class="secondary small" onclick={localCounter.decrement}>Decrement</button>
  <p>Current count is {localCounter.count}</p>
  <button class="secondary small" onclick={localCounter.increment}>Increment</button>
  {#if localCounter.over10}
    <button class="secondary small" onclick={localCounter.reset}>Reset</button>
  {/if}
</div>
