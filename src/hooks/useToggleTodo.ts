import { Todo } from 'types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTodoStatus } from 'services/todos';

type ToggleTodoProps = Pick<Todo, 'id' | 'completed'>;

const useToggleTodo = ({ id, completed }: ToggleTodoProps) => {
    const client = useQueryClient();

    const { mutate: toggle } = useMutation({
        mutationFn: () => toggleTodoStatus(id, !completed),
        onSuccess: () => client.invalidateQueries(['todos']),
    });

    return { toggle };
};

export { useToggleTodo };
