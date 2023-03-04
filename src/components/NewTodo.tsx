import { Button, Input, Stack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, FormEventHandler } from 'react';
import { createTodo } from '../services/todos';
import { Todo } from '../types/todo';

const NewTodo = () => {
    const [title, setTitle] = useState('');

    const client = useQueryClient();

    const { mutate: create } = useMutation({
        mutationFn: createTodo,
        // onSuccess: () => {
        //   client.invalidateQueries({ queryKey: ['todos', 'all'] });
        // },
        onSuccess: (newTodo) => {
            // /* case 1 */
            // const data = client.getQueryData(['todos', 'all']);
            // client.setQueriesData<Todo[]>(['todos', 'all'], [...([data] || []), newTodo]);
            /* case 2 */
            client.setQueriesData<Todo[]>(['todos', 'all'], (oldTodos) => {
                return [...(oldTodos || []), newTodo];
            });
            client.invalidateQueries({
                queryKey: ['todos', 'all'],
                refetchType: 'none',
            });
        },
    });

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (title) {
            create(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={submit}>
            <Stack direction="row">
                <Input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="new todo..."
                />
                <Button type="submit">Add todo</Button>
            </Stack>
        </form>
    );
};

export { NewTodo };