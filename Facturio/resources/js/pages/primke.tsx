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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import Notification from '@/components/Notification';
import { EditableTableRow } from '@/components/EditableTableRow';
import DialogDodajPrimku from '@/components/DialogDodajPrimku';
import { Primka, Dobavljac, PageProps } from '@/types';

export default function PrimkeIndex() {
    const { primke, flash } = usePage<PageProps>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedPrimka, setSelectedPrimka] = useState<Primka | null>(null);
    const [notificationMessage, setNotificationMessage] = useState<string | null>(flash?.success || null);
    const [color, setColor] = useState<string>('bg-green-500');
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query


    const { delete: destroy, processing: isDeleting } = useForm({});

    useEffect(() => {
        if (flash?.success) {
            setNotificationMessage(flash.success);
        }
    }, [flash]);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const openDetailsDialog = (primka: Primka) => {
        setSelectedPrimka(primka);
        setIsDetailsDialogOpen(true);
    };

    const closeDetailsDialog = () => {
        setIsDetailsDialogOpen(false);
        setSelectedPrimka(null);
    };


    const handleEdit = (updatedData: any) => {
        setNotificationMessage('Primka je uspješno ažurirana.');
    };

    const handleDelete = (id: number) => {
        if (confirm('Jeste li sigurni da želite obrisati ovu primku?')) {
            destroy(route('primke.destroy', id), {
                onSuccess: () => {
                    setNotificationMessage('Primka je uspješno obrisana.');
                },
            });
        }
    };


    const closeNotification = () => {
        setNotificationMessage(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Primke',
            href: '/primke',
        },
    ];

    const fields: (string)[] = ['naziv', 'dobavljac', 'datum', 'ukupna_cijena'];

    // Filter primke based on search query
    const filteredPrimke = primke.filter(primka =>
        primka.dobavljac.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
        primka.datum.toLowerCase().includes(searchQuery.toLowerCase()) ||
        primka.ukupna_cijena.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Primke" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Primke</h1>

                {/* Notifikacija */}
                <Notification message={notificationMessage} color={color} onClose={closeNotification} />

                {/* Gumb za otvaranje dijaloga */}
                <Button onClick={openDialog} className="mb-4">
                    Dodaj novu primku
                </Button>

                {/* Search Input */}
                <Input
                    type="text"
                    placeholder="Pretraži primke..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                {/* Dijalog za dodavanje nove primke */}
                <DialogDodajPrimku
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSuccess={(message) => setNotificationMessage(message)}
                />


                {/* Dijalog za prikaz detalja primke */}
                <Dialog open={isDetailsDialogOpen} onOpenChange={closeDetailsDialog}>
                    <DialogContent className='max-w-300'>
                        <DialogHeader>
                            <DialogTitle>{selectedPrimka?.naziv}</DialogTitle>
                        </DialogHeader>
                        {selectedPrimka && (
                            <div className="space-y-4">
                                <div>
                                    <strong>Dobavljač:</strong> {selectedPrimka.dobavljac.naziv}
                                </div>
                                <div>
                                    <strong>Datum:</strong> {selectedPrimka.datum}
                                </div>
                                <div>
                                    <strong>Ukupna cijena:</strong> {selectedPrimka.ukupna_cijena}
                                </div>
                                <div>
                                    <strong>Stavke:</strong>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Artikl</TableHead>
                                                <TableHead>Komada</TableHead>
                                                <TableHead>Cijena</TableHead>
                                                <TableHead>Popust</TableHead>
                                                <TableHead>Cijena nakon popusta</TableHead>
                                                <TableHead>Iznos</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedPrimka.stavke?.map((stavka) => (
                                                <TableRow key={stavka.id}>
                                                    <TableCell>{stavka.artikl.naziv}</TableCell>
                                                    <TableCell>{stavka.kolicina}</TableCell>
                                                    <TableCell>{stavka.cijena + " €"}</TableCell>
                                                    <TableCell>{stavka.popust + " %"}</TableCell>
                                                    <TableCell>{stavka.cijena * ((100 - stavka.popust) / 100) + " €"}</TableCell>
                                                    <TableCell>{stavka.kolicina * stavka.cijena * ((100 - stavka.popust) / 100) + " €"}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className='flex justify-end mt-4'>
                                    <div className='grid grid-cols-2 gap-4 '>
                                    <div className='text-left'>
                                            <strong>Cijena:</strong>
                                        </div>
                                        <div className='text-left'>
                                            { selectedPrimka.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena, 0) + " €"}
                                        </div>

                                        <div className='text-left'>
                                            <strong>PDV {selectedPrimka.pdv + "%"}: </strong>
                                        </div>
                                        <div className='text-left'>
                                            {selectedPrimka.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena * (selectedPrimka.pdv / 100), 0) + " €"}
                                        </div>
                                        <div className='text-left'>
                                            <strong>Ukupno:</strong>
                                        </div>
                                        <div className='text-left'>
                                            {selectedPrimka.ukupna_cijena + " €"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={closeDetailsDialog}>Zatvori</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Tablica s listom primki */}
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
                        {filteredPrimke.map((primka: Primka) => (
                            <EditableTableRow
                                key={primka.id}
                                rowData={{
                                    ...primka,
                                    dobavljac: primka.dobavljac.naziv,
                                    datum: new Date(primka.datum).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }), // Format date as MM:HH DD/MM/YYYY
                                }}
                                onEdit={handleEdit}
                                handleSaveRoute='primke.update'
                                onDelete={() => handleDelete(primka.id)}
                                isDeleting={isDeleting}
                                fields={fields}
                                onRowClick={() => openDetailsDialog(primka)}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}