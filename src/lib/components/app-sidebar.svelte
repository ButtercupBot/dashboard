<script lang="ts">
import GuildSwitcher from '$lib/components/guild-switcher.svelte';
import NavMain from '$lib/components/nav-main.svelte';
import NavUser from '$lib/components/nav-user.svelte';
import * as Sidebar from '$lib/components/ui/sidebar/index.js';

let {
    ref = $bindable(null),
    collapsible = 'icon',
    user,
    guilds,
    ...restProps
}: {
    ref?: HTMLElement | null | undefined;
    collapsible?: 'none' | 'offcanvas' | 'icon' | undefined;
    user: App.User;
    guilds: App.Guild[];
} = $props();

const guildArray: App.Guild[] = [];

for (const guild of guilds) {
    const data = {
        name: guild.name,
        icon: guild.icon
            ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
            : '/favicon.png',
        plan: guild.plan,
        id: guild.id,
    };
    guildArray.push(data);
}
</script>

<script lang="ts" module>
	import BookOpen from "lucide-svelte/icons/book-open";
	import Bot from "lucide-svelte/icons/bot";
	import SquareTerminal from "lucide-svelte/icons/square-terminal";
	import Plugin from 'lucide-svelte/icons/plug-zap'

	// This is sample data for things i plan to add
	const data = {
		navMain: [
			{
				title: "Functions",
				url: "/functions",
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: "Slash",
						url: "/functions/slash",
					},
					{
						title: "Message",
						url: "/functions/message",
					},
					{
						title: "Reaction",
						url: "/functions/reaction",
					},
					{
						title: "Welcome",
						url: "/functions/welcome",
					},
				],
			},
			{
				title: "Data Handling",
				url: "/",
				icon: BookOpen,
				items: [
					{
						title: "Variables",
						url: "#",
					},
					{
						title: "Users",
						url: "#",
					},
					{
						title: "Stores",
						url: "#",
					},
				],
			},
			{
				title: "Plugins",
				url: "/",
				icon: Plugin,
				items: [
					{
						title: "COMING SOON!!!",
						url: "#",
					},
				],
			},
			{
				title: "Bot Settings",
				url: "/settings",
				icon: Bot,
				items: [
					{
						title: "Leave Server",
						url: "/settings/leave",
					},
				],
			},
		],
	};
</script>


<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<GuildSwitcher guilds={guildArray}/>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
