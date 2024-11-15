import { useRecyclablesStore } from "@/store/add-recycables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Edit, Save, Trash2 } from "lucide-react"; // Importing icons from lucide-react
import { Category } from "../RecycablesLineChart";
import { errorToast, successToast } from "@/utils/toast";
import { ApiError } from "@/models/serviceRequest";

const Recycables = () => {
  const { deleteRecyclable, fetchRecyclables, updateRecyclable, recyclables } =
    useRecyclablesStore(); // Assuming you have updateRecyclable in your store

  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<number | null>(null);

  // Handle delete operation
  const handleDelete = async (id: string) => {
    try {
      await deleteRecyclable(id);
      successToast({
        title: "Success",
        message: "Quest to delete recycable was successful",
      });
    } catch (error) {
      errorToast({
        title: "Error",
        message:
          (error as ApiError)?.response?.data?.error ??
          "Failed to delete recycable",
      });
    }
    fetchRecyclables();
  };

  // Handle updating the recyclable item
  const handleUpdate = async (
    id: string,
    updatedData: { item: Category; quantity: number }
  ) => {
    setIsEditing(null); // Exit editing mode
    try {
      await updateRecyclable(id, updatedData);
      successToast({
        title: "Success",
        message: "Quest to updateF recycable was successful",
      });
    } catch (error) {
      errorToast({
        title: "Error",
        message:
          (error as ApiError)?.response?.data?.error ??
          "Failed to update recycable",
      });
    }
        fetchRecyclables();

  };

  // Start editing the recyclable item
  const handleEdit = (index: number, quantity: number) => {
    setIsEditing(index);
    setEditQuantity(quantity);
  };

  return (
    <div className="space-y-4 rounded-lg mt-5">
      <p>Hi there, bounty hunter! 🏹 How was the hunt today? 🌿</p>
      {recyclables?.data?.map((recyclable, index) => (
        <div
          key={recyclable?._id}
          className="flex items-center justify-between  p-3 border-t"
        >
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">{recyclable.item}</h3>
              <Trash2
                className="text-destructive"
                size={15}
                onClick={() => handleDelete(recyclable?._id)}
              />
            </div>
            <div className="relative mt-2">
              <Input
                value={
                  isEditing === index ? editQuantity ?? 0 : recyclable.quantity
                }
                onChange={(e) => setEditQuantity(Number(e.target.value))}
                className="pr-16"
                type="number"
                readOnly={isEditing !== index} // Disable editing when not in edit mode
                placeholder="Enter new quantity"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute right-1 h-8 top-1/2 transform -translate-y-1/2 flex items-center"
                onClick={() =>
                  isEditing === index
                    ? handleUpdate(recyclable._id, {
                        item: recyclable.item as Category,
                        quantity: editQuantity ?? 0,
                      })
                    : handleEdit(index, recyclable.quantity)
                }
              >
                {isEditing === index ? (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recycables;
