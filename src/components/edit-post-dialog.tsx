"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectFilter from "@/components/select";
import { useEffect, useState } from "react";
import { FilterItem, Transport } from "@/types";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";

export async function updatePost(
  postId: number,
  name: string,
  colorId: string,
  categoryId: string,
  plate: string,
  image: string
) {
  const colorIdToNumber = Number(colorId);
  const categoryIdToNumber = Number(categoryId);

  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ 
      name, 
      colorId: colorIdToNumber, 
      categoryId: categoryIdToNumber, 
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

  const [name, setName] = useState<string>("");
  const [colorId, setColorId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
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

  useEffect(() => {
    fetchColors();
    fetchCategories();

    setName(post.name);
    setColorId(String(post.colorId));
    setCategoryId(String(post.categoryId));
    setPlate(post.plate);
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

        <div className="py-4 space-y-4">
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
          {/** TODO: make validation for inputs */}
          <div className="grid w-full gap-4">
            <Label htmlFor="name">Название</Label>
            <Input 
              id="name" 
              placeholder="Ламборгини" 
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid w-full gap-4">
            <Label htmlFor="plate">Номера</Label>
            <Input 
              id="plate" 
              placeholder="A1235B"
              defaultValue={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={async(e) => {
              e.preventDefault();
              setIsLoading(true);

              const updatedPost = await updatePost(post.id, name, colorId, categoryId, plate, image);
              if(updatedPost) {
                setIsLoading(false);
                router.refresh();
              }

              setIsLoading(false);
              setShowEditDialog(false);
            }}
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