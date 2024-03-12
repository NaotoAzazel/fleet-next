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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectFilter from "@/components/select";
import { useEffect, useState } from "react";
import { FilterItem } from "@/types";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

export default function AddTransport({ variant = "default" }: { variant?: "outline" | "default" }) {
  const [colors, setColors] = useState<FilterItem[]>([]);
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const router = useRouter();

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

  useEffect(() => {
    fetchColors();
    fetchCategories();
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
        <div className="py-4 space-y-4">
          <div className="flex gap-2">
            <SelectFilter placeholder="Цвет" items={colors} />
            <SelectFilter placeholder="Категория" items={categories} />
          </div>
          {/** TODO: make validation for inputs */}
          <div className="grid w-full gap-4">
            <Label htmlFor="name">Название</Label>
            <Input id="name" placeholder="Ламборгини"/>
          </div>

          <div className="grid w-full gap-4">
            <Label htmlFor="plate">Номера</Label>
            <Input id="plate" placeholder="A1235B"/>
          </div>

          <div className="grid w-full gap-4">
            <Label htmlFor="picture">Картинка</Label>
            <Input id="picture" type="file" />
          </div>
        </div>

        <DialogFooter>
          <Button 
            size="sm"
            disabled={isLoading}
            onClick={async(e) => {
              e.preventDefault();
              setIsLoading(true);

              // temporarily simulating loading
              setTimeout(() => {
                setIsLoading(false);
                setShowDialog(false);
                router.refresh();
              }, 2000);
            }}
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