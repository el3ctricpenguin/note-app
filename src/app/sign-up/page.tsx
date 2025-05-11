"use client";

import React, { use, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button, FormControl, FormLabel, Heading, Input, VStack, FormErrorMessage, Link, useToast } from "@chakra-ui/react";
import { sleep } from "@/features/utils/sleep";
import AuthHeader from "@/components/layout/AuthHeader";

const signUpSchema = z
    .object({
        username: z.string().min(1, "ユーザー名は必須です"),
        password: z.string().min(8, "パスワードは8文字以上である必要があります").max(32, "パスワードは32文字以下である必要があります"),
        confirmPassword: z
            .string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(32, "パスワードは32文字以下である必要があります"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "パスワードが一致しません",
        path: ["confirmPassword"],
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage: React.FC = () => {
    const toast = useToast();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    });

    const [isPending, setPending] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setPending(true);
            const response = await fetch("/api/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: data.username, password: data.password }),
            });
            const responseBody = await response.json();

            if (!response.ok) throw new Error(responseBody.error);

            toast({ title: "ユーザー登録に成功しました", status: "success" });
            await sleep(2);
            router.push("/");
        } catch (error) {
            console.error("Sign up error:", error);
            toast({ title: "ユーザー登録に失敗しました", status: "error" });
        } finally {
            setPending(false);
        }
    });

    return (
        <>
            <AuthHeader />
            <FormControl as="form" onSubmit={onSubmit}>
                <VStack spacing={3} align="start">
                    <FormControl id="sign-up-username" isInvalid={!!errors.username}>
                        <FormLabel fontSize="lg" mb={1}>
                            ユーザー名
                        </FormLabel>
                        <Input type="text" {...register("username")} variant="filled" />
                        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="sign-up-password" isInvalid={!!errors.password}>
                        <FormLabel fontSize="lg" mb={1}>
                            パスワード
                        </FormLabel>
                        <Input type="password" {...register("password")} variant="filled" />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="sign-up-confirm-password" isInvalid={!!errors.confirmPassword}>
                        <FormLabel fontSize="lg" mb={1}>
                            パスワード確認
                        </FormLabel>
                        <Input type="password" {...register("confirmPassword")} variant="filled" />
                        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                    </FormControl>
                    <Button
                        type="submit"
                        color="brand.gray.0"
                        bgColor="brand.gray.1000"
                        _hover={{ color: "brand.gray.0", bgColor: "brand.gray.1000", opacity: 0.75 }}
                        isLoading={isPending}
                        loadingText="登録中"
                    >
                        登録
                    </Button>
                </VStack>
            </FormControl>
        </>
    );
};

export default SignUpPage;
