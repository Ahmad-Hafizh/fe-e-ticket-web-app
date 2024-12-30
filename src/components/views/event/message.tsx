"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { basicGetApi } from "@/app/config/axios";

const formSchema = z.object({
  reviewScore: z.string().min(1, {
    message: "Score must be filled",
  }),
  reviewContent: z.string().min(10, {
    message: "Review must be at least 10 characters.",
  }),
  reviewImage: z.any().optional(),
});

export default function ReviewSubmit({ eventId }: { eventId: string }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reviewScore: "",
      reviewContent: "",
      reviewImage: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payLoad = {
      userId: 17,
      eventId: parseInt(eventId),
      reviewScore: values.reviewScore,
      reviewContent: values.reviewContent,
      reviewImage: values.reviewImage,
    };
    const callApi = async () => {
      const response = await basicGetApi.post("/review", payLoad);
    };
    callApi();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-5 w-full"
      >
        <div className="flex items-center gap-3">
          <h1 className="font-bold">Score:</h1>
          <FormField
            control={form.control}
            name="reviewScore"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Score</SelectLabel>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col items-start gap-3">
          <h1 className="font-bold">Show us the fun pict:</h1>
          <FormField
            control={form.control}
            name="reviewImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <h1 className="font-bold">How excited is the show?</h1>
          <FormField
            control={form.control}
            name="reviewContent"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea placeholder="Tell us your experience" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">SHARE! 🥳</Button>
      </form>
    </Form>
  );
}
