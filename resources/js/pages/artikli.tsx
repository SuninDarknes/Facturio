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
import DialogDodajArtikl from '@/components/dodajDialog/DialogDodajArtikl';
import Notification from '@/components/Notification';
import { EditableTableRow } from '@/components/EditableTableRow';
import { Artikl, PageProps } from '@/types';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';

export default function ArtikliIndex() {
    const { artikli, flash } = usePage<PageProps>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const [notificationMessage, setNotificationMessage] = useState<string | null>(flash?.success || null);
    const [color, setColor] = useState<string>('bg-green-500');
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    const { data, setData, post, processing, errors, reset } = useForm({
        naziv: '',
        opis: '',
        cijena: '',
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
        setNotificationMessage('Artikl je uspješno ažuriran.');
    };

    const handleDelete = (id: number) => {
        if (confirm('Jeste li sigurni da želite obrisati ovaj artikl?')) {
            destroy(route('artikli.destroy', id), {
                onSuccess: () => {
                    setNotificationMessage('Artikl je uspješno obrisan.');
                },
            });
        }
    };
    const handleArtiklSuccess = () => {
        setIsDialogOpen(false);
        setNotificationMessage('Artikl je uspješno dodan.');
    };

    const closeNotification = () => {
        setNotificationMessage(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Artikli',
            href: '/artikli',
        },
    ];



    const fields: (keyof typeof data)[] = ['naziv', 'opis', 'cijena'];

    // Filter artikli based on search query
    const filteredArtikli = artikli.filter(artikl =>
        artikl.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artikl.opis.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Artikli" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Artikli</h1>

                {/* Notifikacija */}
                <Notification message={notificationMessage} color={color} onClose={closeNotification} />

                {/* Gumb za otvaranje dijaloga */}
                <Button onClick={openDialog} className="mb-4">
                    Dodaj novi artikl
                </Button>

                {/* Search Input */}
                <Input
                    type="text"
                    placeholder="Pretraži artikle..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                {/* Dijalog za dodavanje novog artikla */}
                <DialogDodajArtikl
                    isOpen={isDialogOpen}
                    onClose={closeDialog}
                    onSuccess={handleArtiklSuccess}
                />

                {/* Tablica s listom artikala */}
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
                        {filteredArtikli.map((artikl) => (
                            <EditableTableRow
                                key={artikl.id}
                                rowData={{
                                    ...artikl,
                                    cijena: artikl.cijene[0]?.cijena.toFixed(2)+ " €",

                                }}
                                onEdit={handleEdit}
                                handleSaveRoute='artikli.update'
                                onDelete={() => handleDelete(artikl.id)}
                                isDeleting={isDeleting}
                                fields={fields}
                                onRowClick={(rowData: Artikl) => { }}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}