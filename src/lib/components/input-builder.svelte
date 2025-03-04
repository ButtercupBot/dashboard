<script lang="ts">
import { Textarea } from '$lib/components/ui/textarea/index.js';

let { value = $bindable() }: { value: string } = $props();
</script>

<Textarea bind:value class="resize-none discord-font" />

<style>
@import url('https://api.fonts.coollabs.io/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

:global(.discord-font) {
  font-family: "Open Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}
</style>