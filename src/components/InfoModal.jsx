import React from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700"
                >
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex items-center space-x-2">
                            <Info className="w-5 h-5 text-blue-500" />
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {title}
                            </h3>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>

                    <div className="p-6 text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
                        {content}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default InfoModal;
