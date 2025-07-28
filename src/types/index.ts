export interface Project {
    _id?: string;
    id?: number;
    title: string;
    description: string;
    link: string;
    image?: string;
}

export interface HeaderProps {
    title: string;
    links: Array<{ name: string; path: string }>;
}