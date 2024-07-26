import BasicLayout from "@/components/layout/BasicLayout";
import TodoPage from "@/routes/todo";

export default function Index() {
    return (
        <BasicLayout>
            <TodoPage />
        </BasicLayout>
    );
}
