"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { Icons } from "@/components/icons";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { filterCreateSchema } from "@/lib/validation/filter";
import { FilterType } from "@/types";

async function createPost(name: string, variant: FilterType)
  : Promise<boolean> {
  const response = await fetch(`/api/${variant}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  if(!response?.ok) {
    toast({
      title: "Произошла ошибка",
      description: "Не удалось создать новый пост. Попробуйте снова.",
      variant: "destructive"
    });
    return false;
  }

  toast({
    title: "Успешно",
    description: "Новый пост был успешно добавлен",
  });
  return true;
}

export default function AddFilter({ 
  variant = "default",
  filterType
}: { 
  variant?: "outline" | "default",
  filterType: FilterType
}) {
  const router = useRouter();

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async(values: z.infer<typeof filterCreateSchema>) => {
    const { name } = values;

    setIsLoading(true);

    const createdPost = await createPost(name, filterType);
    
    if(createdPost) {
      setIsLoading(false);
      router.refresh();
    }

    setIsLoading(false);
    setShowDialog(false);
  };

  const form = useForm<z.infer<typeof filterCreateSchema>>({
    resolver: zodResolver(filterCreateSchema),
    defaultValues: {
      name: ""
    },
    mode: "onChange"
  });

  useEffect(() => {
    form.reset();
  }, [showDialog])

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant={variant}>Добавить</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">Добавление</DialogTitle>
          <DialogDescription>
            Занесите данные в поля для добавления
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder={
                        filterType === "color"
                          ? "Красный"
                          : "Грузовой"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={isLoading || !form.formState.isValid}
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Добавить</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}