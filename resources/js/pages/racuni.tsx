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
import DialogDodajRacun from '@/components/dodajDialog/DialogDodajRacun';
import { Racun, Osoba, PageProps } from '@/types';

export default function RacuniIndex() {
    const { racuni, flash } = usePage<PageProps>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedRacun, setSelectedRacun] = useState<Racun | null>(null);
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

    const openDetailsDialog = (racun: Racun) => {
        setSelectedRacun(racun);
        setIsDetailsDialogOpen(true);
    };

    const closeDetailsDialog = () => {
        setIsDetailsDialogOpen(false);
        setSelectedRacun(null);
    };

    const handleEdit = (updatedData: any) => {
        setNotificationMessage('Račun je uspješno ažuriran.');
    };

    const handleDelete = (id: number) => {
        if (confirm('Jeste li sigurni da želite obrisati ovaj račun?')) {
            destroy(route('racuni.destroy', id), {
                onSuccess: () => {
                    setNotificationMessage('Račun je uspješno obrisan.');
                },
            });
        }
    };

    const closeNotification = () => {
        setNotificationMessage(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Računi',
            href: '/racuni',
        },
    ];

    const fields: (string)[] = ['naziv', 'osoba', 'datum', 'cijena_bez_pdv','pdv','cijena_pdv','ukupna_cijena'];

    // Filter racuni based on search query
    const filteredRacuni = racuni.filter(racun =>
        racun.naziv.toLowerCase().includes(searchQuery.toLowerCase()) ||
        racun.osoba.ime.toLowerCase().includes(searchQuery.toLowerCase()) ||
        racun.datum.toLowerCase().includes(searchQuery.toLowerCase()) ||
        racun.ukupna_cijena.toString().includes(searchQuery.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Računi" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Računi</h1>

                {/* Notifikacija */}
                <Notification message={notificationMessage} color={color} onClose={closeNotification} />

                {/* Gumb za otvaranje dijaloga */}
                <Button onClick={openDialog} className="mb-4">
                    Dodaj novi račun
                </Button>

                {/* Search Input */}
                <Input
                    type="text"
                    placeholder="Pretraži račune..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                />

                {/* Dijalog za dodavanje novog računa */}
                <DialogDodajRacun
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSuccess={(message) => setNotificationMessage(message)}
                />

                {/* Dijalog za prikaz detalja računa */}
                <Dialog open={isDetailsDialogOpen} onOpenChange={closeDetailsDialog}>
                    <DialogContent className='max-w-300'>
                        <DialogHeader>
                            <DialogTitle>{selectedRacun?.naziv}</DialogTitle>
                        </DialogHeader>
                        {selectedRacun && (
                            <div className="space-y-4">
                                <div>
                                    <strong>Osoba:</strong> {selectedRacun.osoba.ime + " " + selectedRacun.osoba.prezime}
                                </div>
                                <div>
                                    <strong>Datum:</strong> {selectedRacun.datum}
                                </div>
                                <div>
                                    <strong>Ukupna cijena:</strong> {selectedRacun.ukupna_cijena}
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
                                            {selectedRacun.stavke?.map((stavka) => (
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
                                            {selectedRacun.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena, 0) + " €"}
                                        </div>

                                        <div className='text-left'>
                                            <strong>PDV {selectedRacun.pdv + "%"}: </strong>
                                        </div>
                                        <div className='text-left'>
                                            {selectedRacun.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena * (selectedRacun.pdv / 100), 0) + " €"}
                                        </div>
                                        <div className='text-left'>
                                            <strong>Ukupno:</strong>
                                        </div>
                                        <div className='text-left'>
                                            {selectedRacun.ukupna_cijena + " €"}
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

                {/* Tablica s listom računa */}
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
                        {filteredRacuni.map((racun: Racun) => (
                            <EditableTableRow
                                key={racun.id}
                                rowData={{
                                    ...racun,
                                    osoba: racun.osoba.ime + " " + racun.osoba.prezime,
                                    cijena_bez_pdv: racun.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena * (1-stavka.popust/100), 0).toFixed(2) + " €", 
                                    pdv: racun.pdv + " %",
                                    cijena_pdv: (racun.ukupna_cijena - racun.stavke.reduce((acc, stavka) => acc + stavka.kolicina * stavka.cijena * (1-stavka.popust/100), 0)).toFixed(2) + " €",
                                    ukupna_cijena: racun.ukupna_cijena.toFixed(2) + " €",
                                    datum: new Date(racun.datum).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }), // Format date as MM:HH DD/MM/YYYY
                                }}
                                onEdit={handleEdit}
                                handleSaveRoute='racuni.update'
                                onDelete={() => handleDelete(racun.id)}
                                isDeleting={isDeleting}
                                fields={fields}
                                onRowClick={() => openDetailsDialog(racun)}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}