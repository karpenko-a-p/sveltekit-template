<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Mock from '$project/.storybook/Mock.svelte';
  import IconCheck from '@tabler/icons-svelte/icons/check';

  const { Story } = defineMeta({
    component: Mock,
    title: 'Badge'
  });
</script>

<Story name="Main">
  <Mock>
    <p class="badge">Badge</p>
  </Mock>
</Story>

<Story name="Styles">
  <Mock>
    <div class="flex gap-4">
      <p class="badge">Badge</p>
      <p class="badge green">Badge</p>
      <p class="badge blue">Badge</p>
    </div>
  </Mock>
</Story>

<Story name="Icons">
  <Mock>
    <div class="flex gap-4">
      <p class="badge"><IconCheck />Badge<IconCheck /></p>
      <p class="badge green"><IconCheck />Badge<IconCheck /></p>
      <p class="badge blue"><IconCheck />Badge<IconCheck /></p>
    </div>
  </Mock>
</Story>
