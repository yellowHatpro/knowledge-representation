import React, { useState } from 'react';

export type DialogProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

const Dialog = ({ open, onClose, title, children }: DialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <>
            {open && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 transition-opacity" onClick={handleClose}>
                            <div className="absolute inset-0 bg-black opacity-75"></div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full bg-blue-100">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-blue-200">
                                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                                    onClick={handleClose}
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-4 py-3">{children}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dialog;
