<script lang="ts">
import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
import { Button } from '$lib/components/ui/button';
// import { localStorageState } from '$lib/stores.svelte';

const leaveGuild = () => {
    // console.log(localStorageState('activeGuild').current);
};
</script>

<AlertDialog.Root open={true}>
	<AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Leave Server?</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Description>
            This wont delete your setup data so you can add buttercup back anytime and keep your current config.
        </AlertDialog.Description>
	<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class="bg-transparent hover:bg-transparent" onclick={leaveGuild}>
                <Button variant="destructive">Leave</Button>
            </AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>