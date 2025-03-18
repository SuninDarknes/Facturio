import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ReceiptText, Package } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Račun',
        url: '/racuni',
        icon: ReceiptText,
    },
    {
        title: 'Izdatnice',
        url: '/izdatnice',
        icon: Package,
    },
    {
        title: 'Primke',
        url: '/primke',
        icon: ReceiptText,
    },
    {
        title: 'Dobavljači',
        url: '/dobavljaci',
        icon: Package,
    },
    {
        title: 'Osobe',
        url: '/osobe',
        icon: Package,
    },
    {
        title: 'Artikli',
        url: '/artikli',
        icon: Package,
    }

];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/SuninDarknes/Facturio',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://github.com/SuninDarknes/Facturio',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
