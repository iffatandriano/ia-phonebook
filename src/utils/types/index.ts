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
