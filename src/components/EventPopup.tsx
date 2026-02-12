import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventPopupProps {
    isActive: boolean;
    config: {
        title: string;
        mainText: string;
        subText: string;
        onConsultationClick?: () => void;
    };
    onClose: () => void;
    onEdit?: () => void;
}

const popupStyles = {
    container: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60",
    content: "relative w-[85%] max-w-[320px] md:max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden", // Mobile First
    appCenter: "grid grid-cols-4 gap-2 p-3 w-full justify-items-center bg-gray-50",
    appIcon: "w-10 h-10 md:w-16 md:h-16 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm text-xl" // Smaller icons
};

export const EventPopup = ({ isActive, config, onClose, onEdit }: EventPopupProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const doNotShowDate = localStorage.getItem('monosolution_popup_dns');
        const today = new Date().toDateString();
        if (isActive && doNotShowDate !== today) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isActive]);

    const handleClose = (doNotShow: boolean) => {
        setIsVisible(false);
        if (doNotShow) {
            localStorage.setItem('monosolution_popup_dns', new Date().toDateString());
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className={popupStyles.container}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={popupStyles.content}
                    >
                        {/* Header Image or Gradient */}
                        <div className="h-32 bg-gradient-to-br from-primary to-yellow-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h2 className="font-black text-2xl tracking-tighter shadow-black/10 drop-shadow-lg">{config.title || 'SPECIAL OFFER'}</h2>
                            </div>
                            <button
                                onClick={() => handleClose(false)}
                                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors backdrop-blur-sm"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 text-center">
                            <h3 className="text-slate-800 font-bold text-xl mb-2">{config.mainText}</h3>
                            <p className="text-slate-500 text-sm mb-6 whitespace-pre-line leading-relaxed">{config.subText}</p>

                            {/* App Icon Grid (Visual Metaphor) */}
                            <div className={popupStyles.appCenter}>
                                {['rocket_launch', 'campaign', 'monitoring', 'group_add', 'payments', 'security', 'support_agent', 'verified'].map((icon, i) => (
                                    <div key={icon} className={popupStyles.appIcon}>
                                        <span className="material-symbols-outlined text-slate-600">{icon}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 border-t border-gray-100 flex flex-col gap-3 bg-white">
                            <button
                                onClick={() => {
                                    handleClose(false);
                                    if (config.onConsultationClick) config.onConsultationClick();
                                }}
                                className="w-full bg-primary text-black py-4 rounded-xl font-black text-lg hover:bg-yellow-300 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">touch_app</span>
                                무료 상담 신청하기
                            </button>

                            <label className="flex items-center justify-center gap-2 cursor-pointer pt-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) handleClose(true);
                                    }}
                                    className="accent-slate-500 w-4 h-4"
                                />
                                <span className="text-xs text-slate-400 font-medium">
                                    오늘 하루 보지 않기
                                </span>
                            </label>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
