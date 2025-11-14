<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import IconCheck from '@tabler/icons-svelte/icons/check';
  import Mock from '$project/.storybook/Mock.svelte';

  const { Story } = defineMeta({
    component: Mock,
    title: 'Button'
  });
</script>

<Story name="Primary">
  <Mock>
    <button>Button</button>
  </Mock>
</Story>

<Story name="Secondary">
  <Mock>
    <button class="secondary">Button</button>
  </Mock>
</Story>

<Story name="Sizes">
  <Mock>
    <div class="flex gap-4 items-center">
      <button class="small">Button</button>
      <button>Button</button>
      <button class="big">Button</button>
    </div>
    <div class="flex gap-4 items-center mt-5">
      <button class="secondary small">Button</button>
      <button class="secondary">Button</button>
      <button class="secondary big">Button</button>
    </div>
  </Mock>
</Story>

<Story name="Icons">
  <Mock>
    <div class="flex gap-4 items-center">
      <button class="small"><IconCheck />Button<IconCheck /></button>
      <button><IconCheck />Button<IconCheck /></button>
      <button class="big"><IconCheck />Button<IconCheck /></button>
    </div>
    <div class="flex gap-4 items-center mt-5">
      <button class="secondary small"><IconCheck />Button<IconCheck /></button>
      <button class="secondary"><IconCheck />Button<IconCheck /></button>
      <button class="secondary big"><IconCheck />Button<IconCheck /></button>
    </div>
  </Mock>
</Story>

<Story name="Disabled">
  <Mock>
    <button disabled><IconCheck />Button</button>
    <button class="secondary" disabled><IconCheck />Button</button>
  </Mock>
</Story>
