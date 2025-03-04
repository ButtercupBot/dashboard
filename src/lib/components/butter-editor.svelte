<script lang="ts">
export const ssr = false;
import { onDestroy, onMount } from 'svelte';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

const { value } = $props();

onMount(async () => {
    const monaco = await import('monaco-editor');

    self.MonacoEnvironment = {
        getWorker: () => new tsWorker(),
    };

    const editor = monaco.editor.create(
        document.getElementById('container-1') as HTMLDivElement,
        {
            value: value,
            language: 'typescript',
        },
    );
    onDestroy(() => {
        editor.dispose();
    });
});
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex-grow" id="container-1" ></div>
</div>
