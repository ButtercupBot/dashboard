<script lang="ts">
import * as Card from '$lib/components/ui/card/index.js';
import { page } from '$app/state';
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import { activeGuildStore } from '$lib/stores';
import { syncActiveGuild } from '$lib/utils';
import { Input } from '$lib/components/ui/input/index.js';
import Trash from 'lucide-svelte/icons/trash';
import Trash2 from 'lucide-svelte/icons/trash-2';
import Plus from 'lucide-svelte/icons/plus';
import Button from '$lib/components/ui/button/button.svelte';
import { toast } from 'svelte-sonner';
import StoreItem from '$lib/components/store-item.svelte';

let kv: string[][] = $state([[], []]);

onMount(syncActiveGuild);
onMount(async () => {
    let formData = new FormData();
    formData.append('id', get(activeGuildStore)?.id as string);
    formData.append('action', 'getKv');
    kv = await fetch(page.url, {
        method: 'post',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            return JSON.parse(JSON.parse(res.data)[0]);
        });
});

const deleteKv = (
    e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
) => {
    const index = kv[0].indexOf(e.currentTarget.id);

    let formData = new FormData();
    formData.append('id', get(activeGuildStore)?.id as string);
    formData.append('action', 'delKv');
    formData.append('field', e.currentTarget.id);
    fetch(page.url, {
        method: 'post',
        body: formData,
    }).then(() => {
        kv[0].splice(index, 1);
        kv[1].splice(index, 1);
    });
};

const saveKv = (key: string, value: string) => {
    const valueElem = document.getElementById(value) as HTMLInputElement;
    valueElem.classList.remove('border-red-400');

    if (document.getElementById(key)) {
        const keyElem = document.getElementById(key) as HTMLInputElement;
        keyElem.classList.remove('border-red-400');

        if (keyElem.value.length < 1) {
            keyElem.classList.add('border-red-400');
            toast.error('Key must be longer than one');
            return;
        }
        if (keyElem.value.includes(' ')) {
            keyElem.classList.add('border-red-400');
            toast.error('Key cannot contain spaces');
            return;
        }
        // biome-ignore lint/style/noParameterAssign: will cause more redundant code if not reassigned
        key = keyElem.value;
    }

    if (valueElem.value.length < 1) {
        valueElem.classList.add('border-red-400');
        toast.error('Value must have a default value');
        return;
    }

    let formData = new FormData();
    formData.append('id', get(activeGuildStore)?.id as string);
    formData.append('action', 'setKv');
    formData.append('field', key);
    formData.append('value', valueElem.value);
    fetch(page.url, {
        method: 'post',
        body: formData,
    }).then(() => {
        if (kv[0].includes(key)) return;
        kv[0].push(key);
        kv[1].push(valueElem.value);
    });
};
</script>
    
<Card.Root>
    <Card.Header>
        <Card.Title>Stores</Card.Title>
        <Card.Description>Set something here to access it across the whole bot.</Card.Description>
    </Card.Header>
    <Card.Content class="[&>div]:my-3">
        <Card.Root>
            <Card.Content class="flex [&>input]:mr-3">
                <Input id="newKey" type="text" placeholder="Key"/>
                <Input id="newValue" type="text" placeholder="Value"/>
                <Button variant='secondary' onclick={() => {saveKv('newKey', 'newValue')}}>
                    <Plus/>
                </Button>
            </Card.Content>
        </Card.Root>
        {#each kv[0] as key, index}
        <StoreItem {key} value={kv[1][index]} {deleteKv} {saveKv}/>
        {/each}
    </Card.Content>
</Card.Root>
