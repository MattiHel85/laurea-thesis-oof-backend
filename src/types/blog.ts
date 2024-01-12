export interface BlogPost {
    title: string;
    content: string;
    author: string;
    datetime?: Date;
}

export interface Blog {
    title: string;
    description: string;
    posts: BlogPost[];
}