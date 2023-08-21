import React from "react";

import Container from "@/src/components/Container";
import SearchContact from "./SearchContact";

import { getClient } from "@/src/graphql/client";
import { Order_By } from "@/src/graphql/types.generated";
import { FindContactByFirstnameDocument } from "@/src/graphql/contact/contacts.generated";

interface IParams {
  searchParams: {
    query: string;
  };
}

export default async function SearchPhonebookPage({ searchParams }: IParams) {
  const { data } = await getClient().query({
    query: FindContactByFirstnameDocument,
    variables: {
      limit: 10,
      offset: 0,
      order_by: {
        created_at: Order_By.DescNullsFirst,
      },
      where: {
        first_name: {
          _like: `%${searchParams.query}%`,
        },
      },
    },
  });

  return (
    <Container>
      <div className="flex flex-col">
        <SearchContact contact={data?.contact} />
      </div>
    </Container>
  );
}
