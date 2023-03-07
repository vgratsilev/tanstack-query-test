import { Todo } from 'types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, toggleTodoStatus } from 'services/todos';

const useCreateTodo = () => {
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

    return { create };
};

export { useCreateTodo };
