"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog as DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: boolean;
  onSubmit?: () => void;
  title?: string;
  description?: string;
  body?: React.ReactElement;
  footer?: boolean;
  action?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  deleteDialog?: boolean;
}

const Dialog: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  body,
  footer,
  action,
  actionLabel,
  disabled,
  onSubmit,
  deleteDialog,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <>
      <DialogContainer>
        <DialogTrigger asChild>{action}</DialogTrigger>
        {showModal ? (
          <DialogContent
            className={`max-w-[500px] ${
              deleteDialog ? "" : "h-[50vh]"
            } overflow-auto bg-white z-50 rounded-[8px]`}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
            {body && <div className="grid gap-4 py-4">{body}</div>}
            {/* {footer && (
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  {actionLabel}
                </Button>
              </DialogFooter>
            )} */}
          </DialogContent>
        ) : null}
      </DialogContainer>
    </>
  );
};

export default Dialog;
