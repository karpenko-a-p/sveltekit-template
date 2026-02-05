<script lang="ts">
  import { page } from '$app/state';
</script>

<footer class="bg-neutral-100 mt-auto py-1">
  <div class="container my-2 flex gap-10 max-mobile:flex-col max-mobile:gap-4">
    <div class="flex-1/2">
      <p class="small secondary">
        Ресурс на который вы попали не несет ответственности за брак полученный товаром во время транспортировки, так же
        если просто товар оказался некачественный, ресурс в принципе ни за что ответственности не несет, сами виноваты
        что нарвались на нас. Приятных покупок!
      </p>
    </div>

    <div class="flex-1/2">
      <p class="small secondary">ООО "Тмыв денег"</p>
      <p class="small secondary">ИНН 3284736219</p>
      <p class="small secondary">ЕГРН 4984713450139</p>

      <a href="/{page.params.city}/politics" class="mt-2">
        <p class="small secondary">Политика конфиденциальности</p>
      </a>
    </div>
  </div>
</footer>
