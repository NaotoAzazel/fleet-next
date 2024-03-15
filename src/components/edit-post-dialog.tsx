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
import { Icons } from "@/components/icons";
import SelectFilter from "@/components/select";

import { postUpdateSchema } from "@/lib/validation/post";
import { FilterItem, Transport } from "@/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatImage } from "@/lib/utils";
import { fetchCategories, fetchColors } from "@/lib/posts";

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
    console.error("Something went wrong when update post", response);
    return false;
  }
  
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
    const fetchData = async() => {
      const colors = await fetchColors();
      const categories = await fetchCategories();

      setColors(colors);
      setCategories(categories);
    }

    setColorId(String(post.colorId));
    setCategoryId(String(post.categoryId));
    setImage(post.image);

    fetchData();
    form.reset();
  }, [showEditDialog]);

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">Изменение транспорта</DialogTitle>
          <DialogDescription>
            Сейчас вы кастомизируете {post.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <img
            src={image}
            alt="transport-image"
            loading="lazy"
            className="inset-0 object-cover rounded border"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      </DialogContent>
    </Dialog>
  )
}