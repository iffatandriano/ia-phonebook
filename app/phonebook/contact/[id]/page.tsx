import React from "react";

import Container from "@/src/components/Container";
import DetailContactPage from "./DetailContact";
import { getClient } from "@/src/graphql/client";
import { GetDetailsContactByIdDocument } from "@/src/graphql/contact/contacts.generated";

export const dynamic = "force-dynamic";

interface IParams {
  id: string;
}

export default async function ContactDetailPage({
  params,
}: {
  params: IParams;
}) {
  const { data } = await getClient().query({
    query: GetDetailsContactByIdDocument,
    variables: {
      id: Number(params.id),
    },
  });

  return (
    <Container>
      <DetailContactPage contact={data?.contact_by_pk} />
    </Container>
  );
}
