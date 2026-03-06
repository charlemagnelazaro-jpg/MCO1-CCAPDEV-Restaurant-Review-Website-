import * as React from "react";
import { Plus, Utensils, MapPin, Store } from "lucide-react";
import { Button } from "./ui/button"; 
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {useAuth} from '../context/AuthContext';


export function AddRestaurant() { 

const [open, setOpen] = React.useState(false);
const [isSubmitting, setIsSubmitting] = React.useState(false);
const [name, setName] = React.useState("");
const [address, setAddress] = React.useState("");
const { createRestaurant } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try{
      const result = await createRestaurant(name, address);
      if(result.success){
        setOpen(false);
        setName("");
        setAddress("");
        alert("Restaurant created successfully!");
      } else {
        alert(result.message || "Failed to create restaurant.");
      }
    } catch (error) {
      console.error("Error creating restaurant:", error);
      alert("An error occurred while creating the restaurant.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="success" 
          className="gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="size-4" strokeWidth={3} />
          Add restaurants
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] border-none shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Store className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Admin Portal</span>
          </div>
          <DialogTitle className="text-2xl font-bold">New Restaurant</DialogTitle>
          <DialogDescription>
            Fill in the details to list a new spot on ArcherEats.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-semibold">Restaurant Name</Label>
              <div className="relative">
                <Utensils className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input id="name" placeholder="e.g. The Burger Joint" className="pl-10" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location" className="text-sm font-semibold">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                <Input id="location" placeholder="Street, City" className="pl-10" required value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="font-semibold"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="success" 
              className="px-8 font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Save Restaurant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}