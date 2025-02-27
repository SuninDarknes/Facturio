import { LucideIcon } from 'lucide-react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';


export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface PageProps extends InertiaPageProps {
    dobavljaci: Dobavljac[];
    osobe: Osoba[];
    artikli: Artikl[];
    flash: {
        success?: string;
    };
    errors: Error ;
    deferred?: Record<string, string[] | undefined>;
}

export interface Artikl {
    id: number;
    naziv: string;
    opis: Record<string, string>; // Opis je JSON objekt
    jedinica_mjere: string;
    deleted_at: string | null;
}

export interface Osoba {
    id: number;
    ime: string;
    prezime: string;
    adresa: string;
    kontakt: string;
    deleted_at: string | null;
}


export interface Dobavljac {
    id: number;
    naziv: string;
    adresa: string;
    kontakt: string;
    deleted_at: string | null;
}