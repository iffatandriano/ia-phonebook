"use client";

import React, { useState } from "react";

import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { CopyPlusIcon, PenSquareIcon } from "lucide-react";
import AddPhoneContact from "./AddPhoneContact";
import EditPhoneContact from "./EditPhoneContact";
import { Input } from "@/src/components/ui/input";

interface ContactProps {
  contact: any;
  handleEditName: (id: any, contact: any) => void;
}

const Contact: React.FC<ContactProps> = ({ contact, handleEditName }) => {
  const [isOpenEditPhone, setIsOpenEditPhone] = useState(false);
  const [isOpenCreatePhone, setIsOpenCreatePhone] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState({});

  const handleEditPhone = (phone: any) => {
    setSelectedPhone(phone);
    setIsOpenEditPhone(true);
  };

  return (
    <div className="bg-white rounded-[8px]">
      <div className="py-2 px-4 flex flex-col gap-3 items-center justify-center">
        <div className="w-14 h-14 rounded-full border border-gray-200 flex justify-center items-center">
          {contact?.first_name?.charAt(0).toUpperCase()}
          {contact?.last_name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="text-md font-semibold">
            {contact?.first_name} {contact?.last_name}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditName(contact.id, contact)}
          >
            <PenSquareIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label
            htmlFor="phone_number"
            className="flex justify-between items-center"
          >
            {!isOpenCreatePhone ? (
              <>
                <span className="text-md font-semibold">Phones :</span>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpenCreatePhone(true)}
                  >
                    <CopyPlusIcon className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : null}
          </Label>
          {isOpenCreatePhone ? (
            <AddPhoneContact
              id={contact.id}
              setIsOpenCreatePhone={setIsOpenCreatePhone}
            />
          ) : (
            contact?.phones?.map((phone: any, phoneIndex: number) => (
              <div key={phoneIndex} className="flex gap-3 items-center">
                {isOpenEditPhone ? (
                  <div className="w-full">
                    <EditPhoneContact
                      contact={contact}
                      selectedPhone={selectedPhone}
                      setIsOpenEditPhone={setIsOpenEditPhone}
                    />
                  </div>
                ) : (
                  <>
                    <Input id="phone_number" value={phone.number} disabled />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPhone(phone)}
                    >
                      <PenSquareIcon className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
