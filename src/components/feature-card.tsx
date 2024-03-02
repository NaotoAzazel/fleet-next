import { FeatureItem } from "@/types";
import { Icons } from "@/components/icons";

export default function FeatureCard({ cart }: { cart: FeatureItem }) {
  const Icon = Icons[cart.icon];
  
  return (
    <div className="relative overflow-hidden rounded-[10px] border border-borderColor p-2">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <div className="flex h-12 w-12">
          <Icon className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h3 className="font-bold font-heading">{cart.title}</h3>
          <p className="text-sm text-muted-foreground font-sans">
            {cart.description}
          </p>
        </div>
      </div>
    </div>
  )
}
