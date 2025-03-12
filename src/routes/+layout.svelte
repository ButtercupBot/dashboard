<script lang="ts">
import '../app.css';
import { page } from '$app/state';
import AppSidebar from '$lib/components/app-sidebar.svelte';
import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
import { Separator } from '$lib/components/ui/separator/index.js';
import * as Sidebar from '$lib/components/ui/sidebar/index.js';
import { ModeWatcher } from 'mode-watcher';
import { Toaster } from '$lib/components/ui/sonner/index.js';
import { syncActiveGuild } from '$lib/utils';
import { onMount } from 'svelte';
import { activeGuildStore } from '$lib/stores';

const { data, children } = $props();

onMount(syncActiveGuild);
let guild = $state('Guild')
onMount(() => {
	guild = $activeGuildStore?.name
})
</script>

<ModeWatcher/>
<Toaster />

{#if !data.loggedIn}
<AlertDialog.Root open={true}>
	<AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>You need to be logged in to use this page!</AlertDialog.Title>
        </AlertDialog.Header>
	<AlertDialog.Footer>
			<AlertDialog.Action onclick={() => location.href = `${data.api_url}/auth/login`}>Login</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
{:else}
	<Sidebar.Provider style="--sidebar-width: 350px;">
		<AppSidebar user={{avatar: `https://cdn.discordapp.com/avatars/${data.userData?.id}/${data.userData?.avatar}.png`, username: data.userData?.username as string}} guilds={data.guilds} />
		<Sidebar.Inset>
			<header
				class="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4"
			>
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="/">{guild}</Breadcrumb.Link>
						</Breadcrumb.Item>
						{#if page.url.pathname.split('?')[0].split('/').slice(2).length > 0}
							{#each page.url.pathname.split('?')[0].split('/').slice(2) as action}
							<Breadcrumb.Separator class="hidden md:block" />
								<Breadcrumb.Item>
									<Breadcrumb.Page>{action.split('')[0].toLocaleUpperCase() + action.split('').slice(1).join('')}</Breadcrumb.Page>
								</Breadcrumb.Item>
							{/each}
						{/if}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</header>
			<div class="p-4">
				{@render children()}
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}