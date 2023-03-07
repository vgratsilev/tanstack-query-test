import { Button, Input, Stack } from '@chakra-ui/react';
import { FormEventHandler, useState } from 'react';
import { useCreateTodo } from 'hooks/useCreateTodo';

const NewTodo = () => {
    const [title, setTitle] = useState('');

    const { create } = useCreateTodo();

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
