import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { Label } from "@/components/ui/label";
import { LoginService } from "@/services/auth.services";
import { useUserStore } from "@/stores/user-store";
import { Spinner } from "@/components/ui/spinner";
import { GetTenantByNameService } from "@/services/tenant.services";
import { toast } from "sonner";

const Login = () => {
    const gymId = useUserStore((state) => state.gymId);
    const gymName = useUserStore((state) => state.gymName);
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    const [isTenantValid, setIsTenantValid] = useState<boolean | null>(null);
    const [isTenantValidating, setIsTenantValidating] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            tenant: gymName || "",
            tenantId: gymId || "",

            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            tenant: Yup.string().required("Tenant is required"),
            tenantId: Yup.string().required("Tenant ID is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
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
        },
    });

    // ✅ Tenant validation simulation
    const handleTenantChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const tenantValue = e.target.value;
        formik.setFieldValue("tenant", tenantValue);

        if (tenantValue) {
            setIsTenantValidating(true);
            try {
                // const result = await GetTenantByNameService(tenantValue);
                // setIsTenantValid(!!result.data.tenantId)
                // formik.setFieldValue("tenantId", result.data.tenantId || "");

                // Fake async validation
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Example condition
                formik.setFieldValue("tenantId", tenantValue === "validTenant" ? "some-tenant-id" : "");
            } catch (error) {
                toast.error("Error validating tenant");
                console.error("Error validating tenant", error);
            } finally {
                setIsTenantValidating(false);
            }
        } else {
            setIsTenantValid(null);
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
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                        {/* Tenant */}
                        <div className="grid gap-2">
                            <Label htmlFor="tenant">Tenant</Label>
                            <div className="relative">
                                <Input
                                    id="tenant"
                                    name="tenant"
                                    type="text"
                                    placeholder="tenant-id"
                                    value={formik.values.tenant}
                                    onChange={handleTenantChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    className="pr-10" // add right padding so text doesn't overlap icons
                                />
                                {/* Validation Icons */}
                                {!isTenantValidating && formik.values.tenant && formik.values.tenantId && (
                                    <CheckIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                                )}
                                {!isTenantValidating && formik.values.tenant && !formik.values.tenantId && (
                                    <XIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                                )}
                                {isTenantValidating && (
                                    <Spinner className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 animate-spin" />
                                )}
                            </div>

                            {formik.touched.tenant && formik.errors.tenant && (
                                <p className="text-red-500 text-sm">{formik.errors.tenant}</p>
                            )}
                        </div>


                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <CardFooter className="flex-col gap-2">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={
                                    isTenantValidating ||
                                    formik.isSubmitting ||
                                    !formik.isValid ||
                                    !formik.dirty ||
                                    !formik.values.tenantId
                                }
                            >
                                {formik.isSubmitting ? <Spinner /> : "Login"}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
