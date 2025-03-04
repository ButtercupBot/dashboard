<script lang="ts">
import * as Avatar from '$lib/components/ui/avatar/index.js';
import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
import * as Sidebar from '$lib/components/ui/sidebar/index.js';
import { useSidebar } from '$lib/components/ui/sidebar/index.js';
import { activeGuildStore } from '$lib/stores';
import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
import { onMount } from 'svelte';
import { Skeleton } from '$lib/components/ui/skeleton/index.js';
import { syncActiveGuild } from '$lib/utils';

let { guilds } = $props();
const sidebar = useSidebar();

if (guilds.length === 0) {
    guilds = [
        {
            name: 'No Servers Found',
            icon: '/favicon.png',
            plan: 'free',
            id: '0',
        },
    ];
}

let activeGuild = $state() as App.Guild;
let awaitMount = $state(new Promise<App.Guild>(() => {}));

onMount(syncActiveGuild);
onMount(async () => {
    if ($activeGuildStore === null) {
        activeGuildStore.set(guilds[0]);
    }
    activeGuild = $activeGuildStore;
    awaitMount = (async () => {
        return activeGuild;
    })();
});

const updateGuild = async (guild: App.Guild) => {
    activeGuildStore.set(guild);
    window.location.reload();
};
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			{#await awaitMount}
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div
							class="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
						>
						<Skeleton class="size-4" />
					</div>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<Skeleton class="h-4 w-[100px]" />
						<Skeleton class="h-4 w-[50px]" />
					</div>
					<ChevronsUpDown class="ml-auto" />
				</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			{:then}
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<div
							class="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
						>
						<Avatar.Root class="size-4">
							<Avatar.Image src={activeGuild.icon} alt={activeGuild.name} />
							<Avatar.Fallback class="rounded-lg">:3</Avatar.Fallback>
						</Avatar.Root>
					</div>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<span class="truncate font-semibold">
							{activeGuild.name}
						</span>
						<span class="truncate text-xs">{activeGuild.plan}</span>
					</div>
					<ChevronsUpDown class="ml-auto" />
				</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
			class="w-[--bits-dropdown-menu-anchor-width] min-w-56 max-h-[92vh] overflow-y-auto rounded-lg"
			align="start"
			side={sidebar.isMobile ? "bottom" : "right"}
			sideOffset={4}
			>
				<DropdownMenu.Label class="text-muted-foreground text-xs">Servers</DropdownMenu.Label>
					{#each guilds as guild}
					<DropdownMenu.Item onSelect={() => updateGuild(guild)} class="gap-2 p-2">
							<div class="flex size-6 items-center justify-center rounded-sm border">
								<Avatar.Root class="size-4">
									<Avatar.Image src={guild.icon} alt={guild.name} />
									<Avatar.Fallback class="rounded-lg">:3</Avatar.Fallback>
								</Avatar.Root>
							</div>
							{guild.name}
						</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				{/await}
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
