"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import Container from "@/src/components/Container";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function SearchPhonebookPage() {
  const router = useRouter();
  return (
    <Container>
      <div className="flex flex-col">
        <div className="min-h-screen flex flex-col gap-3">
          <div className="bg-white rounded-[8px]">
            <div className="py-2 px-4 flex items-center">
              <Button variant="secondary" onClick={() => router.back()}>
                <ChevronLeft size={24} />
              </Button>
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Search by phone, name"
                  className="rounded-[8px]"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
