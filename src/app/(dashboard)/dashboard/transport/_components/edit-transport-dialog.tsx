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
import { MyImage } from "@/components/image";

import { postUpdateSchema } from "@/lib/validation/post";
import { FilterItem, Transport } from "@/types";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { fetchData } from "@/lib/posts";

import { uploadClient } from "@/lib/uploadcare";

interface UpdatePostParams {
  postId: number,
  name: string;
  colorId: number;
  categoryId: number;
  plate: string;
  takeBy: string;
  image: File | string;
};

export async function updatePost({
  postId,
  name,
  colorId,
  categoryId,
  plate,
  takeBy,
  image
}: UpdatePostParams) {
  try {
    if(typeof image !== "string") {
      const uploadedImage = await uploadClient.uploadFile(image);
      image = uploadedImage.uuid;
    }
  
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
        takeBy, 
        image
      })
    });
  
    if(!response?.ok) {
      throw new Error("Не удалось обновить пост. Попробуйте снова.")
    }

    toast({
      title: "Успешно",
      description: `Пост был успешно обновлен.`,
    });
    return true;
    
  } catch(error) {
    if(error instanceof Error) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive"
      });
    }

    return false;
  }
}

export function EditTransport({
  showEditDialog, 
  setShowEditDialog,
  post
}: {
  showEditDialog: boolean,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
  post: Transport
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(false);

  const [previewImage, setPreviewImage] = React.useState<string>(post.image);

  const [colors, setColors] = React.useState<FilterItem[]>([]);
  const [categories, setCategories] = React.useState<FilterItem[]>([]);

  const onSubmit = async(values: z.infer<typeof postUpdateSchema>) => {
    const { name, colorId, categoryId, plate, image } = values;

    setIsLoading(true);

    const updatedPost = await updatePost({
      postId: post.id,
      name,
      colorId,
      categoryId,
      plate,
      takeBy: post.takeBy,
      image
    });

    if(updatedPost) {
      setIsLoading(false);
      router.refresh();
    }

    setIsLoading(false);
    setShowEditDialog(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const form = useForm<z.infer<typeof postUpdateSchema>>({
    resolver: zodResolver(postUpdateSchema),
    defaultValues: {
      name: post.name,
      plate: post.plate,
      color: post.color.name,
      colorId: post.colorId,
      category: post.category.name,
      categoryId: post.categoryId,
      image: post.image
    },
    mode: "onChange"
  });

  React.useEffect(() => {
    form.reset({
      name: post.name,
      plate: post.plate,
      color: post.color.name,
      colorId: post.colorId,
      category: post.category.name,
      categoryId: post.categoryId,
      image: post.image
    });
  }, [post, form])

  React.useEffect(() => {
    const fetchFilters = async(isShowDialog: boolean) => {
      setIsDataLoading(true);

      if(isShowDialog) {
        const colors = await fetchData("color");
        const categories = await fetchData("category");
        
        setCategories(categories);
        setColors(colors);
      }

      setIsDataLoading(false);
    }

    fetchFilters(showEditDialog);
  }, [showEditDialog])
  
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">
            Изменение транспорта
          </DialogTitle>
          <DialogDescription>
            Сейчас вы кастомизируете {isDataLoading ? "Загрузка..." : post.name}
          </DialogDescription>
        </DialogHeader>
        {isDataLoading ? (
          <Loading />
        ): (
          <>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <div className="space-y-2">
                  <MyImage.Container>
                    <MyImage
                      src={form.getValues("image") as string} 
                      className={cn(
                        !post.image && "border rounded py-24"
                      )}
                    />
                  </MyImage.Container>
            
                  <FormField
                    control={form.control}
                    name="image" 
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="file"
                            onChange={(e) => {
                              if(e.target.files) {
                                handleImageChange(e);
                                field.onChange(e.target.files[0]);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="colorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectFilter
                          placeholder="Цвет" 
                          items={colors}
                          value={String(form.getValues("colorId"))}
                          onValueChange={(value) => {
                            field.onChange(Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SelectFilter
                          placeholder="Категории" 
                          items={categories}
                          value={String(form.getValues("categoryId"))}
                          onValueChange={(value) => {
                            field.onChange(Number(value))
                          }}
                        />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
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
                            autoComplete="off"
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