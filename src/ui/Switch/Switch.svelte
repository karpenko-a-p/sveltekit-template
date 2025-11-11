<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    errorMessage?: string;
    invalid?: boolean;
    disabled?: boolean;
  }

  let {
    checked = $bindable(),
    class: className = '',
    children,
    invalid,
    errorMessage,
    ...restProps
  }: Props = $props();
</script>

<div class="switch {className}">
  <label>
    <input type="checkbox" bind:checked role="switch" aria-invalid={invalid} {...restProps} />

    <!-- Отрисовка свича -->
    <div class="switch-thumb">
      <div class="switch-circle" />
    </div>

    <!-- Наименование -->
    {@render children?.()}
  </label>

  <!-- Текст ошибки -->
  {#if invalid && errorMessage}
    <p class="switch-error">{errorMessage}</p>
  {/if}
</div>
