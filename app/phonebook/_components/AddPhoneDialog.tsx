"use client";

import Dialog from "@/src/components/dialog/Dialog";
import { Button } from "@/src/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

const AddPhoneDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const body = <div>testing..</div>;

  const onSubmit = () => {};

  return (
    <Dialog
      action={
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <PlusCircle size={22} color="#16A34A" />
        </Button>
      }
      actionLabel="Save phone"
      isOpen={isOpen}
      title="Add new phone"
      body={body}
      onSubmit={onSubmit}
      disabled={false}
    />
  );
};

export default AddPhoneDialog;
