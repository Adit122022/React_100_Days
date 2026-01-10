import { createFormSchema } from "../../validators/formSchemas";
import { ReusableForm, } from "../ReUsableComponents/ReusableForm";

const schema = createFormSchema({
    username: true,
    email: true,
    password: true,
});

const field = [
    { name: "username", label: "Username", placeholder: "Enter username" },
    { name: "email", label: "Email", type: "email", placeholder: "admin@example.com" },
    { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
];

export default function AdminLogin() {
    return (
        <ReusableForm
            title="Admin Login"
            schema={schema}
            fields={field}
            onSubmit={(data) => console.log("Admin login:", data)}
        />
    );
}
