import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatImage(
  e: React.ChangeEvent<HTMLInputElement>, 
  setImage: React.Dispatch<React.SetStateAction<string>>,
): void {
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