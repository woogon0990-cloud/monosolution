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

export const EventPopup = ({ isActive, config, onClose, onEdit }: EventPopupProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage for "Don't show today"
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                        className="relative bg-black border-4 border-[#FFFF00] p-8 md:p-16 rounded-[2rem] shadow-[0_0_100px_rgba(255,255,0,0.3)] max-w-4xl w-full text-center flex flex-col items-center gap-6"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => handleClose(false)}
                            className="absolute top-6 right-6 text-[#FFFF00] hover:scale-110 transition-transform"
                        >
                            <span className="material-symbols-outlined text-4xl">close</span>
                        </button>

                        <div className="space-y-4">
                            <h2 className="text-[#FFFF00] font-black text-5xl md:text-[72px] leading-tight tracking-tighter drop-shadow-[0_4px_0_rgba(255,255,255,0.2)]">
                                30만원으로 홈페이지를???
                            </h2>
                            <h3 className="text-white font-bold text-3xl md:text-[54px] tracking-tight">
                                그것도... 후불로???
                            </h3>
                        </div>

                        <div className="w-24 h-2 bg-[#FFFF00] rounded-full my-4"></div>

                        <p className="text-white text-lg md:text-[20px] font-medium leading-relaxed max-w-2xl text-center break-keep">
                            계약금 0원, 결과물 확인 후 결제!<br />
                            <span className="text-[#FFFF00] font-bold">고깃값으로 AI 시스템을 소유하세요.</span>
                        </p>

                        <div className="flex gap-4 mt-8 w-full md:w-auto">
                            <button
                                onClick={() => {
                                    handleClose(false);
                                    if (config.onConsultationClick) config.onConsultationClick();
                                }}
                                className="flex-1 md:flex-none bg-[#FFFF00] text-black px-10 py-5 rounded-full font-black text-xl hover:bg-white transition-colors shadow-xl"
                            >
                                무료 제작 신청하기
                            </button>
                        </div>

                        {/* Footer Options */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) handleClose(true);
                                    }}
                                    className="accent-[#FFFF00] w-4 h-4 cursor-pointer"
                                />
                                <span className="text-xs text-slate-400 font-bold group-hover:text-[#FFFF00] transition-colors">
                                    오늘 하루 보지 않기
                                </span>
                            </label>
                        </div>

                        {onEdit && (
                            <button onClick={onEdit} className="absolute bottom-4 right-4 text-xs text-zinc-800 hover:text-[#FFFF00] transition-colors">
                                ADMIN
                            </button>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
