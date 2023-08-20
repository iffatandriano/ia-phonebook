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
  onSubmit: () => void;
  title?: string;
  description?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  action?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
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
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  return (
    <>
      <DialogContainer>
        <DialogTrigger asChild>{action}</DialogTrigger>
        {showModal ? (
          <DialogContent className="max-w-[500px] h-[50vh] overflow-auto bg-white z-50 rounded-[8px]">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
            {body && <div className="grid gap-4 py-4">{body}</div>}
            {/* <DialogFooter>
              <Button
                variant="secondary"
                onClick={handleSubmit}
                disabled={disabled}
              >
                {actionLabel}
              </Button>
            </DialogFooter> */}
          </DialogContent>
        ) : null}
      </DialogContainer>
    </>
  );
};

export default Dialog;
