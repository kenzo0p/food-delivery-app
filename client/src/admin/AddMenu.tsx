import EditMenu from "@/components/EditMenu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const loading = false;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange hover:bg-hoverOrange">
              <Plus className="mr-2 " /> Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter the menu name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter the menu Description"
                />
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type="text"
                  name="price"
                  placeholder="Enter the menu price"
                />
              </div>
              <div>
                <Label>Uplaod Menu Image</Label>
                <Input type="file" name="image" />
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button disabled className="bg-orange hover:bg-hoverOrange ">
                    <Loader2 className="animate-spin mr-2 w-4 h-4" />
                    Please Wait
                  </Button>
                ) : (
                  <Button className="bg-orange hover:bg-hoverOrange ">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
          <img
            src="https://imgs.search.brave.com/EI9c7RVDRQ8_1wMsQzVVi3YyKntueIjstRP9k_ywHfY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xNi8xMS81Ny9m/cmllZC0yNTA5MDg5/XzY0MC5qcGc"
            alt=""
            className="object-cover md:h-24 md:w-24 h-16 w-full rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">Bhurji</h1>
            <p className="text-gray-600  text-sm">
              Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Tenetur, voluptate.
            </p>
            <h2 className="text-md font-semibold mt-2">
              Price : <span className="text-[#D19254]">80</span>
            </h2>
          </div>
          <Button size={'sm'} className="mt-2 bg-orange hover:bg-hoverOrange">Edit</Button>
        </div>
      </div>
      <EditMenu/>
    </div>
  );
};

export default AddMenu;
