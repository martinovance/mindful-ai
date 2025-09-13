import { CustomDialogProps } from "@/types/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

const CustomDialog = ({
  title,
  description,
  trigger,
  children,
  showClose,
  open,
  onOpenChange,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {title === "Coming Soon" && (
          <div
            className="absolute top-8 left-[-25px] w-[130px] bg-blue-500 
          text-white text-xs text-center font-bold rotate-[-45deg] shadow-md"
          >
            COMING SOON
          </div>
        )}
        <DialogHeader>
          {title && (
            <DialogTitle
              className={`text-2xl font-bold ${
                title === "Coming Soon" && "text-center"
              }`}
            >
              {title}
            </DialogTitle>
          )}
          <DialogDescription>{description || ""}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        {showClose && <DialogClose>✕</DialogClose>}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
