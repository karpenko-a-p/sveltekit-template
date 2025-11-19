<script lang="ts">
  import IconTrash from '@tabler/icons-svelte/icons/trash';

  interface Props {
    files: Nilable<FileList>;
    class?: string;
  }

  let { files = $bindable(), class: className = '' }: Props = $props();

  function deleteImage(file: File): void {
    if (!files) return;

    const dataTransfer = new DataTransfer();

    for (const iterableFile of files) {
      if (iterableFile !== file) {
        dataTransfer.items.add(iterableFile);
      }
    }

    files = dataTransfer.files;
  }
</script>

<ul class="grid grid-cols-5 max-tablet:grid-cols-3 max-mobile:grid-cols-2 gap-1 {className}">
  {#each files as file}
    {@const fileUrl = URL.createObjectURL(file)}
    {@const onclick = () => deleteImage(file)}
    <li class="relative rounded-2xl overflow-hidden border border-gray-400/25">
      <a href={fileUrl} class="cursor-pointer w-full h-full min-h-full max-h-[30vh] block" target="_blank">
        <img class="object-cover w-full h-full min-h-full" src={fileUrl} alt={file.name} />
      </a>
      <!-- prettier-ignore -->
      <div class="bg-white shadow-xl border border-gray-400/25 absolute bottom-1 left-1 w-[calc(100%-8px)] p-0.5 rounded-xl flex justify-between items-center overflow-hidden">
        <p class="ml-1 grow text-xs text-ellipsis whitespace-nowrap overflow-hidden" title={file.name}>
          {file.name}
        </p>
        <p class="ml-1 text-xs secondary whitespace-nowrap">
          {(file.size / 1014 / 1024).toFixed(2)} Мб
        </p>
        <button type="button" class="secondary small ml-1" {onclick}>
          <IconTrash />
        </button>
      </div>
    </li>
  {/each}
</ul>
