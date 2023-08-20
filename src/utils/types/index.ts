export type NavbarItem = {
  name: string;
  pathname: string;
  icon: any;
};

export interface NavbarItemProps extends NavbarItem {
  icon: any;
  color: string;
  selectedNav: string;
}

export type TParams = {
  created_at: string;
  first_name?: string | null;
  last_name?: string | null;
  page: number;
};

export type Phone = {
  __typename: string;
  number: string;
};

export type Contact = {
  __typename: string;
  id: number;
  first_name: string;
  last_name: string;
  phones: Array<Phone>;
  created_at: string;
};
