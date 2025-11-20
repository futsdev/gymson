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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";

export function CreateSubscriptionModal({ onCreate }: { onCreate: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // handle submit logic here

        setIsOpen(false) // Optionally close on submit
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
            <form onSubmit={handleSubmit}>
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

                    <div className="grid gap-4">
                        {/* Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Pro Plan" />
                        </div>

                        {/* Slug */}
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" name="slug" placeholder="pro" />
                        </div>

                        {/* Features */}
                        <div className="grid gap-2">
                            <Label htmlFor="features">Features</Label>
                            <textarea
                                id="features"
                                name="features"
                                className="rounded-md border bg-background p-2 text-sm"
                                rows={4}
                                placeholder="One feature per line"
                            ></textarea>
                        </div>

                        {/* Price Monthly */}
                        <div className="grid gap-2">
                            <Label htmlFor="priceMonthly">Price (Monthly)</Label>
                            <Input
                                id="priceMonthly"
                                name="priceMonthly"
                                type="number"
                                step="0.01"
                                placeholder="500"
                                min={0}
                            />
                        </div>

                        {/* Is Most Popular */}
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="isMostPopular"
                                name="isMostPopular"
                                className="size-4"
                            />
                            <Label htmlFor="isMostPopular">Most Popular</Label>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>

            </form>
        </Dialog>
    )
}
