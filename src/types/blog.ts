import { User } from "./user";

export interface BlogPost {
    title: string;
    content: string;
    author: User;
    datetime?: Date;
}