import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { StavkaIzdatnice, StavkaPrimke, type BreadcrumbItem } from '@/types';
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
import DialogDodajIzdatnicu from '@/components/dodajDialog/DialogDodajIzdatnicu';
import { Izdatnica, Dobavljac, PageProps } from '@/types';

export default function IzdatniceIndex() {
    const { izdatnice, flash } = usePage<PageProps>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedIzdatnica, setSelectedIzdatnica] = useState<Izdatnica | null>(null);
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

    const openDetailsDialog = (izdatnica: Izdatnica) => {
        setSelectedIzdatnica(izdatnica);
        setIsDetailsDialogOpen(true);
    };

    const closeDetailsDialog = () => {
        setIsDetailsDialogOpen(false);
        setSelectedIzdatnica(null);
    };

    const handleEdit = (updatedData: any) => {
        setNotificationMessage('Izdatnica je uspješno ažurirana.');
    };

    const handleDelete = (id: number) => {
        if (confirm('Jeste li sigurni da želite obrisati ovu izdatnicu?')) {
            destroy(route('izdatnice.destroy', id), {
                onSuccess: () => {
                    setNotificationMessage('Izdatnica je uspješno obrisana.');
                },
            });
        }
    };

    const closeNotification = () => {
        setNotificationMessage(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Izdatnice',
            href: '/izdatnice',
        },
    ];

    const fields: (string)[] = ['naziv', 'dobavljac', 'datum', 'cijena_bez_pdv', 'pdv', 'cijena_pdv', 'ukupna_cijena'];

    // Filter izdatnice based on search query
    const filteredIzdatnice = izdatnice.filter(izdatnica =>
        izdatnica.dobavljac.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
        izdatnica.datum.toLowerCase().includes(searchQuery.toLowerCase()) ||
        izdatnica.ukupna_cijena.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Izdatnice" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Izdatnice</h1>

                {/* Notifikacija */}
                <Notification message={notificationMessage} color={color} onClose={closeNotification} />

                {/* Gumb za otvaranje dijaloga */}
                <Button onClick={openDialog} className="mb-4">
                    Dodaj novu izdatnicu
                </Button>

                {/* Search Input */}
                <Input
                    type="text"
                    placeholder="Pretraži izdatnice..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                {/* Dijalog za dodavanje nove izdatnice */}
                <DialogDodajIzdatnicu
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSuccess={(message) => setNotificationMessage(message)}
                />

                {/* Dijalog za prikaz detalja izdatnice */}
                <Dialog open={isDetailsDialogOpen} onOpenChange={closeDetailsDialog}>
                    <DialogContent className='max-w-300'>
                        <DialogHeader>
                            <DialogTitle>{selectedIzdatnica?.naziv}</DialogTitle>
                        </DialogHeader>
                        {selectedIzdatnica && (
                            <div className="space-y-4">
                                <div>
                                    <strong>Dobavljač:</strong> {selectedIzdatnica.dobavljac.naziv}
                                </div>
                                <div>
                                    <strong>Datum:</strong> {selectedIzdatnica.datum}
                                </div>
                                <div>
                                    <strong>Ukupna cijena:</strong> {selectedIzdatnica.ukupna_cijena}
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
                                            {selectedIzdatnica.stavke?.map((stavka) => (
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
                                            {selectedIzdatnica.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena, 0) + " €"}
                                        </div>

                                        <div className='text-left'>
                                            <strong>PDV {selectedIzdatnica.pdv + "%"}: </strong>
                                        </div>
                                        <div className='text-left'>
                                            {selectedIzdatnica.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena * (selectedIzdatnica.pdv / 100), 0) + " €"}
                                        </div>
                                        <div className='text-left'>
                                            <strong>Ukupno:</strong>
                                        </div>
                                        <div className='text-left'>
                                            {selectedIzdatnica.ukupna_cijena + " €"}
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

                {/* Tablica s listom izdatnica */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            {fields.map((field) => (
                                <TableHead key={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1).replaceAll("_", " ")}
                                </TableHead>
                            ))}
                            <TableHead className="text-right">Akcije</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredIzdatnice.map((izdatnica: Izdatnica) => (
                            <EditableTableRow
                                key={izdatnica.id}
                                rowData={{
                                    ...izdatnica,
                                    dobavljac: izdatnica.osoba.ime,
                                    cijena_bez_pdv: izdatnica.stavke.reduce((acc :number, stavka: StavkaIzdatnice) => acc + stavka.kolicina * stavka.cijena * (1 - stavka.popust / 100), 0).toFixed(2) + " €",
                                    pdv: izdatnica.pdv + " %",
                                    cijena_pdv: (izdatnica.ukupna_cijena - izdatnica.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena * (1 - stavka.popust / 100), 0)).toFixed(2) + " €",
                                    ukupna_cijena: izdatnica.ukupna_cijena + " €",
                                    datum: new Date(izdatnica.datum).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }), // Format date as MM:HH DD/MM/YYYY
                                }}
                                onEdit={handleEdit}
                                handleSaveRoute='izdatnice.update'
                                onDelete={() => handleDelete(izdatnica.id)}
                                isDeleting={isDeleting}
                                fields={fields}
                                onRowClick={() => openDetailsDialog(izdatnica)}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}