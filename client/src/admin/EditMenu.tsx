import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuFormSchema;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [input , setInput] = useState<MenuFormSchema>({
        title:"",
        description:"",
        price:0,
        image:undefined
    })
    const [error,setError] = useState<Partial<MenuFormSchema>>({});
    const changeEventHandler  = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name , value , type} = e.target;
        setInput({...input , [name]:type === 'number'? Number(value) : value})
    }
    const submitHandler = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(input)
         const result = menuSchema.safeParse(input);
            if(!result.success){
              const fieldError = result.error.formErrors.fieldErrors;
              setError(fieldError as Partial<MenuFormSchema>);
              return;
            }

    }
    useEffect(()=>{
        setInput({
            title:selectedMenu?.title || "",
            description:selectedMenu?.description || "",
            price:selectedMenu?.price || 0,
            image:undefined
        })
    } , [selectedMenu])
    const loading = false;
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update Your menu to keep you offering fresh and exciting!
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
  );
};

export default EditMenu;
