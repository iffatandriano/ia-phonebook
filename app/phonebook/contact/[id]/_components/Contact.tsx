"use client";

import React from "react";

import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

interface ContactProps {
  contact: any;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  const valuePhone = contact?.phones?.map((phone: any) => phone.number);
  const concatenatedPhone = valuePhone?.join(", ") || "-";

  return (
    <div className="bg-white rounded-[8px]">
      <div className="py-2 px-4 flex flex-col gap-3 items-center justify-center">
        <div className="w-14 h-14 rounded-full border border-gray-200 flex justify-center items-center">
          {contact?.first_name?.charAt(0).toUpperCase()}
          {contact?.last_name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex justify-center items-center text-md font-semibold">
          {contact?.first_name} {contact?.last_name}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phone_number">Phones :</Label>
          <Textarea id="phone_number" disabled value={concatenatedPhone} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
