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
import EditFilter from "@/components/edit-filter-dialog";
  
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FilterItem, FilterType } from "@/types";

async function deletePost(
  postId: number, 
  filterType: FilterType
): Promise<boolean> {
  const response = await fetch(`/api/posts/${filterType}/${postId}`, {
    method: "DELETE"
  });

  if(!response?.ok) {
    toast({
      title: "Произошла ошибка",
      description: "Не удалось удалить этот транспорт. Попробуйте снова.",
      variant: "destructive"
    });
    return false;
  }

  toast({
    title: "Успешно",
    description: "Этот транспорт был успешно удален.",
  });
  return true;
}

export default function FilterOperations({ 
  post, 
  filterType 
} : {
  post: FilterItem,
  filterType: FilterType
}) {
  const router = useRouter();

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);

  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  return (
    <>
      <EditFilter 
        data={post}
        type={filterType}
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
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
            onSelect={() => setShowDeleteDialog(true)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Вы уверены что хотите это удалить?
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

                const deleted = await deletePost(post.id, filterType);
                if(deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteDialog(false);
                  router.refresh();
                }
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