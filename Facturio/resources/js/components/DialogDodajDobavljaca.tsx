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

interface DialogDodajDobavljacaProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (message: string) => void;
}

export default function DialogDodajDobavljaca({
    isOpen,
    onClose,
    onSuccess,
}: DialogDodajDobavljacaProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        naziv: '',
        adresa: '',
        kontakt: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dobavljaci.store'), {
            onSuccess: () => {
                reset();
                onClose();
                onSuccess('Dobavljač je uspješno dodan.');
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dodaj novog dobavljača</DialogTitle>
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