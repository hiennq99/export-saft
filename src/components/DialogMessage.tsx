import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog';

export interface DialogMessageProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export const DialogMessage = ({
  open,
  onOpenChange,
  message,
}: DialogMessageProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle hidden>Export SAF-T</DialogTitle>
      <DialogContent className="sm:max-w-[634px] px-[64px] pb-[40px] pt-[64px] relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[111px] aspect-square rounded-full bg-white grid place-items-center"
          style={{
            boxShadow: '0px 0px 8px #CCCCCC',
          }}
        >
          <img
            className="w-[55px] aspect-square"
            src="https://stefotest.macewindu.invoicexpress.com/assets/header/ix-logo-7bd52d846428f2773ed8f2d33e0c9b40c1c5b24e03a69f58aa79c1c5340f24d9.svg"
          />
        </div>
        <div className="mb-[30px]">
          <h1 className="text-2xl font-medium text-gray-600 text-center">
            Export SAF-T
          </h1>

          <div
            className="text-neutral-400 mt-[48px]"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="min-w-[130px]" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
