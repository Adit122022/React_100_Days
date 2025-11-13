import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ModeToggle } from '../ui/mode-toggle'

const Admin = () => {
    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = (data) => {
        console.log('Admin Login Data:', data)
        // yahan tum API call kar sakte ho login ke liye
    }

    return (
        <div className=' h-screen flex items-center justify-center'>

            <div className="border-white border-2 w-8/12 shadow-lg rounded-lg  overflow-hidden">
                {/* Left Side Image */}
                {/* <img
                    src="/images/admin-login.jpeg"
                    alt="Admin Login"
                    className='object-cover w-full h-full'
                /> */}

                {/* Right Side Form */}
                <div className="flex flex-col justify-center px-10 py-8">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            {/* Username Field */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter username" {...field} />
                                        </FormControl>
                                        <FormDescription>This will be your admin username.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="admin@example.com" type="email" {...field} />
                                        </FormControl>
                                        <FormDescription>Your official admin email.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormDescription>Keep it safe and secure.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" className="w-full mt-4">Login</Button>

                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default Admin
