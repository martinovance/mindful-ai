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
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
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
