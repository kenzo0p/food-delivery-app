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
import React, {  FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";

const menus = [
  {
    title:"Biryani",
    description:"loren sjcbscbjjvjbvjfbvjbfjvb",
    price:120,
    image :"https://imgs.search.brave.com/EI9c7RVDRQ8_1wMsQzVVi3YyKntueIjstRP9k_ywHfY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xNi8xMS81Ny9m/cmllZC0yNTA5MDg5/XzY0MC5qcGc"
  },
  {
    title:"Biryani",
    description:"loren sjcbscbjjvjbvjfbvjbfjvb",
    price:120,
    image :"https://imgs.search.brave.com/EI9c7RVDRQ8_1wMsQzVVi3YyKntueIjstRP9k_ywHfY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xNi8xMS81Ny9m/cmllZC0yNTA5MDg5/XzY0MC5qcGc"
  },
  {
    title:"Biryani",
    description:"loren sjcbscbjjvjbvjfbvjbfjvb",
    price:120,
    image :"https://imgs.search.brave.com/EI9c7RVDRQ8_1wMsQzVVi3YyKntueIjstRP9k_ywHfY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xNi8xMS81Ny9m/cmllZC0yNTA5MDg5/XzY0MC5qcGc"
  },
]

const AddMenu = () => {
  const [input , setInput] = useState<MenuFormSchema>({
    title:"",
    description:"",
    price:0,
    image:undefined
  });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [editOpen ,setEditOpen] = useState<boolean>(false);
  const [error ,setError] = useState<Partial<MenuFormSchema>>({});
  const loading = false;

  const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name,value , type} = e.target;
    setInput({...input,[name]:type === 'number'? Number(value) : value});
  }
  const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    const result = menuSchema.safeParse(input);
    if(!result.success){
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<MenuFormSchema>);
      return;
    }
    // api ka kam starts from here
  }
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
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={input.title}
                  onChange={changeEventHandler}
                  
                  type="text"
                  name="title"
                  placeholder="Enter the menu name"
                />
                {error && <span className="text-red-600 text-xs font-bold">{error.title}</span>}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  value={input.description}
                  onChange={changeEventHandler}
                  name="description"
                  placeholder="Enter the menu Description"
                />
                 {error && <span className="text-red-600 text-xs font-bold">{error.description}</span>}
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                value={input.price}
                onChange={changeEventHandler}
                  type="text"
                  name="price"
                  placeholder="Enter the menu price"
                />
                 {error && <span className="text-red-600 text-xs font-bold">{error.price}</span>}
              </div>
              <div>
                <Label>Uplaod Menu Image</Label>
                <Input type="file" name="image" onChange={(e) => setInput({...input,image:e.target.files?.[0] || undefined})} />
                {error && <span className="text-red-600 text-xs font-bold">{error.image?.name || "Image is required"}</span>}
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
      {menus.map((item :any, index:number) => (
        <div key={index} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={item.image}
              alt=""
              className="object-cover md:h-24 md:w-24 h-16 w-full rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>
              <p className="text-gray-600  text-sm">
                {item.description}
              </p>
              <h2 className="text-md font-semibold mt-2">
                Price : <span className="text-[#D19254]">{item.price}</span>
              </h2>
            </div>
            <Button onClick={() => {
              setEditOpen(true);
              setSelectedMenu(item);
              }} size={"sm"} className="mt-2 bg-orange hover:bg-hoverOrange">
              Edit
            </Button>
          </div>
        </div>
      ))}
      <EditMenu editOpen={editOpen} setEditOpen={setEditOpen} selectedMenu={selectedMenu} />
    </div>
  );
};

export default AddMenu;
