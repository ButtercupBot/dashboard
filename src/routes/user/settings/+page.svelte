<script lang="ts">
import Button from '$lib/components/ui/button/button.svelte';
import * as Card from '$lib/components/ui/card/index.js';
import Refresh from 'lucide-svelte/icons/refresh-ccw';
import Copy from 'lucide-svelte/icons/copy';
import { toast } from 'svelte-sonner';
import * as AlertDialog from '$lib/components/ui/alert-dialog';

const apiKey = 'Key Unavailable';

const keyVisible = (event: MouseEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target) return;
    target.type = 'text';
};
const keyHidden = (event: MouseEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target) return;
    target.type = 'password';
};

let refreshTokenDialog = $state(false);
</script>

<AlertDialog.Root open={refreshTokenDialog}>
	<AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Refresh Token?</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Description>
            This is irreversible and anything using the current token will not work anymore.
        </AlertDialog.Description>
	<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-transparent hover:bg-transparent">
                <Button variant="destructive">Refresh</Button>
            </AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<Card.Root>
    <Card.Header>
        <Card.Title>API Key</Card.Title>
        <Card.Description>Build on more for your app with the buttercup API.</Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-row gap-2">
        <input disabled type="password" onmouseenter={keyVisible} onmouseleave={keyHidden} value={apiKey} class="w-full border-input border shadow-sm rounded-md min-h-[38px] max-h-[38px] py-2 px-3 text-sm" />
        <Button variant={'outline'} onclick={() => {navigator.clipboard.writeText(apiKey); toast.success('Copied API key to clipboard');}}>
            <Copy/>
        </Button>
        <Button onclick={() =>{refreshTokenDialog = true}} disabled variant={'outline'}>
            <Refresh/>
        </Button>
    </Card.Content>
</Card.Root>