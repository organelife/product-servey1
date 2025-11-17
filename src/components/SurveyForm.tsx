import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit mobile number" }),
  panchayath: z.string().trim().min(2, { message: "Panchayath is required" }).max(100, { message: "Panchayath must be less than 100 characters" }),
  ward: z.string().trim().min(1, { message: "Ward is required" }).max(50, { message: "Ward must be less than 50 characters" }),
  userType: z.enum(["customer", "agent"], { required_error: "Please select user type" }),
  products: z.string().trim().min(10, { message: "Please provide at least 10 characters describing the products/services" }).max(1000, { message: "Description must be less than 1000 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function SurveyForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      panchayath: "",
      ward: "",
      userType: undefined,
      products: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Survey submitted:", values);
    setIsSubmitted(true);
    toast.success("Survey submitted successfully!");
    form.reset();
    
    // Reset success state after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <CheckCircle2 className="h-16 w-16 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Thank You!</h2>
          <p className="text-muted-foreground text-lg">
            Your response has been recorded successfully. We appreciate your valuable feedback.
          </p>
        </div>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" size="lg">
          Submit Another Response
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in duration-500">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter 10-digit mobile number" type="tel" maxLength={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="panchayath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Panchayath</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your panchayath" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ward"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ward</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your ward" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>I am a</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="customer" id="customer" />
                    <label htmlFor="customer" className="flex-1 cursor-pointer font-medium">
                      Customer
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="agent" id="agent" />
                    <label htmlFor="agent" className="flex-1 cursor-pointer font-medium">
                      Agent
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products/Services You Want to See on Our App</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe the products or services you would like to see on our app..."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full">
          Submit Survey
        </Button>
      </form>
    </Form>
  );
}
