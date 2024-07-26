import { Box, Button, Checkbox, Divider, FormControl, Heading, HStack, Input, VStack } from "@chakra-ui/react";
import { Todo } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function TodoPage() {
    const [inputValue, setInputValue] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        const response = await fetch(`${apiUrl}/todo`, { method: "GET" });
        const todos = await response.json();
        console.log(todos);
        setTodos(todos);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const createTodo = async (title: string) => {
        console.log(`create ${title}`);
        const response = await fetch(`${apiUrl}/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });
        return await response.json();
    };

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        await createTodo(inputValue);
        await fetchTodos();
        setInputValue("");
    };

    const deleteTodo = async (id: Number) => {
        console.log(`delete #${id}`);
        const response = await fetch(`${apiUrl}/todo/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    };

    const handleDelete = async (id: Number) => {
        await deleteTodo(id);
        await fetchTodos();
    };

    const updateTodo = async (id: Number) => {
        console.log(`update #${id}`);
        const response = await fetch(`${apiUrl}/todo/${id}`, {
            method: "PATCH",
        });
        return await response.json();
    };

    const handleCheck = async (id: Number) => {
        await updateTodo(id);
        await fetchTodos();
    };

    return (
        <Box w="100vw" h="100vh" bgColor="gray.50" p={20}>
            <VStack align="start" spacing={2}>
                <Heading>Todo</Heading>
                <VStack divider={<Divider />} spacing={0} borderRadius={6} bgColor="gray.100" w="100%">
                    {todos.map((todo, i) => (
                        <HStack key={i} justify="space-between" p={2} w="100%" _hover={{ bgColor: "whiteAlpha.700" }}>
                            <Checkbox
                                isChecked={todo.completed}
                                onChange={() => {
                                    handleCheck(todo.id);
                                }}
                                size="md"
                            >
                                {todo.title}
                            </Checkbox>
                            <Button
                                onClick={async () => {
                                    handleDelete(todo.id);
                                }}
                                colorScheme="red"
                                size="sm"
                            >
                                Delete
                            </Button>
                        </HStack>
                    ))}
                </VStack>
                <FormControl as="form" onSubmit={handleSubmit}>
                    <HStack>
                        <Input
                            value={inputValue || ""}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            placeholder="Input todo"
                            size="sm"
                        />
                        <Button colorScheme="green" size="sm" type="submit">
                            Submit
                        </Button>
                    </HStack>
                </FormControl>
            </VStack>
        </Box>
    );
}
