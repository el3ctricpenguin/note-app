"use client";

import { Button, FormControl, FormLabel, Input, VStack, FormErrorMessage } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { sleep } from "@/features/utils/sleep";
import { useRouter } from "next/navigation";
import AuthHeader from "@/components/layout/AuthHeader";

const signInSchema = z.object({
    username: z.string().min(1, "ユーザー名は必須です"),
    password: z.string().min(8, "パスワードは8文字以上である必要があります").max(32, "パスワードは32文字以下である必要があります"),
});

type FormData = z.infer<typeof signInSchema>;

export default function SignIn() {
    const router = useRouter();
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signInSchema),
    });

    const [isPending, setPending] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setPending(true);
            const response = await fetch("/api/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: data.username, password: data.password }),
            });
            const responseBody = await response.json();

            if (!response.ok) throw new Error(responseBody.error);

            toast({ title: "ログインに成功しました", status: "success" });
            await sleep(2);
            router.push("/");
        } catch (error) {
            console.error("Sign in error:", error);
            toast({ title: "ログインに失敗しました", status: "error" });
        } finally {
            setPending(false);
        }
    });

    return (
        <>
            <FormControl as="form" onSubmit={onSubmit}>
                <AuthHeader />
                <VStack spacing={3} align="start">
                    <FormControl id="credentials-username" isInvalid={!!errors.username}>
                        <FormLabel fontSize="lg" mb={1}>
                            ユーザー名
                        </FormLabel>
                        <Input type="text" {...register("username")} variant="filled" />
                        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="credentials-password" isInvalid={!!errors.password}>
                        <FormLabel fontSize="lg" mb={1}>
                            パスワード
                        </FormLabel>
                        <Input type="password" {...register("password")} variant="filled" />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                        type="submit"
                        color="brand.gray.0"
                        bgColor="brand.gray.1000"
                        _hover={{ color: "brand.gray.0", bgColor: "brand.gray.1000", opacity: 0.75 }}
                        isLoading={isPending}
                        loadingText="ログイン中"
                    >
                        ログイン
                    </Button>
                </VStack>
            </FormControl>
        </>
    );
}
