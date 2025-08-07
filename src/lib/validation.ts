import { z } from "zod";

// 認証関連スキーマ
export const authSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password must be no more than 32 characters long"),
});

export const signInSchema = authSchema;
export const signUpSchema = authSchema;

// 映画関連スキーマ
export const watchedFilmSchema = z.object({
    filmId: z.number(),
    watchedDate: z.string(),
    rating: z.number().min(0).max(5),
    note: z.string().optional(),
});

export const watchlistSchema = z.object({
    filmId: z.number(),
    recommendedBy: z.string().optional(),
    note: z.string().optional(),
    isWatched: z.boolean(),
});

export const updateWatchedFilmSchema = z.object({
    filmId: z.number().optional(),
    watchedDate: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    note: z.string().optional(),
});

export const updateWatchlistSchema = z.object({
    recommendedBy: z.string().optional(),
    note: z.string().optional(),
    isWatched: z.boolean().optional(),
});

// TODO関連スキーマ
export const todoSchema = z.object({
    title: z.string().min(1, "Title is required"),
});

export const updateTodoSchema = z.object({
    title: z.string().optional(),
    completed: z.boolean().optional(),
});

// 共通型定義
export type AuthRequest = z.infer<typeof authSchema>;
export type WatchedFilmRequest = z.infer<typeof watchedFilmSchema>;
export type WatchlistRequest = z.infer<typeof watchlistSchema>;
export type UpdateWatchedFilmRequest = z.infer<typeof updateWatchedFilmSchema>;
export type UpdateWatchlistRequest = z.infer<typeof updateWatchlistSchema>;
export type TodoRequest = z.infer<typeof todoSchema>;
export type UpdateTodoRequest = z.infer<typeof updateTodoSchema>;
