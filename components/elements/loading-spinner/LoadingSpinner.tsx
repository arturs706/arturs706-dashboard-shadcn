import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoadingDialogProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({
  open = false,
}) => {
  const handleOpenChange = (newOpenState: boolean) => {
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      modal={true}
    >
      <DialogContent
        className="sm:max-w-md [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Processing...</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="text-sm text-gray-500">
            Please wait while we save your changes
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;