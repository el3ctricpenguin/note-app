import { Button, FormControl, FormLabel, Heading, Input, VStack, FormErrorMessage, Link } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
    username: z.string().min(1, "ユーザー名は必須です"),
    password: z.string().min(8, "パスワードは8文字以上である必要があります").max(32, "パスワードは32文字以下である必要があります"),
});

type FormData = z.infer<typeof signInSchema>;

export default function SignIn() {
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(signInSchema),
    });

    const credentialsAction = async (data: FormData) => {
        const result = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
        });

        console.log("SignIn result:", result);

        if (result?.error) {
            let message = "ログインに失敗しました";
            if (result.error === "CredentialsSignin") {
                message = "ユーザー名またはパスワードが正しくありません";
            }
            toast({
                title: message,
                status: "error",
            });
        } else {
            toast({
                title: "ログインに成功しました",
                status: "success",
            });
        }
    };

    return (
        <>
            <Heading size="xl" mb={4}>
                <Link _hover={{ textDecoration: "none" }} cursor="normal" mr={4}>
                    /sign-in
                </Link>
                <Link as={NextLink} href="/sign-up">
                    /sign-up
                </Link>
            </Heading>
            <FormControl as="form" onSubmit={handleSubmit(credentialsAction)}>
                <VStack spacing={4} align="start">
                    <FormControl id="credentials-username" isInvalid={!!errors.username}>
                        <FormLabel fontSize="lg">ユーザー名</FormLabel>
                        <Input type="text" {...register("username")} />
                        <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl id="credentials-password" isInvalid={!!errors.password}>
                        <FormLabel fontSize="lg">パスワード</FormLabel>
                        <Input type="password" {...register("password")} />
                        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit">ログイン</Button>
                </VStack>
            </FormControl>
        </>
    );
}
