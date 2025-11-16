<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends HTMLInputAttributes {
    label: string;
    invalid?: boolean;
    errorMessage?: string;
    description?: string;
  }

  let {
    files = $bindable(),
    label,
    class: className = '',
    invalid,
    errorMessage,
    description,
    ...rest
  }: Props = $props();
</script>

<div class="file-input {className}">
  <label>
    <span>{label}</span>
    <input type="file" aria-invalid={invalid} bind:files {...rest} />
  </label>

  {#if description}
    <p class="input-description">{description}</p>
  {/if}

  {#if invalid && errorMessage}
    <p class="input-error">{errorMessage}</p>
  {/if}
</div>
