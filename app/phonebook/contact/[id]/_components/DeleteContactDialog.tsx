import React, { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { TrashIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { ToastAction } from "@/src/components/ui/toast";

import Dialog from "@/src/components/dialog/Dialog";
import Loading from "@/src/components/Loading";

import { DeleteContactDocument } from "@/src/graphql/contact/contacts.generated";

interface DeleteContactDialogProps {
  id: string;
}

const DeleteContactDialog: React.FC<DeleteContactDialogProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const [mutate] = useMutation(DeleteContactDocument);

  const onDelete = useCallback(
    async (id: number) => {
      setIsLoading(true);

      await mutate({
        variables: {
          id: id,
        },
      })
        .then((resp) => {
          toast({
            description: (
              <span className="mt-2 rounded-md p-2 text-green-600 font-semibold">
                You new contact has been created.{" "}
              </span>
            ),
          });

          window.location.href = "/phonebook";

          setIsOpen(false);
          setIsLoading(false);

          return resp;
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });

          setIsLoading(false);

          return err;
        });
    },
    [toast, mutate]
  );

  const body = (
    <div className="flex items-end justify-end gap-1">
      <Button
        variant="outline"
        type="button"
        size="sm"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </Button>
      <Button
        variant="destructive"
        type="button"
        size="sm"
        onClick={() => onDelete(Number(id))}
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : "Delete"}
      </Button>
    </div>
  );

  return (
    <Dialog
      action={
        <Button
          variant="destructive"
          type="button"
          size="sm"
          className="text-md flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      }
      actionLabel="Delete"
      isOpen={isOpen}
      title="Delete contact"
      description="Are you sure you want to delete this contact?"
      body={body}
      deleteDialog
    />
  );
};

export default DeleteContactDialog;
