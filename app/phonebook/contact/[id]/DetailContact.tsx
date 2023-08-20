"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import Contact from "./_components/Contact";

interface DetailContactProps {
  id?: string;
  contact: any;
}

const DetailContactPage: React.FC<DetailContactProps> = ({ id, contact }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="min-h-screen flex flex-col gap-3">
        <div className="bg-white rounded-[8px]">
          <div className="py-2 px-4 flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Button variant="ghost" onClick={() => router.back()}>
                <ChevronLeftIcon size={24} />
              </Button>
              <div className="w-full">Contact Detail</div>
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="text-md font-medium"
                onClick={() => router.push(`/phonebook/contact/${id}/edit`)}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
        <Contact contact={contact} />
      </div>
    </div>
  );
};

export default DetailContactPage;
