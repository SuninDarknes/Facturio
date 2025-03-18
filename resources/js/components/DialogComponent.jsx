import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function DialogComponent({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    submitButtonText = 'Spremi',
    cancelButtonText = 'Odustani',
    isProcessing = false,
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        {cancelButtonText}
                    </Button>
                    <Button onClick={onSubmit} disabled={isProcessing}>
                        {submitButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}