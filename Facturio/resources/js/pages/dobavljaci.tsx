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
import DialogComponent from '@/Components/DialogComponent';
import Notification from '@/components/Notification';
import { EditableTableRow } from '@/components/EditableTableRow';
import { Dobavljac, PageProps } from '@/types';


export default function DobavljaciIndex() {
    const { dobavljaci, flash } = usePage<PageProps>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(flash?.success || null);
    const [color, setColor] = useState<string>('bg-green-500');
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    const { data, setData, post, processing, errors, reset } = useForm({
        naziv: '',
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dobavljaci.store'), {
            onSuccess: () => {
                closeDialog();
                setNotificationMessage('Dobavljač je uspješno dodan.');
            },
        });
    };
    
    const handleEdit = (updatedData: any) => {
        setNotificationMessage('Dobavljač je uspješno ažuriran.');
    };
    

    const handleDelete = (id: number) => {
        if (confirm('Jeste li sigurni da želite obrisati ovog dobavljača?')) {
            destroy(route('dobavljaci.destroy', id), {
                onSuccess: () => {
                    setNotificationMessage('Dobavljač je uspješno obrisan.');
                },
            });
        }
    };

    const closeNotification = () => {
        setNotificationMessage(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dobavljači',
            href: '/dobavljaci',
        },
    ];

    const fields: (keyof typeof data)[] = ['naziv', 'adresa', 'kontakt'];

    // Filter dobavljaci based on search query
    const filteredDobavljaci = dobavljaci.filter(dobavljac =>
        dobavljac.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dobavljac.adresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dobavljac.kontakt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dobavljači" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dobavljači</h1>

                {/* Notifikacija */}
                <Notification message={notificationMessage} color={color} onClose={closeNotification} />

                {/* Gumb za otvaranje dijaloga */}
                <Button onClick={openDialog} className="mb-4">
                    Dodaj novog dobavljača
                </Button>

                {/* Search Input */}
                <Input
                    type="text"
                    placeholder="Pretraži dobavljače..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                {/* Dijalog za dodavanje novog dobavljača */}
                <DialogComponent
                    isOpen={isDialogOpen}
                    onClose={closeDialog}
                    title="Dodaj novog dobavljača"
                    onSubmit={handleSubmit}
                    submitButtonText="Spremi"
                    cancelButtonText="Odustani"
                    isProcessing={processing}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {fields.map((field) => (
                                <div key={field}>
                                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <Input
                                        type="text"
                                        value={data[field]}
                                        onChange={(e) => setData(field, e.target.value)}
                                    />
                                    {errors[field] && (
                                        <span className="text-red-500 text-sm">{errors[field]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </form>
                </DialogComponent>

                {/* Tablica s listom dobavljača */}
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
                        {filteredDobavljaci.map((dobavljac) => (
                            <EditableTableRow
                                key={dobavljac.id}
                                rowData={dobavljac}
                                onEdit={handleEdit}
                                handleSaveRoute="dobavljaci.update"
                                onDelete={() => handleDelete(dobavljac.id)}
                                isDeleting={isDeleting}
                                fields={fields}
                                onRowClick={(rowData: Dobavljac) => {}}

                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}