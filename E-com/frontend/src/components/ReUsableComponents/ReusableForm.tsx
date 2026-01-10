// components/ReusableForm.tsx
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { z } from "zod";
import { Input } from "../ui/input";

interface Field {
    name: "username" | "email" | "password";
    label: string;
    type?: string;
    placeholder?: string;
    description?: string;
}

interface ReusableFormProps {
    schema: z.ZodTypeAny;
    fields: Field[];
    title: string;
    onSubmit: (data: Field) => void;
}

export const ReusableForm = ({ schema, fields, title, onSubmit }: ReusableFormProps) => {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>),
    });

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-muted/80 border-2 large:w-1/3 shadow-lg rounded-lg px-10 py-6">
                <h2 className="text-3xl mb-6 text-primary font-bold text-center">{title}</h2>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                render={({ field: controller }) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...controller}
                                                type={field.type || "text"}
                                                placeholder={field.placeholder}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
