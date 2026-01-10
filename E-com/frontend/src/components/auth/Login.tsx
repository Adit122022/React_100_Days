import React from 'react'
import { ReusableForm } from '../ReUsableComponents/ReusableForm'
import { createFormSchema } from '../../validators/formSchemas';

const Login = () => {
    const schema = createFormSchema({
        email: true,
        password: true,
    });

    const field = [
        { name: "email", label: "Email", type: "email", placeholder: "admin@example.com" },
        { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
    ];
    const submitHandler = (data) => {
        console.log("LOGin FOrm DAta", data)
    }
    return (
        <div>

            <ReusableForm
                fields={field}
                schema={schema}
                title="Login"
                onSubmit={(data) => console.log("LOGin FOrm DAta", data)}
            />

        </div>
    )
}

export default Login
