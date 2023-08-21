"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, TrashIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import Contact from "./_components/Contact";
import Link from "next/link";
import DeleteContactDialog from "./_components/DeleteContactDialog";

interface DetailContactProps {
  contact: any;
}

const DetailContactPage: React.FC<DetailContactProps> = ({ contact }) => {
  const router = useRouter();

  const handleEditName = (id: any, contact: any) => {
    localStorage.setItem("contact", JSON.stringify(contact));

    router.push(`/phonebook/contact/${id}/edit`);
  };

  return (
    <div className="flex flex-col">
      <div className="min-h-screen flex flex-col gap-3">
        <div className="bg-white rounded-[8px]">
          <div className="py-2 px-4 flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Link href="/phonebook">
                <Button variant="ghost">
                  <ChevronLeftIcon size={24} />
                </Button>
              </Link>
              <div className="w-full">Contact Detail</div>
            </div>
            <div>
              <DeleteContactDialog id={contact?.id} />
            </div>
          </div>
        </div>
        <Contact contact={contact} handleEditName={handleEditName} />
      </div>
    </div>
  );
};

export default DetailContactPage;
