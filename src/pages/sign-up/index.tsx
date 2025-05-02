import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Button, FormControl, FormLabel, Heading, Input, VStack, FormErrorMessage, Link, useToast } from "@chakra-ui/react";
import NextLink from "next/link";

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

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const response = await fetch("/api/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });

            if (response.ok) {
                toast({
                    title: "ユーザー登録に成功しました",
                    status: "success",
                });
                router.push("/sign-in");
            } else {
                const errorData = await response.json();
                toast({
                    title: "ユーザー登録に失敗しました",
                    status: "error",
                    description: errorData.message,
                });
            }
        } catch (error) {
            console.error("Sign-up error:", error);
            toast({
                title: "ユーザー登録に失敗しました",
                status: "error",
                description: `${error}`,
            });
        }
    };

    return (
        <>
            <Heading size="xl" mb={4}>
                <Link as={NextLink} href="/sign-in" mr={4}>
                    /sign-in
                </Link>
                <Link _hover={{ textDecoration: "none" }} cursor="normal">
                    /sign-up
                </Link>
            </Heading>
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} align="start">
                    <FormControl id="sign-up-username" isInvalid={!!errors.username}>
                        <FormLabel fontSize="lg">ユーザー名</FormLabel>
                        <Input type="text" {...register("username")} />
                        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="sign-up-password" isInvalid={!!errors.password}>
                        <FormLabel fontSize="lg">パスワード</FormLabel>
                        <Input type="password" {...register("password")} />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="sign-up-confirm-password" isInvalid={!!errors.confirmPassword}>
                        <FormLabel fontSize="lg">パスワード確認</FormLabel>
                        <Input type="password" {...register("confirmPassword")} />
                        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit">登録</Button>
                </VStack>
            </FormControl>
        </>
    );
};

export default SignUpPage;
