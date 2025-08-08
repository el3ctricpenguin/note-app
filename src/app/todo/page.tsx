"use client";

import { fetchJsonWithAuth, fetchWithAuth } from "@/lib/fetchWithAuth";
import { disabledLinkStyle } from "@/config/theme/styles";
import { Button, Checkbox, Divider, FormControl, Heading, HStack, Input, useColorMode, VStack } from "@chakra-ui/react";
import { Todo } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";

export default function TodoPage() {
    const { colorMode } = useColorMode();

    const [inputValue, setInputValue] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        try {
            const todos = await fetchJsonWithAuth<Todo[]>(`/api/todo`);
            setTodos(todos);
        } catch (error) {
            console.error("Failed to fetch todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const createTodo = async (title: string) => {
        console.log(`create ${title}`);
        try {
            const result = await fetchJsonWithAuth(`/api/todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            });
            return result;
        } catch (error) {
            console.error("Failed to create todo:", error);
            throw error;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        try {
            await createTodo(inputValue);
            await fetchTodos();
            setInputValue("");
        } catch (error) {
            // エラーハンドリングは各関数内で処理済み
        }
    };

    const deleteTodo = async (id: Number) => {
        console.log(`delete #${id}`);
        try {
            const result = await fetchJsonWithAuth(`/api/todo/${id}`, {
                method: "DELETE",
            });
            return result;
        } catch (error) {
            console.error("Failed to delete todo:", error);
            throw error;
        }
    };

    const handleDelete = async (id: Number) => {
        await deleteTodo(id);
        await fetchTodos();
    };

    const updateTodo = async (id: Number) => {
        console.log(`update #${id}`);
        try {
            const result = await fetchJsonWithAuth(`/api/todo/${id}`, {
                method: "PATCH",
            });
            return result;
        } catch (error) {
            console.error("Failed to update todo:", error);
            throw error;
        }
    };

    const handleCheck = async (id: Number) => {
        await updateTodo(id);
        await fetchTodos();
    };

    return (
        <VStack align="start" spacing={2}>
            <Heading {...disabledLinkStyle}>/todo</Heading>
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
