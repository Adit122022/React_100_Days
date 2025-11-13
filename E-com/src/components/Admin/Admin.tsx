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
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'



const formSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username cannot exceed 20 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(8, 'Password too long'),
})

const Admin = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('Admin Login Data:', data)
        // yahan tum API call kar sakte ho login ke liye
    }

    return (
        <div className='h-screen flex items-center justify-center'>

            <div className="bg-muted/80  border-sidebar-ring border-2 w-1/2 shadow-lg rounded-lg  py-5   overflow-hidden">
                {/* <div className="bg-muted  border-sidebar-ring border-2 w-8/12 shadow-lg rounded-lg grid grid-cols-2  overflow-hidden"> */}
                {/* Left Side Image */}
                {/* <img
                    src="/images/admin-login.jpeg"
                    alt="Admin Login"
                    className='object-cover w-full h-full'
                /> */}

                {/* Right Side Form */}
                <div className="flex flex-col justify-center  px-10 ">
                    <h2 className="text-3xl font-semibold mb-10 text-muted-foreground text-center">Admin Login</h2>

                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            {/* Username Field */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-muted-foreground'>Username</FormLabel>
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
                                        <FormLabel className='text-muted-foreground'>Email</FormLabel>
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
                                        <FormLabel className='text-muted-foreground'>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormDescription>Keep it safe and secure.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" className="w-full mt-4 ">Login</Button>

                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}

export default Admin
