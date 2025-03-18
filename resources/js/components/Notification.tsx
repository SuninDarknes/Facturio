import React, { useEffect, useState } from 'react';

interface NotificationProps {
    message: string | null;
    color: string;
    onClose: () => void;
}

export default function Notification({ message, color, onClose }: NotificationProps) {
    const [visible, setVisible] = useState(!!message);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                onClose();
            }, 5000); // Notifikacija nestaje nakon 3 sekunde
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!visible) return null;

    return (
        <div className={`fixed bottom-4 right-4 ${color} text-white px-4 py-2 rounded shadow-lg`}>
            {message}
        </div>
    );
}