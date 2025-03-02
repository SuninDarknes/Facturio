import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

interface DialogDodajArtiklProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback za uspješno dodavanje
}

export default function DialogDodajArtikl({
    isOpen,
    onClose,
    onSuccess,
}: DialogDodajArtiklProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        naziv: '',
        opis: '',
        cijena: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('artikli.store'), {
            onSuccess: () => {
                reset();
                onClose();
                onSuccess(); // Pozivamo callback za osvježavanje podataka
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dodaj novi artikl</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label>Naziv</label>
                            <Input
                                type="text"
                                value={data.naziv}
                                onChange={(e) => setData('naziv', e.target.value)}
                            />
                            {errors.naziv && (
                                <span className="text-red-500 text-sm">{errors.naziv}</span>
                            )}
                        </div>
                        <div>
                            <label>Opis</label>
                            <Input
                                type="text"
                                value={data.opis}
                                onChange={(e) => setData('opis', e.target.value)}
                            />
                            {errors.opis && (
                                <span className="text-red-500 text-sm">{errors.opis}</span>
                            )}
                        </div>
                        <div>
                            <label>Prodajna cijena (€)</label>
                            <Input
                                type="number"
                                value={data.cijena}
                                onChange={(e) => setData('cijena', e.target.value)}
                            />
                            {errors.opis && (
                                <span className="text-red-500 text-sm">{errors.cijena}</span>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>
                            Odustani
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Spremi
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}