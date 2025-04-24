<script lang="ts" module>
import * as Table from '$lib/components/ui/table/index.js';
import * as Card from '$lib/components/ui/card/index.js';

const variables = await fetch('https://api.buttercup.boo/builtins/variables').then(
    (res) => res.json(),
);
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Message Variables</Card.Title>
    </Card.Header>
    <Card.Content>
        <Table.Root>
        <Table.Header>
            <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Variable</Table.Head>
            <Table.Head>Interaction</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {#each variables as variable (variable)}
            <Table.Row>
            <Table.Cell class="font-medium">{variable.name}</Table.Cell>
            <Table.Cell>{variable.variable}</Table.Cell>
            <Table.Cell>{variable.interaction}</Table.Cell>
            </Table.Row>
            {/each}
        </Table.Body>
        </Table.Root>
    </Card.Content>
</Card.Root>
