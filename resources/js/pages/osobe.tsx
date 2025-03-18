import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import DialogDodajOsobu from '@/components/dodajDialog/DialogDodajOsobu';
import Notification from '@/components/Notification';
import { EditableTableRow } from '@/components/EditableTableRow';
import { Osoba, PageProps } from '@/types';

export default function OsobeIndex() {
    const { osobe, flash } = usePage<PageProps>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(flash?.success || null);
    const [color, setColor] = useState<string>('bg-green-500');
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    const { data, setData, post, processing, errors, reset } = useForm({
        ime: '',
        prezime: '',
        adresa: '',
        kontakt: '',
    });

    const { delete: destroy, processing: isDeleting } = useForm({});

    useEffect(() => {
        if (flash?.success) {
            setNotificationMessage(flash.success);
        }
    }, [flash]);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => {
        setIsDialogOpen(false);
        reset();
    };


    const handleEdit = (updatedData: any) => {
        setNotificationMessage('Osoba je uspješno ažurirana.');
    };

    const handleDelete = (id: number) => {
        if (confirm('Jeste li sigurni da želite obrisati ovu osobu?')) {
            destroy(route('osobe.destroy', id), {
                onSuccess: () => {
                    setNotificationMessage('Osoba je uspješno obrisana.');
                },
            });
        }
    };
    const handleOsobaSuccess = () => {
        setIsDialogOpen(false);
        setNotificationMessage('Artikl je uspješno dodan.');
    };
    const closeNotification = () => {
        setNotificationMessage(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Osobe',
            href: '/osobe',
        },
    ];

    const fields: (keyof typeof data)[] = ['ime', 'prezime', 'adresa', 'kontakt'];

    // Filter osobe based on search query
    const filteredOsobe = osobe.filter(osoba =>
        osoba.ime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        osoba.prezime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        osoba.adresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        osoba.kontakt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Osobe" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Osobe</h1>

                {/* Notifikacija */}
                <Notification message={notificationMessage} color={color} onClose={closeNotification} />

                {/* Gumb za otvaranje dijaloga */}
                <Button onClick={openDialog} className="mb-4">
                    Dodaj novu osobu
                </Button>

                {/* Search Input */}
                <Input
                    type="text"
                    placeholder="Pretraži osobe..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                {/* Dijalog za dodavanje nove osobe */}
                <DialogDodajOsobu
                    isOpen={isDialogOpen}
                    onClose={closeDialog}
                    onSuccess={handleOsobaSuccess}
                />

                {/* Tablica s listom osoba */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            {fields.map((field) => (
                                <TableHead key={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </TableHead>
                            ))}
                            <TableHead className="text-right">Akcije</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOsobe.map((osoba) => (
                            <EditableTableRow
                                key={osoba.id}
                                rowData={osoba}
                                onEdit={handleEdit}
                                handleSaveRoute="osobe.update"
                                onDelete={() => handleDelete(osoba.id)}
                                isDeleting={isDeleting}
                                fields={fields}
                                onRowClick={(rowData: Osoba) => {}}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}