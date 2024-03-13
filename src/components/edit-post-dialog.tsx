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

import { postSchema } from "@/lib/validation/post";
import { FilterItem, Transport } from "@/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

  const fetchColors = async() => {
    try {
      const response = await fetch("/api/posts/colors");
      const data = await response.json();
      setColors(data as FilterItem[]);
    } catch(err) {
      console.error(err);
    }
  }

  const fetchCategories = async() => {
    try {
      const response = await fetch("/api/posts/categories");
      const data = await response.json();
      setCategories(data as FilterItem[]);
    } catch(err) {
      console.error(err);
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      // crope image for 800x600 resolution
      reader.onloadend = async () => {
        const img = new Image();
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          let width, height;
  
          if (aspectRatio > 800 / 600) {
            width = 800;
            height = Math.round(800 / aspectRatio);
          } else {
            width = Math.round(600 * aspectRatio);
            height = 600;
          }
  
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
  
          const resizedImage = canvas.toDataURL("image/jpeg", 0.8);
          setImage(resizedImage);
        };
  
        img.src = reader.result as string;
      };
  
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = async(values: z.infer<typeof postSchema>) => {
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

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      name: post.name,
      plate: post.plate,
    }
  });

  useEffect(() => {
    fetchColors();
    fetchCategories();

    setColorId(String(post.colorId));
    setCategoryId(String(post.categoryId));
    setImage(post.image);
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
            onChange={(e) => handleFileUpload(e)} 
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
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2"
          >
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

            <DialogFooter>
              <Button
                disabled={isLoading || !form.formState.isValid}
                type="submit"
              > 
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>Изменить</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}