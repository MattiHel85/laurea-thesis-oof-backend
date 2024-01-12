export interface MenuItem {
    name: string;
    price: number;
    description: string;
}

export interface Menu {
    name: string;
    description: string;
    menuItems: MenuItem[];
}