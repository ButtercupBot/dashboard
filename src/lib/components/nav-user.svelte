<script lang="ts">
import * as Avatar from '$lib/components/ui/avatar/index.js';
import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
import * as Sidebar from '$lib/components/ui/sidebar/index.js';
import { useSidebar } from '$lib/components/ui/sidebar/index.js';
import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
import LogOut from 'lucide-svelte/icons/log-out';
import Moon from 'lucide-svelte/icons/moon';
import Sparkles from 'lucide-svelte/icons/sparkles';
import Sun from 'lucide-svelte/icons/sun';
import BadgePlus from 'lucide-svelte/icons/badge-plus';
import { toggleMode } from 'mode-watcher';

let { user }: { user: { username: string; avatar: string } } = $props()
const sidebar = useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.username} />
							<Avatar.Fallback class="rounded-lg">:3</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.username}</span>
						</div>
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="h-8 w-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.username} />
							<Avatar.Fallback class="rounded-lg">:3</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">{user.username}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item disabled>
						<Sparkles />
						Upgrade to Butter+
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<BadgePlus />
						Add to Server
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={toggleMode}>
						<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
						<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
						Theme
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={() => location.href = '/logout'} >
					<LogOut />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
