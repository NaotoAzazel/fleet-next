"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { Icons } from "@/components/icons";

import { FilterItem, FilterType } from "@/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { filterUpdateSchema } from "@/lib/validation/filter";

async function updatePost(
  postType: FilterType,
  postId: number,
  name: string
) {
  const response = await fetch(`/api/posts/${postType}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ postId, name })
  });

  if(!response?.ok) {
    toast({
      title: "Произошла ошибка",
      description: "Не удалось обновить пост. Попробуйте снова.",
      variant: "destructive"
    });
    return false;
  }
  
  toast({
    title: "Успешно",
    description: `${name} был успешно обновлен`,
  });
  return true;
}

export default function EditFilter({ 
  data,
  type,
  showEditDialog,
  setShowEditDialog
}: { 
  data: FilterItem,
  type: FilterType,
  showEditDialog: boolean,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async(values: z.infer<typeof filterUpdateSchema>) => {
    const { name } = values;

    setIsLoading(true);

    const updatedPost = await updatePost(type, data.id, name);
    
    if(updatedPost) {
      setIsLoading(false);
      router.refresh();
    }

    setIsLoading(false);
    setShowEditDialog(false);
  };

  const form = useForm<z.infer<typeof filterUpdateSchema>>({
    resolver: zodResolver(filterUpdateSchema),
    defaultValues: {
      name: data.name,
    },
    mode: "onChange"
  });

  useEffect(() => {
    form.reset();
    form.setValue("name", data.name);
  }, [showEditDialog])

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">Изменение</DialogTitle>
          <DialogDescription>
            Сейчас вы кастомизируете {data.name}
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
                        placeholder="Красный"
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
              <span>Изменить</span>
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}