import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KAKAOTALK_LINK } from '../constants';

export const KakaoFloatingButton = () => {
    return (
        <a
            href={KAKAOTALK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[200] group"
        >
            <div className="relative flex items-center justify-end">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="hidden md:flex flex-col items-end absolute right-16 pointer-events-none"
                    >
                        <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2 whitespace-nowrap origin-right mb-2">
                            <span className="text-sm font-bold text-gray-800">실시간 상담하기</span>
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r border-t border-gray-100"></div>
                        </div>
                        <div className="bg-primary/90 text-[10px] text-black font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            상담이 시작됩니다
                        </div>
                    </motion.div>
                </AnimatePresence>


                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        y: [0, -10, 0]
                    }}
                    transition={{
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="size-14 bg-[#FEE500] rounded-full shadow-xl flex items-center justify-center cursor-pointer hover:shadow-2xl transition-shadow"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 3C6.47715 3 2 6.47715 2 10.7692C2 13.6269 3.86472 16.0888 6.64333 17.4077L5.61715 21.056C5.46733 21.5873 6.068 21.9961 6.51602 21.666L11.0853 18.2541C11.3862 18.2755 11.6917 18.2885 12 18.2885C17.5228 18.2885 22 14.8113 22 10.5192C22 6.22718 17.5228 3 12 3Z" fill="black" />
                    </svg>

                    {/* Live Indicator */}
                    <span className="absolute top-0 right-0 p-1">
                        <span className="block size-3 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                    </span>
                </motion.div>
            </div>
        </a>
    );
};
