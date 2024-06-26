"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

import { Icons } from "@/components/icons";
import { EditTransport } from "./edit-transport-dialog";

import { Transport } from "@/types";

import { useState } from "react";
import { useRouter } from "next/navigation";

export async function deletePost(postId: number) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE"
    });
  
    if(!response?.ok) {
      throw new Error("Не удалось удалить транспорт. Попробуйте снова.");
    }
  
    toast({
      title: "Успешно",
      description: "Транспорт был успешно удален.",
    });
    return true;

  } catch(error) {
    if(error instanceof Error) {
      toast({
        title: "Ошибка",
        description: error.message,
      });
    }

    return false;
  }
}

export default function PostOperations({ post }: { post: Transport }) {
  const router = useRouter();

  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  return (
    <>
      <EditTransport 
        showEditDialog={showEditDialog} 
        setShowEditDialog={setShowEditDialog}
        post={post}
      />

      <DropdownMenu>
        <DropdownMenuTrigger 
          className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted"
        >
          <Icons.ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onSelect={() => setShowEditDialog(true)}
          >
            Изменить
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={() => setShowAlertDialog(true)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Вы уверены что хотите удалить этот транспорт?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 focus:ring-red-600"
              onClick={async(e) => {
                e.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deletePost(post.id);
                if(deleted) {
                  setIsDeleteLoading(false);
                  setShowAlertDialog(false);
                  router.refresh();
                }

                setIsDeleteLoading(false);
                setShowAlertDialog(false);
              }}
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Удалить</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 