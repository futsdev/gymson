import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CreateSubscriptionService } from "@/services/subscription.services";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const subscriptionSchema = z.object({
    name: z.string().nonempty("Name is required"),
    slug: z.string().nonempty("Slug is required"),
    features: z.string().nonempty("At least one feature is required"),
    priceMonthly: z
        .string()
        .nonempty("Price is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Price must be a number greater than 0",
        }),
    isMostPopular: z.boolean(),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;


export function CreateSubscriptionModal({ }) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<SubscriptionFormValues>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: {
            name: "",
            slug: "",
            features: "",
            priceMonthly: "",
            isMostPopular: false,
        },
        mode: "onChange",
    });

    const onSubmit = async (values: SubscriptionFormValues) => {
        try {
            await CreateSubscriptionService({
                ...values,
                features: values.features
                    .split("\n")
                    .map((f) => f.trim())
                    .filter(Boolean),
                priceMonthly: Number(values.priceMonthly),
            });
            toast.success("Subscription created successfully");
            setIsOpen(false) // Optionally close on submit
        } catch (error) {
            toast.error("Error creating subscription");
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
                    <Plus className="size-4" />
                    Add Subscription
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Subscription</DialogTitle>
                    <DialogDescription>
                        Enter the details for your subscription plan.
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="create-subscription-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FieldGroup>
                        {/* Name */}
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input {...field} id="name" placeholder="Pro Plan" />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />

                        {/* Slug */}
                        <Controller
                            name="slug"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="slug">Slug</FieldLabel>
                                    <Input {...field} id="slug" placeholder="pro-plan" />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />

                        {/* Features */}
                        <Controller
                            name="features"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="features">Features</FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="features"
                                        name="features"
                                        rows={4}
                                        placeholder="One feature per line"
                                    />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />


                        {/* Price */}
                        <Controller
                            name="priceMonthly"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="priceMonthly">Monthly Price ($)</FieldLabel>
                                    <Input {...field} id="priceMonthly" type="number" placeholder="29.99" />
                                    {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                </Field>
                            )}
                        />

                        {/* Is Most Popular */}
                        <Controller
                            name="isMostPopular"
                            control={form.control}
                            render={({ field }) => (
                                <Field orientation="horizontal">
                                    <Checkbox
                                        {...field}
                                        id="isMostPopular"
                                        name="isMostPopular"
                                        className="size-4"
                                    // checked={field.value}
                                    />
                                    <FieldLabel htmlFor="isMostPopular">Most Popular?</FieldLabel>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        form="create-subscription-form"
                        type="submit"
                        disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isValid ||
                            !form.formState.isDirty
                        }
                    >
                        {form.formState.isSubmitting ? <Spinner /> : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
