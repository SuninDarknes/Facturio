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
    primke: Primka[];
    racuni: Racun[];
    flash: {
        success?: string;
    };
    errors: Error ;
    deferred?: Record<string, string[] | undefined>;
}

export interface Racun {
    id: number;
    osoba_id: number;
    naziv: string;
    datum: string;
    ukupna_cijena: number;
    pdv: number;
    nacin_placanja: string;
    rok_placanja: string;
    deleted_at: string | null;
    osoba: Osoba;
    stavke: StavkaRacuna[];
}

export interface StavkaRacuna {
    id: number;
    racun_id: number;
    artikl_id: number;
    kolicina: number;
    cijena: number;
    popust: number;
    artikl: Artikl;
}
export interface Primka {
    id: number;
    naziv: string;
    dobavljac_id: number;
    datum: string;
    pdv: number;
    ukupna_cijena: number;
    deleted_at: string | null;
    dobavljac: Dobavljac;
    stavke: StavkaPrimke[];
}

export interface StavkaPrimke {
    id: number;
    primka_id: number;
    artikl_id: number;
    kolicina: number;
    cijena: number;
    popust: number;
    artikl: Artikl;
}

export interface Artikl {
    id: number;
    naziv: string;
    opis: string;
    cijene: Cijena[];
    deleted_at: string | null;
}
export interface Cijena {
    id: number;
    artikl_id: number;
    cijena: number;
    datum: string;
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
