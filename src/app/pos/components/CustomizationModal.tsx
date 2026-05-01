"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  customizable: boolean;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function CustomizationModal({
  open,
  product,
  services,
  onClose,
  onAdd
}: {
  open: boolean;
  product: Product | null;
  services: Service[];
  onClose: () => void;
  onAdd: (product: Product, service?: Service) => void;
}) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (open) {
      setSelectedService(null);
    }
  }, [open]);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customization</DialogTitle>
          <DialogDescription>
            Customize your {product.name} with our services.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-lg border p-3">
            <div className="relative size-12 overflow-hidden rounded-md border bg-muted flex-shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{product.category}</p>
              <h4 className="text-sm font-semibold truncate">{product.name}</h4>
              <p className="text-sm font-bold">Rp {product.price.toLocaleString("id-ID")}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Select Service</h5>
            <div className="max-h-[280px] overflow-y-auto space-y-1.5 px-1.5 scrollbar-hide">
              <button
                onClick={() => setSelectedService(null)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md border px-4 py-3 text-sm transition-all hover:bg-accent",
                  !selectedService && "border-primary bg-primary/5 ring-1 ring-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "size-4 rounded-full border flex items-center justify-center",
                    !selectedService ? "border-primary" : "border-muted-foreground"
                  )}>
                    {!selectedService && <div className="size-2 rounded-full bg-primary" />}
                  </div>
                  <span className={cn("font-medium", !selectedService ? "text-primary" : "text-foreground")}>Standard (Plain)</span>
                </div>
                <span className="text-xs text-muted-foreground">+Rp 0</span>
              </button>
              
              {services.map((service) => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md border px-4 py-3 text-sm transition-all hover:bg-accent",
                      isSelected && "border-primary bg-primary/5 ring-1 ring-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "size-4 rounded-full border flex items-center justify-center",
                        isSelected ? "border-primary" : "border-muted-foreground"
                      )}>
                        {isSelected && <div className="size-2 rounded-full bg-primary" />}
                      </div>
                      <span className={cn("font-medium", isSelected ? "text-primary" : "text-foreground")}>{service.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">+Rp {service.price.toLocaleString("id-ID")}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2 mt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onAdd(product, selectedService || undefined)}>
            Add to Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
