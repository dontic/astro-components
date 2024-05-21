/* --------------------------------- IMPORTS -------------------------------- */
// React
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

// Lucide Icons
import { Loader2 } from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */
const APIENDPOINT = '/api/brevo/createbrevocontact'
const SUCCESSMESSAGE = {
    title: "Thank You!",
    description: "We've added you to the waitlist. We will soon send you an email with more information."
}

/* ----------------------------------- Zod ---------------------------------- */
const WaitlistFormSchema = z.object({
    email: z
        .string()
        .min(1, "Please input an email address.")
        .email("Please input a valid email address.")
});

type WaitlistFormValues = z.infer<typeof WaitlistFormSchema>;

/* --------------------------------- Component ------------------------------- */
const WaitlistForm = () => {
    /* ---------------------------------- Hooks --------------------------------- */
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const form = useForm<WaitlistFormValues>({
        resolver: zodResolver(WaitlistFormSchema),
        defaultValues: {
            email: ""
        }
    });

    /* -------------------------------- Functions ------------------------------- */
    const onSubmit = async (data: WaitlistFormValues) => {
        setIsSubmitting(true);

        // Add contact to Brevo list
        const response = await fetch(APIENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // If successful, reset form and show success message
        if (response.ok) {
            form.reset();
            setIsSuccess(true);
        } else {
            // If failed, show error message
            console.error("Failed to add contact");
            setIsSuccess(false);
            setError("An error has occurred, please try again later.");
        }

        setIsSubmitting(false);
    };

    /* --------------------------------- Render --------------------------------- */
    return (
        <>
            {isSuccess && (
                <Alert className="mb-3 md:mb-8 bg-green-100 border-green-300">
                    <AlertTitle>{SUCCESSMESSAGE.title}</AlertTitle>
                    <AlertDescription>
                        {SUCCESSMESSAGE.description}
                    </AlertDescription>
                </Alert>
            )}
            {!isSuccess && error && (
                <Alert className="mb-8 bg-red-100 border-red-300">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 md:space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-transparent"
                                        placeholder="example@gmail.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting}>
                        <Loader2
                            className={`w-6 h-6 mr-2 animate-spin ${isSubmitting ? "block" : "hidden"
                                }`}
                        />
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default WaitlistForm;
