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
import SelectFilter from "@/components/select";
import { Icons } from "@/components/icons";

import { postCreateSchema } from "@/lib/validation/post";
import { FilterItem } from "@/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatImage } from "@/lib/utils";
import { fetchCategories, fetchColors } from "@/lib/posts";

const DEFAULT_VALUES = {
  name: "",
  plate: "",
  categoryId: 0,
  colorId: 0,
  image: ""
};

async function createPost(
  name: string,
  colorId: number,
  categoryId: number,
  plate: string,
  image: string
) {
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
      image 
    })
  });

  if(!response?.ok) {
    console.error("Something went wrong when create post", response);
    return false;
  }
  
  return true;
}

export default function AddTransport({ variant = "default" }: { variant?: "outline" | "default" }) {
  const router = useRouter();

  const [colors, setColors] = useState<FilterItem[]>([]);
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [colorId, setColorId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const onSubmit = async(values: z.infer<typeof postCreateSchema>) => {
    const { name, plate, categoryId, colorId } = values;

    setIsLoading(true);

    const createdPost = await createPost(
      name, Number(colorId), Number(categoryId), plate, image
    );
    
    if(createdPost) {
      setIsLoading(false);
      router.refresh();
    }

    setIsLoading(false);
    setShowDialog(false);
  };

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange"
  });

  useEffect(() => {
    const fetchData = async() => {
      const colors = await fetchColors();
      const categories = await fetchCategories();

      setColors(colors);
      setCategories(categories);
    }

    setColorId("")
    setCategoryId("");
    fetchData();
    form.reset();
  }, [showDialog]);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
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


        <Form {...form}>
          <form className="space-y-2"> 
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectFilter
                        placeholder="Цвет" 
                        items={colors}
                        value={colorId}
                        onValueChange={(value) => {
                          setColorId(value)
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SelectFilter
                        placeholder="Категория" 
                        items={categories}
                        value={categoryId}
                        onValueChange={(value) => {
                          setCategoryId(value)
                          field.onChange(Number(value))
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

            <FormField 
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Картинка</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={(e) => {
                          formatImage(e, setImage);
                          field.onChange(String(e.target.files))
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
      </DialogContent>
    </Dialog>
  )
}