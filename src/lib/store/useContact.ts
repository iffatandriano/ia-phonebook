import { Contact, TParams } from "@/src/utils/types";
import { create } from "zustand";

interface ContactProps {
  params: TParams;
  contacts: Array<Contact>;
  setPage: (page: number) => void;
  setContacts: (contacts: Contact[]) => void;
}

const useContact = create<ContactProps>((set) => ({
  params: {
    created_at: "desc",
    first_name: null,
    last_name: null,
    page: 0,
  },
  contacts: [],
  setPage: (page: number) =>
    set((prev) => ({
      params: {
        first_name: prev.params.first_name,
        last_name: prev.params.last_name,
        created_at: prev.params.created_at,
        page: page,
      },
    })),
  setContacts: (contact: Contact[]) =>
    set({
      contacts: contact,
    }),
}));

export default useContact;
