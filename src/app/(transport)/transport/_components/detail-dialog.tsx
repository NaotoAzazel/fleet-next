"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { MyImage } from "@/components/image";

import { Transport } from "@/types";

export function DetailDialog({
  post
}: {
  post: Transport
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Подробнее
        </Button>
      </DialogTrigger>
      <DialogContent 
        onOpenAutoFocus={(e) => e.preventDefault()} 
        className="sm:max-w-[425px] grid gap-4"
      >
        <DialogHeader>
          <DialogTitle className="font-heading font-semibold">
            Информация о {post.name}
          </DialogTitle>
        </DialogHeader>
        <MyImage.Container>
          <MyImage 
            src={post.image} 
            className="border" 
          />
        </MyImage.Container>

        <div className="flex w-full justify-between gap-2">
          <div>
            <Label htmlFor="category">Категория</Label>
            <Input readOnly id="category" value={post.category.name} />
          </div>
          <div>
            <Label htmlFor="color">Цвет</Label>
            <Input readOnly id="color" value={post.color.name} />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="name">Название</Label>
          <Input readOnly id="name" value={post.name} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="cateogry">Номера</Label>
          <Input readOnly id="category" value={post.plate} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="status">Статус</Label>
          <Input readOnly id="status" 
            value={
              post.takeBy.length 
                ? "Занята"
                : "Свободна"
            } 
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}