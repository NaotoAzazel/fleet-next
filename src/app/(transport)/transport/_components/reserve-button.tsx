"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

import * as React from "react";

type ActionVariants = "Забрать" | "Вернуть" | "Недоступна";

interface ReserveButtonProps {
  userId: string;
  postId: number;
  takeById: string;
};

interface ReserveParams {
  userId: string;
  postId: number;
  action: "take" | "return";
};

async function reserve({
  postId,
  userId,
  action
}: ReserveParams): Promise<boolean> {
  try {
    const response = await fetch(`/api/posts/${postId}?source=reserve:${action}`, {
      method: "PUT", 
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        takeBy: action === "return" ? "" : userId
      })
    });

    if(!response?.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }

    toast({
      title: "Успешно",
      description: "Транспорт был успешно зарезервирован",
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

export default function ReserveButton({
  postId,
  userId,
  takeById
}: ReserveButtonProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [buttonText, setButtonText] = React.useState<ActionVariants>();

  const formatButtonText = (userId: string, takeById: string): 
    ActionVariants => {
    if(userId === takeById)
      return "Вернуть";

    if(takeById.length && userId !== takeById)
      return "Недоступна";

    return "Забрать";
  }

  React.useEffect(() => {
    setButtonText(formatButtonText(userId, takeById));
  }, [userId, takeById])

  const reserveTransport = async() => {
    setIsLoading(true);
    
    const reserved = await reserve({ 
      postId, 
      userId, 
      action: buttonText === "Вернуть" 
        ? "return"
        : "take"
    });

    if(reserved) {
      setIsLoading(false);
      router.refresh();
    }

    setIsLoading(false);
  }

  return (
    <Button
      disabled={
        isLoading || buttonText === "Недоступна"
      }
      size="sm"
      className={cn(
        "w-full",
        buttonText === "Недоступна" && "cursor-not-allowed"
      )}
      onClick={reserveTransport}
    >
      {isLoading && (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      )}
      <span>{buttonText}</span>
    </Button>
  )
}