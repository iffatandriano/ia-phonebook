import * as Types from "../types.generated";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type GetContactListQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  offset?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  order_by?: Types.InputMaybe<
    Array<Types.Contact_Order_By> | Types.Contact_Order_By
  >;
}>;

export type GetContactListQuery = {
  __typename?: "query_root";
  contact: Array<{
    __typename?: "contact";
    created_at: any;
    first_name: string;
    id: number;
    last_name: string;
    phones: Array<{ __typename?: "phone"; number: string }>;
  }>;
};

export type AddNewContactListMutationVariables = Types.Exact<{
  first_name: Types.Scalars["String"]["input"];
  last_name: Types.Scalars["String"]["input"];
  phones: Array<Types.Phone_Insert_Input> | Types.Phone_Insert_Input;
}>;

export type AddNewContactListMutation = {
  __typename?: "mutation_root";
  insert_contact?: {
    __typename?: "contact_mutation_response";
    returning: Array<{
      __typename?: "contact";
      first_name: string;
      last_name: string;
      id: number;
      phones: Array<{ __typename?: "phone"; number: string }>;
    }>;
  } | null;
};

export const GetContactListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetContactList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "offset" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "order_by" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "contact_order_by" },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "contact" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "offset" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "offset" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "order_by" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "created_at" } },
                { kind: "Field", name: { kind: "Name", value: "first_name" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "last_name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "phones" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "number" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetContactListQuery, GetContactListQueryVariables>;
export const AddNewContactListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addNewContactList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first_name" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "last_name" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "phones" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "phone_insert_input" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "insert_contact" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "objects" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "first_name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "first_name" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "last_name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "last_name" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "phones" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "data" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "phones" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "returning" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "first_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "last_name" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "phones" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "number" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddNewContactListMutation,
  AddNewContactListMutationVariables
>;
