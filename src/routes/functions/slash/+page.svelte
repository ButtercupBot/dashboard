<script lang="ts">
import { Button } from '$lib/components/ui/button/index.js';
import * as Card from '$lib/components/ui/card/index.js';
import * as Command from '$lib/components/ui/command/index.js';
import * as Popover from '$lib/components/ui/popover/index.js';
import ChevronDown from 'lucide-svelte/icons/chevron-down';
import Plus from 'lucide-svelte/icons/plus';
import Label from '$lib/components/ui/label/label.svelte';
import type { Role } from 'discord.js';
import { Textarea } from '$lib/components/ui/textarea/index.js';
import { page } from '$app/state';
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import { activeGuildStore } from '$lib/stores';
import { syncActiveGuild } from '$lib/utils';

let allowedRole = $state('Select a Role...');
let allowedRoleId = $state('');

let roles: Role[] = $state([]);

onMount(syncActiveGuild);
onMount(async () => {
    let formData = new FormData();
    formData.append('id', get(activeGuildStore)?.id as string);
    roles = await fetch(page.url, {
        method: 'post',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            return JSON.parse(JSON.parse(res.data)[0]);
        });
});

type SlashCommand = {
    command: string;
    args: string[];
    execute: string;
};

let command = $state({
    command: '',
    args: [],
    execute: '',
}) as SlashCommand;

const resize = (e: InputEvent & HTMLTextAreaElement) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.width = '0px';
    target.style.width = `${target.scrollWidth + 8}px`;
};

const addArg = () => {
    command.args.push('new arg');
};

const butter = `const Interaction = (command: string, arg1: string) => {
}`;
</script>

<div class="flex items-center justify-center [&>div]:w-full">
<Card.Root>
    <Card.Header>
        <Card.Title>Slash Command</Card.Title>
        <Card.Description>Add a custom slash command.</Card.Description>
    </Card.Header>
    <Card.Content class="grid grid-cols-1 grid-rows-2">
        <div>
            <Label for="role">Permission</Label>
            <Popover.Root>
                <Popover.Trigger id="role">
                    <Button variant="outline" class="ml-auto">
                        {allowedRole}
                        <ChevronDown class="text-muted-foreground ml-2 h-4 w-4" />
                    </Button>
                </Popover.Trigger>
                <Popover.Content class="p-0" align="center">
                    <Command.Root>
                        <Command.Input placeholder="Select a Role..." />
                        <Command.List>
                            <Command.Empty>No channels found.</Command.Empty>
                            {#await roles then roles}
                            {#each roles as role}
                            <Command.Item onclick={() => {allowedRole = role.name; allowedRoleId = role.id}} class="flex flex-col items-start space-y-1 px-4 py-2">
								<p>{role.name}</p>
								<p class="text-muted-foreground text-sm">
									Id: {role.id}
								</p>
							</Command.Item>
                            {/each}
                            {/await}
                        </Command.List>
                    </Command.Root>
                </Popover.Content>
            </Popover.Root>
        </div>
        <div>
            <Card.Root>
                <Card.Content id="commandHolder" class="p-2 flex gap-x-2 flex-row ">
                    <Textarea maxlength={1} contenteditable="false" disabled class="flex h-10 min-h-1 resize-none focus-visible:ring-0 outline-none border rounded-sm p-1 overflow-hidden text-nowrap  w-4" value="/"></Textarea>
                    <Textarea bind:value={command.command} oninput={resize} contenteditable placeholder="Command" class="flex h-10 min-h-1 resize-none focus-visible:ring-0 outline-none border rounded-sm p-1 overflow-hidden text-nowrap min-w-[86px] w-[86px]"></Textarea>
                    {#each command.args as arg, index}
                        <Textarea bind:value={command.args[index]} oninput={resize} contenteditable placeholder="New Arg" class="flex h-10 min-h-1 resize-none focus-visible:ring-0 outline-none border rounded-sm p-1 overflow-hidden text-nowrap min-w-[86px] w-[86px]"></Textarea>
                    {/each}
                    <Button onclick={addArg} variant="outline"><Plus/></Button>
                </Card.Content>
            </Card.Root>
        </div>
    </Card.Content>
</Card.Root>
</div>
