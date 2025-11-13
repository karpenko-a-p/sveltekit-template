import type { Preview } from '@storybook/sveltekit';
import '$src/ui/font.css';
import '$project/src/app.css';

const preview: Preview = {
  tags: ['autodocs']
};

export default preview;
