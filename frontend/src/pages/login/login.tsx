import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { LoginService } from "@/services/auth.services";
import { useUserStore } from "@/stores/user-store";
import { Spinner } from "@/components/ui/spinner";
import { GetTenantByNameService } from "@/services/tenant.services";
import { toast } from "sonner";

const loginSchema = z.object({
    tenant: z.string().nonempty("Tenant is required"),
    tenantId: z.string().nonempty("Tenant ID is required"),
    email: z.string()
        .nonempty("Email is required")
        .refine((value) => {
            // This is a regular expression that matches valid email addresses
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }, {
            message: "Invalid email address",
        }),
    password: z.string().nonempty("Password is required"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
    const gymId = useUserStore((state) => state.gymId);
    const gymName = useUserStore((state) => state.gymName);
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    const [isTenantValidating, setIsTenantValidating] = useState<boolean>(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            tenant: gymName || "",
            tenantId: gymId || "",
            email: "",
            password: "",
        },
        mode: 'onChange',
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            // const response = await LoginService(values);
            // setUserInfo({
            //     id: response.id,
            //     name: response.name,
            //     email: response.email,
            //     role: response.role,
            //     gymName: response.gymName,
            //     gymId: response.gymId,
            //     token: response.token,
            // });

            setUserInfo({
                id: "user-id",
                name: "John Doe",
                email: "yDv0W@example.com",
                role: "admin",
                gymName: "validTenant",
                gymId: "gym-id",
                token: "token",
            });
        } catch (error) {
            toast.error("Error logging in. Please check your credentials.");
            console.error("Login failed", error);
        }
    };


    // ✅ Tenant validation simulation
    const handleTenantChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const tenantValue = e.target.value;
        form.setValue("tenant", tenantValue);

        if (tenantValue) {
            setIsTenantValidating(true);
            try {
                // const result = await GetTenantByNameService(tenantValue);
                // setIsTenantValid(!!result.data.tenantId)
                // form.setValue("tenantId", result.data.tenantId || "");

                // Fake async validation
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Example condition
                form.setValue("tenantId", tenantValue === "validTenant" ? "some-tenant-id" : "");
            } catch (error) {
                toast.error("Error validating tenant");
                console.error("Error validating tenant", error);
            } finally {
                setIsTenantValidating(false);
            }
        }
    };

    return (
        <div className="flex flex-col grow items-center justify-center overflow-auto p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your credentials to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="login-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            {/* Tenant */}
                            <Controller
                                name="tenant"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="tenant">Tenant</FieldLabel>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                id="tenant"
                                                placeholder="tenant-id"
                                                className="pr-10"
                                                onChange={handleTenantChange}
                                            />
                                            {/* Validation icons */}
                                            {!isTenantValidating && field.value && form.getValues("tenantId") && (
                                                <CheckIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                            )}
                                            {!isTenantValidating && field.value && !form.getValues("tenantId") && (
                                                <XIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                                            )}
                                            {isTenantValidating && (
                                                <Spinner className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 animate-spin" />
                                            )}
                                        </div>
                                        {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                    </Field>
                                )}
                            />


                            {/* Email */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input {...field} id="email" type="email" placeholder="m@example.com" />
                                        {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                    </Field>
                                )}
                            />

                            {/* Password */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex items-center justify-between">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <a
                                                href="#"
                                                className="text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input {...field} id="password" type="password" />
                                        {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                {/* Submit */}
                <CardFooter className="flex-col gap-2">
                    <Button
                        form="login-form"
                        type="submit"
                        className="w-full"
                        disabled={
                            isTenantValidating ||
                            form.formState.isSubmitting ||
                            !form.formState.isValid ||
                            !form.formState.isDirty ||
                            !form.getValues("tenantId")
                        }
                    >
                        {form.formState.isSubmitting ? <Spinner /> : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;