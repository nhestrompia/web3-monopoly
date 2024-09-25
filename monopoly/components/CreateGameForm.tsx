"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  gameName: z.string().min(3, {
    message: "Game name must be at least 3 characters.",
  }),
  hasPassword: z.boolean(),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must be at least 6 characters.",
    }),
  hasEntryWager: z.boolean(),
  entryWager: z.number().min(0).optional(),
});

export default function CreateGameForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: "",
      hasPassword: false,
      password: "",
      hasEntryWager: false,
      entryWager: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Game Created!",
      description: `Game "${values.gameName}" has been created successfully.`,
    });
    console.log(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="gameName"
            className="text-lg font-bold text-purple-800"
          >
            Game Name
          </label>
          <Input
            id="gameName"
            {...form.register("gameName")}
            className="mt-1 rounded-none border-4 border-black bg-white text-xl font-bold text-black shadow-hard"
          />
          {form.formState.errors.gameName && (
            <p className="mt-1 text-red-600">
              {form.formState.errors.gameName.message}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="hasPassword"
            checked={form.watch("hasPassword")}
            onCheckedChange={(checked) => form.setValue("hasPassword", checked)}
          />
          <label
            htmlFor="hasPassword"
            className="text-lg font-bold text-purple-800"
          >
            Password Protected
          </label>
        </div>
        {form.watch("hasPassword") && (
          <div>
            <label
              htmlFor="password"
              className="text-lg font-bold text-purple-800"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
              className="mt-1 rounded-none border-4 border-black bg-white text-xl font-bold text-black shadow-hard"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-red-600">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Switch
            id="hasEntryWager"
            checked={form.watch("hasEntryWager")}
            onCheckedChange={(checked) =>
              form.setValue("hasEntryWager", checked)
            }
          />
          <label
            htmlFor="hasEntryWager"
            className="text-lg font-bold text-purple-800"
          >
            Entry Wager
          </label>
        </div>
        {form.watch("hasEntryWager") && (
          <div>
            <label
              htmlFor="entryWager"
              className="text-lg font-bold text-purple-800"
            >
              Wager Amount
            </label>
            <Input
              id="entryWager"
              type="number"
              {...form.register("entryWager", { valueAsNumber: true })}
              className="mt-1 rounded-none border-4 border-black bg-white text-xl font-bold text-black shadow-hard"
            />
            {form.formState.errors.entryWager && (
              <p className="mt-1 text-red-600">
                {form.formState.errors.entryWager.message}
              </p>
            )}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="w-full rounded-none border-4 border-black bg-pink-400 text-2xl font-bold uppercase text-black shadow-hard transition-transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
      >
        Create Game
      </Button>
    </form>
  );
}
