<script lang="ts">
  import type { TokenPayload } from '$src/services/TokenService';

  interface Props {
    token: Maybe<TokenPayload>;
  }

  const { token }: Props = $props();
</script>

<div class="container py-2 flex justify-between">
  <h1 class="text-2xl">MY<span class="font-light">ПОРТАЛ</span></h1>

  {#if token}
    <p>{token.id} {token.email}</p>
  {/if}
</div>
