import React from "react";
import Container from "@/src/components/Container";
import EditContactForm from "./EditContactForm";

export const dynamic = "force-dynamic";

export default function EditContactDetailPage() {
  return (
    <Container>
      <EditContactForm />
    </Container>
  );
}
