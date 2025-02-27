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
import { Artikl, PageProps } from '@/types';

export default function ArtikliIndex() {
    const { artikli, flash } = usePage<PageProps>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(flash?.success || null);
    const [color, setColor] = useState<string>('bg-green-500');
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
    const [opisFields, setOpisFields] = useState<{ key: string; value: string }[]>([]); // State for opis fields

    const { data, setData, post, processing, errors, reset } = useForm({
        naziv: '',
        opis: '', // Opis će biti JSON objekt
        jedinica_mjere: '',
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
        setOpisFields([]); // Reset opis fields
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Pretvori opisFields u JSON objekt
        const opis = opisFields.reduce((acc, field) => {
            acc[field.key] = field.value;
            return acc;
        }, {} as Record<string, string>);
    
        // Ažuriraj data objekt s opisom
        setData({
            ...data,
            opis: JSON.stringify(opis), // Pretvori opis u string
        });
    
        // Pošalji podatke na backend
        post(route('artikli.store'), {
            onSuccess: () => {
                closeDialog();
                setNotificationMessage('Artikl je uspješno dodan.');
            },
        });
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

    const closeNotification = () => {
        setNotificationMessage(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Artikli',
            href: '/artikli',
        },
    ];

    const fields: (keyof typeof data)[] = ['naziv', 'jedinica_mjere'];

    // Filter artikli based on search query
    const filteredArtikli = artikli.filter(artikl =>
        artikl.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artikl.jedinica_mjere.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Dodaj novi opis field
    const addOpisField = () => {
        setOpisFields([...opisFields, { key: '', value: '' }]);
    };

    // Ukloni opis field
    const removeOpisField = (index: number) => {
        const newFields = [...opisFields];
        newFields.splice(index, 1);
        setOpisFields(newFields);
    };

    // Ažuriraj opis field
    const updateOpisField = (index: number, key: string, value: string) => {
        const newFields = [...opisFields];
        newFields[index] = { key, value };
        setOpisFields(newFields);
    };

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
                <DialogComponent
                    isOpen={isDialogOpen}
                    onClose={closeDialog}
                    title="Dodaj novi artikl"
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

                            {/* Opis fields */}
                            <div>
                                <label>Opis</label>
                                {opisFields.map((field, index) => (
                                    <div key={index} className="flex space-x-2 mb-2">
                                        <Input
                                            type="text"
                                            placeholder="Naziv atributa"
                                            value={field.key}
                                            onChange={(e) => updateOpisField(index, e.target.value, field.value)}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Vrijednost atributa"
                                            value={field.value}
                                            onChange={(e) => updateOpisField(index, field.key, e.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => removeOpisField(index)}
                                            variant="destructive"
                                        >
                                            Ukloni
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" onClick={addOpisField} className="mt-2">
                                    Dodaj atribut
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogComponent>

                {/* Tablica s listom artikala */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            {fields.map((field) => (
                                <TableHead key={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </TableHead>
                            ))}
                            <TableHead>Opis</TableHead>
                            <TableHead className="text-right">Akcije</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredArtikli.map((artikl) => (
                            <EditableTableRow
                                key={artikl.id}
                                rowData={artikl}
                                onEdit={handleEdit}
                                handleSaveRoute='artikli.update'
                                onDelete={() => handleDelete(artikl.id)}
                                isDeleting={isDeleting}
                                fields={fields}
                                onRowClick={(rowData: Artikl) => {}}
                            >
                                <TableCell>
                                    {artikl.opis && Object.entries(artikl.opis).map(([key, value]) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value}
                                        </div>
                                    ))}
                                </TableCell>
                            </EditableTableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}