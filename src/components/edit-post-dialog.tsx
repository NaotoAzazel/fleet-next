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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { Icons } from "@/components/icons";
import SelectFilter from "@/components/select";
import Loading from "@/components/loading";
import { Image } from "@/components/image";

import { postUpdateSchema } from "@/lib/validation/post";
import { FilterItem, Transport } from "@/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn, formatImage } from "@/lib/utils";
import { fetchData } from "@/lib/posts";

export async function updatePost(
  postId: number,
  name: string,
  colorId: number,
  categoryId: number,
  plate: string,
  image: string
) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ 
      name, 
      colorId,
      categoryId,
      plate, 
      image 
    })
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

export default function EditTransport({ 
  showEditDialog, 
  setShowEditDialog,
  post
} : {
  showEditDialog: boolean,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  post: Transport
}) {
  const router = useRouter();

  const [colors, setColors] = useState<FilterItem[]>([]);
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const [colorId, setColorId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [image, setImage] = useState<any>();

  const onSubmit = async(values: z.infer<typeof postUpdateSchema>) => {
    const { name, plate } = values;

    setIsLoading(true);

    const updatedPost = await updatePost(
      post.id, name, Number(colorId), Number(categoryId), plate, image
    );
    
    if(updatedPost) {
      setIsLoading(false);
      router.refresh();
    }

    setIsLoading(false);
    setShowEditDialog(false);
  };

  const form = useForm<z.infer<typeof postUpdateSchema>>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      name: post.name,
      plate: post.plate,
    },
    mode: "onChange"
  });

  useEffect(() => {
    const fetchFilters = async(showDialog: boolean) => {
      setIsDataLoading(true);
      
      if(showDialog) {
        const colors = await fetchData("colors");
        const categories = await fetchData("categories");
  
        setColors(colors);
        setCategories(categories);
      }

      setIsDataLoading(false);
    }

    setColorId(String(post.colorId));
    setCategoryId(String(post.categoryId));
    setImage(post.image);

    fetchFilters(showEditDialog);
    form.reset();
  }, [showEditDialog]);

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">Изменение транспорта</DialogTitle>
          <DialogDescription>
            Сейчас вы кастомизируете {isDataLoading ? "Загрузка..." : post.name}
          </DialogDescription>
        </DialogHeader>
        {isDataLoading ? (
          <Loading />
        ) : (
          <>
            <div className="space-y-2">
              <Image
                src={image}
                className={cn(
                  !post.image && "border rounded py-24"
                )}
              />
              <Input 
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => formatImage(e, setImage)} 
              />
            </div>

            <div className="flex gap-2">
              <SelectFilter 
                placeholder="Цвет" 
                items={colors} 
                value={colorId}
                onValueChange={setColorId}
              />
              <SelectFilter 
                placeholder="Категория" 
                items={categories}
                value={categoryId}
                onValueChange={setCategoryId}
              />
            </div>
            <Form {...form}>
              <form className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ламборгини"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номера</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="A1235B"
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
          </>
        )}

      </DialogContent>
    </Dialog>
  )
}