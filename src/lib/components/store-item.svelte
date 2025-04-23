<script lang="ts">
import * as Card from '$lib/components/ui/card/index.js';
import { Input } from '$lib/components/ui/input/index.js';
import Trash from 'lucide-svelte/icons/trash';
import Trash2 from 'lucide-svelte/icons/trash-2';
import Button from '$lib/components/ui/button/button.svelte';
import Save from 'lucide-svelte/icons/save';

let { key, value, deleteKv, saveKv } = $props();
const originalValue = value;

let confirmDelete = $state(false);
let edited = $state(false);

const resetValue = () => {
    value = originalValue;
    edited = false;
};
</script>

<Card.Root>
    <Card.Content class="flex [&>p]:px-3">
        <p class="border-r-2 align-middle text-center leading-9">{key}</p>
        <Input id={`${key}Value`} class="mx-3" type="text" oninput={() => edited = true} bind:value={value} />
        {#if confirmDelete}
        <Button variant='destructive' id={key} onclick={deleteKv}>
            <p>Are you sure?</p>
            <Trash2/>
        </Button>
        {:else}
        <Button variant='secondary' onclick={() => {confirmDelete = true}}>
            <Trash/>
        </Button>
        {/if}
    </Card.Content>
    {#if edited}
    <Card.Footer class="flex-row-reverse w-full">
            <Button class="ml-2" variant='destructive' onclick={resetValue}>Cancel</Button>
            <Button variant='secondary' onclick={() => {saveKv(key, `${key}Value`); edited = false}}>Save <Save/></Button>
    </Card.Footer>
    {/if}
</Card.Root>