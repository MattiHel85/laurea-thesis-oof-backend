import { User } from "./user";

export interface BlogPost {
    title: string;
    content: string;
    author: string;
    datetime?: Date;
}