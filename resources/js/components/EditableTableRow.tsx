// components/EditableTableRow.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import DialogComponent from '@/components/DialogComponent';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { PencilIcon, Trash2 } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
interface EditableTableRowProps {
    rowData: any;
    onEdit: (data: any) => void;
    onDelete: () => void;
    isDeleting: boolean;
    fields: string[];
    onRowClick: (data: any) => void;
    handleSaveRoute: string;
}

export const EditableTableRow: React.FC<React.PropsWithChildren<EditableTableRowProps>> = ({
    rowData,
    onEdit,
    onDelete,
    isDeleting,
    fields,
    onRowClick,
    handleSaveRoute,
    children,
}) => {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { data, setData, put, processing } = useForm(rowData);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleSave = () => {
        put(route(handleSaveRoute, data.id), {
            onSuccess: () => {
                onEdit(data); // Osvježi podatke u glavnoj komponenti
                closeDialog();
            },
            onError: (errors) => {
                console.error('Greška prilikom ažuriranja:', errors);
            },
        });
    };

    return (
        <>
        <TableRow
            onClick={() => onRowClick(rowData)}
            className="cursor-pointer hover:bg-secondary/90 transition">
            {fields.map((field) => (
                <TableCell key={field}>{rowData[field]}</TableCell>
            ))}
            
            {children}
            <TableCell className="text-right space-x-2">
                    <Button variant="edit" size="icon" onClick={openDialog} className="mx-1"><PencilIcon className="w-4 h-4"></PencilIcon> </Button>
                    <Button variant="destructive" onClick={onDelete} disabled={isDeleting} className='mx-1'>
                        {isDeleting ? 'Brisanje...' : <Trash2 className="w-4 h-4"></Trash2>}
                    </Button>
                    </TableCell>
                    
                    </TableRow>

            {/* Dijalog za uređivanje */}
            <DialogComponent
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="Uredi"
                onSubmit={handleSave}
                submitButtonText="Spremi"
                cancelButtonText="Odustani"
                isProcessing={processing}
            >
                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field}>
                            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <Input
                                type="text"
                                value={data[field]}
                                onChange={(e) => setData(field, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </DialogComponent>
        </>
    );
};