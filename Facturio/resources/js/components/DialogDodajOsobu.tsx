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

interface DialogDodajOsobuProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback za uspješno dodavanje
}

export default function DialogDodajOsobu({
    isOpen,
    onClose,
    onSuccess,
}: DialogDodajOsobuProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ime: '',
        prezime: '',
        adresa: '',
        kontakt: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('osobe.store'), {
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
                    <DialogTitle>Dodaj novu osobu</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label>Ime</label>
                            <Input
                                type="text"
                                value={data.ime}
                                onChange={(e) => setData('ime', e.target.value)}
                            />
                            {errors.ime && (
                                <span className="text-red-500 text-sm">{errors.ime}</span>
                            )}
                        </div>
                        <div>
                            <label>Prezime</label>
                            <Input
                                type="text"
                                value={data.prezime}
                                onChange={(e) => setData('prezime', e.target.value)}
                            />
                            {errors.prezime && (
                                <span className="text-red-500 text-sm">{errors.prezime}</span>
                            )}
                        </div>
                        <div>
                            <label>Adresa</label>
                            <Input
                                type="text"
                                value={data.adresa}
                                onChange={(e) => setData('adresa', e.target.value)}
                            />
                            {errors.adresa && (
                                <span className="text-red-500 text-sm">{errors.adresa}</span>
                            )}
                        </div>
                        <div>
                            <label>Kontakt</label>
                            <Input
                                type="text"
                                value={data.kontakt}
                                onChange={(e) => setData('kontakt', e.target.value)}
                            />
                            {errors.kontakt && (
                                <span className="text-red-500 text-sm">{errors.kontakt}</span>
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