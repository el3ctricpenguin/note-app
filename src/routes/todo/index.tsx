import { apiUrl } from "@/config";
import { Box, Button, Checkbox, Divider, FormControl, Heading, HStack, Input, useColorMode, VStack } from "@chakra-ui/react";
import { Todo } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";

export default function TodoPage() {
    const { colorMode } = useColorMode();

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
        <VStack align="start" spacing={2}>
            <Heading>Todo</Heading>
            <VStack
                divider={<Divider />}
                spacing={0}
                borderRadius={6}
                bgColor="brand.gray.100"
                w="100%"
                borderWidth={1}
                borderColor="brand.gray.300"
            >
                {todos.map((todo, i) => (
                    <HStack
                        key={i}
                        justify="space-between"
                        p={2}
                        pl={3}
                        w="100%"
                        _hover={{ bgColor: colorMode == "light" ? "whiteAlpha.700" : "whiteAlpha.200" }}
                    >
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
                            color="white"
                            bgColor="red.500"
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
                    <Button size="sm" type="submit" color="white" bgColor="green.500" _hover={{ bgColor: "green.600" }}>
                        Submit
                    </Button>
                </HStack>
            </FormControl>
        </VStack>
    );
}
