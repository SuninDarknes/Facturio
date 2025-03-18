import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableRow, TableCell, Table, TableBody, TableHeader, TableHead } from '@/components/ui/table';

import { useForm, usePage } from '@inertiajs/react';
import { Dobavljac, Artikl, PageProps } from '@/types';
import DialogDodajDobavljaca from './DialogDodajDobavljaca';
import DialogDodajArtikl from './DialogDodajArtikl'; // Import dijaloga za dodavanje artikla
import { useSpring, animated } from '@react-spring/web';

interface DialogDodajIzdatnicuProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (message: string) => void;
}
interface Stavka {
    artikl_id: string;
    kolicina: string;
    cijena: string;
    popust: string;
}

interface IzdatnicaData {
    naziv: string;
    dobavljac_id: string;
    datum: string;
    pdv: string;
    ukupna_cijena: number;
    stavke: Stavka[];
    [key: string]: any;
}

export default function DialogDodajIzdatnicu({
    isOpen,
    onClose,
    onSuccess,
}: DialogDodajIzdatnicuProps) {
    const [isDobavljacDialogOpen, setIsDobavljacDialogOpen] = useState(false);
    const [isArtiklDialogOpen, setIsArtiklDialogOpen] = useState(false);
    const [ukupnaCijena, setUkupnaCijena] = useState<number>(0);
    const { dobavljaci, artikli } = usePage<PageProps>().props; // Dobavljaci i artikli se automatski osvježavaju iz backend-a
    const { data, setData, post, processing, errors, reset } = useForm<IzdatnicaData>({
        naziv: '',
        dobavljac_id: '',
        datum: '',
        pdv: '',
        ukupna_cijena: 0,
        stavke: [{ artikl_id: '', kolicina: '1', cijena: '', popust: '' }],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('izdatnice.store'), {
            onSuccess: () => {
                reset();
                onClose();
                onSuccess('Izdatnica je uspješno dodana.');
            },
            onError: () => {
                console.log(errors);
            }
        });
    };

    const handleDobavljacSuccess = () => {
        setIsDobavljacDialogOpen(false); // Zatvori dijalog za dodavanje dobavljača
    };

    const handleArtiklSuccess = () => {
        setIsArtiklDialogOpen(false); // Zatvori dijalog za dodavanje artikla
    };

    const addStavka = () => {
        setData('stavke', [...data.stavke, { artikl_id: '', kolicina: '', cijena: '', popust: '' }]);
    };

    const removeStavka = (index: number) => {
        const newStavke = data.stavke.filter((_, i) => i !== index);
        setData('stavke', newStavke);
    };

    const handleStavkaChange = (index: number, field: keyof typeof data.stavke[0], value: string) => {
        const newStavke = [...data.stavke];
        newStavke[index][field] = value;
        setData('stavke', newStavke);
        console.log(artikli);
        if(field === 'artikl_id'){
            const artikl = artikli.find(artikl => artikl.id.toString() === value);
            if(artikl){
                newStavke[index].cijena = (artikl.cijene[0].cijena).toString();
        }
    }
        setUkupnaCijena(
            newStavke.reduce((acc, stavka) => {
                const cijena = parseFloat(stavka.cijena) || 0;
                const kolicina = parseFloat(stavka.kolicina) || 0;
                const popust = parseFloat(stavka.popust) || 0;
                return acc + cijena * kolicina * (1 - popust / 100);
            }
                , 0)
        );
    };
const animatedUkupnoBezPdv = useSpring({
    number: ukupnaCijena,
    from: { number: 0 }
});

    const animatedUkupno = useSpring({ 
        number: ukupnaCijena * (1 + Number(data.pdv) / 100), 
        from: { number: 0 } 
    });

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-300"> {/* Dodajte klasu za širinu */}
                    <DialogHeader>
                        <DialogTitle>Dodaj novu izdatnicu</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Naziv */}
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

                            {/* Dropdown za odabir dobavljača */}
                            <div>
                                
                                <label>Dobavljač</label>
                                <Select
                                    value={data.dobavljac_id}
                                    onValueChange={(value) => {
                                        if (value === 'novi') {
                                            setIsDobavljacDialogOpen(true); // Otvori dijalog za dodavanje dobavljača
                                        } else {
                                            setData('dobavljac_id', value);
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Odaberi dobavljača" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dobavljaci.map((dobavljac) => (
                                            <SelectItem key={dobavljac.id} value={dobavljac.id.toString()}>
                                                {dobavljac.naziv}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="novi">+ Dodaj novog dobavljača</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.dobavljac_id && (
                                    <span className="text-red-500 text-sm">{errors.dobavljac_id}</span>
                                )}
                            </div>

                            {/* Datum */}
                            <div>
                                <label>Datum</label>
                                <Input
                                    type="datetime-local"
                                    value={data.datum}
                                    onChange={(e) => setData('datum', e.target.value)}
                                />
                                {errors.datum && (
                                    <span className="text-red-500 text-sm">{errors.datum}</span>
                                )}
                            </div>


                            {/* Stavke izdatnice */}
                            <div>
                                <div className="max-h-80 overflow-y-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead > Artikl</TableHead>
                                                <TableHead > Komada</TableHead>
                                                <TableHead > Cijena</TableHead>
                                                <TableHead > Popust</TableHead>
                                                <TableHead className="text-right">Akcije</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                        {data.stavke.map((stavka, index) => (
                                            <TableRow key={index}>
                                                {/* Artikl */}
                                                <TableCell className='w-3/8'>
                                                    <Select
                                                        value={stavka.artikl_id}
                                                        onValueChange={(value) => {
                                                            if (value === 'novi') {
                                                                setIsArtiklDialogOpen(true); // Otvori dijalog za dodavanje artikla
                                                            } else {
                                                                handleStavkaChange(index, 'artikl_id', value);
                                                            }
                                                        }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Odaberi artikl" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {artikli?.map((artikl) => (
                                                                <SelectItem key={artikl.id} value={artikl.id.toString()}>
                                                                    {artikl.naziv}
                                                                </SelectItem>
                                                            ))}
                                                            <SelectItem value="novi">+ Dodaj novi artikl</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {
                                                        errors['stavke.' + index + '.artikl_id'] && (
                                                            <span className="text-red-500 text-sm">Odaberi artikl</span>
                                                        )
                                                    }
                                                </TableCell>

                                                {/* Količina */}
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={stavka.kolicina}
                                                        onChange={(e) => handleStavkaChange(index, 'kolicina', e.target.value)}
                                                    />
                                                    {
                                                        errors['stavke.' + index + '.kolicina'] && (
                                                            <span className="text-red-500 text-sm">Nedostaje broj</span>
                                                        )
                                                    }
                                                </TableCell>

                                                {/* Cijena */}
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={stavka.cijena}
                                                        onChange={(e) => handleStavkaChange(index, 'cijena', e.target.value)}
                                                    />
                                                    {
                                                        errors['stavke.' + index + '.cijena'] && (
                                                            <span className="text-red-500 text-sm">Nedostaje cijena</span>
                                                        )
                                                    }
                                                </TableCell>

                                                {/* Popust */}
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={stavka.popust ? stavka.popust : 0}
                                                        onChange={(e) => handleStavkaChange(index, 'popust', e.target.value)}
                                                    />

                                                </TableCell>

                                                {/* Akcije */}
                                                <TableCell className="text-right">
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        onClick={() => removeStavka(index)}
                                                    >
                                                        Ukloni stavku
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="mt-4 flex justify-between align-top">

                                    <Button type="button" onClick={addStavka}>
                                        Dodaj stavku
                                    </Button>

                                    <div>Ukupno: 
                                    <animated.span className="font-bold">
                                            {useSpring({
    number: ukupnaCijena,
    from: { number: 0 }
}).number.to((n) => n.toFixed(2))}
                                        </animated.span>€
                                        <div className='flex justify-center'>
                                            <label>PDV</label>
                                            <Input
                                                type="number"
                                                value={data.pdv}
                                                onChange={(e) => setData('pdv', e.target.value)}
                                            />
                                            {errors.pdv && (
                                                <span className="text-red-500 text-sm">{errors.pdv}</span>
                                            )}
                                        </div>
                                        <span className="font-bold">
                                      

                                            <animated.span>
                                                {animatedUkupno.number.to((n) => n.toFixed(2))}
                                            </animated.span>€
                                        </span>
                                    </div>
                                </div>
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

            {/* Dijalog za dodavanje novog dobavljača */}
            <DialogDodajDobavljaca
                isOpen={isDobavljacDialogOpen}
                onClose={() => setIsDobavljacDialogOpen(false)}
                onSuccess={handleDobavljacSuccess}
            />

            {/* Dijalog za dodavanje novog artikla */}
            <DialogDodajArtikl
                isOpen={isArtiklDialogOpen}
                onClose={() => setIsArtiklDialogOpen(false)}
                onSuccess={handleArtiklSuccess}
            />
        </>
    );
}