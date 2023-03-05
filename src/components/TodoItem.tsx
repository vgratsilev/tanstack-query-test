import { Checkbox, ListItem, Stack } from '@chakra-ui/react';
import { Todo } from 'types/todo';
import { useToggleTodo } from 'hooks/useToggleTodo';

const TodoItem = ({ completed, id, title }: Todo) => {
    const toggle = useToggleTodo({ id, completed });

    return (
        <ListItem>
            <Stack
                spacing={4}
                direction="row"
                onClick={() => toggle()}
            >
                <Checkbox isChecked={completed}>{title}</Checkbox>
            </Stack>
        </ListItem>
    );
};

export { TodoItem };
