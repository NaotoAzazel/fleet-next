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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { Icons } from "@/components/icons";
import SelectFilter from "@/components/select";
import Loading from "@/components/loading";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { postCreateSchema } from "@/lib/validation/post";
import { fetchData } from "@/lib/posts";

import { FilterItem } from "@/types";
import { uploadClient } from "@/lib/uploadcare";

interface CreatePostParams {
  name: string;
  colorId: number;
  categoryId: number;
  plate: string;
  image: File;
};

async function createPost({
  name,
  colorId,
  categoryId,
  plate,
  image
}: CreatePostParams) {
  try {
    // TODO: move the picture loading logic to route
    const uploadedImage = await uploadClient.uploadFile(image);
  
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ 
        name,
        colorId,
        categoryId,
        plate, 
        image: uploadedImage.uuid
      })
    });

    if(!response?.ok) {
      throw new Error("Не удалось создать новый пост. Попробуйте снова.");
    }
    
    toast({
      title: "Успешно",
      description: "Новый транспорт был успешно добавлен",
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

export function AddTransport({ 
  variant = "default" 
}: { variant?: "outline" | "default" }) {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(false);
  
  const [colors, setColors] = React.useState<FilterItem[]>([]);
  const [categories, setCategories] = React.useState<FilterItem[]>([]);

  const onSubmit = async(values: z.infer<typeof postCreateSchema>) => {
    const { name, colorId, categoryId, plate, image } = values;

    setIsLoading(true);

    const createdPost = await createPost({ 
      name, colorId, categoryId, plate, image 
    });

    if(createdPost) {
      setIsLoading(false);
      router.refresh();
    }

    setIsLoading(false);
    setIsDialogOpen(false);
  }

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    mode: "onChange"
  });

  React.useEffect(() => {
    const fetchFilters = async(isDialogOpen: boolean) => {
      if(isDialogOpen) {
        setIsDataLoading(true);
  
        const colors = await fetchData("colors");
        const categories = await fetchData("categories");
  
        setColors(colors);
        setCategories(categories);
  
        setIsDataLoading(false);
      }
    }
    
    fetchFilters(isDialogOpen);
    form.reset();
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={variant}>Добавить</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold">Добавление транспорта</DialogTitle>
          <DialogDescription>
            Занесите данные в поля чтобы добавить новый транспорт
          </DialogDescription>
        </DialogHeader>
        {isDataLoading ? (
          <Loading />
        ) : (
          <>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              > 
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="colorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SelectFilter
                            placeholder="Цвет" 
                            items={colors}
                            value={form.getValues("color")}
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
                            value={form.getValues("category")}
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
                </div>
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
                              field.onChange(e.target.files[0]);
                            }
                          }}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}