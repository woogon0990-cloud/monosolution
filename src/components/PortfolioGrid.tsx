import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '../types';

interface PortfolioGridProps {
    items: PortfolioItem[];
    onView: (item: PortfolioItem) => void;
    onEdit: (item: PortfolioItem) => void;
    isAdmin: boolean;
    itemsPerPage: number;
}

export const PortfolioGrid = ({ items, onView, onEdit, isAdmin, itemsPerPage }: PortfolioGridProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset to page 1 if current page becomes invalid (e.g. items filtered out)
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
    }

    return (
        <div className="space-y-16">
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                <AnimatePresence mode='popLayout'>
                    {currentItems.map((item, index) => (
                        <motion.article
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-secondary border border-white/5 shadow-2xl transition-all duration-500 hover:border-primary/40"
                        >
                            <div onClick={() => onView(item)} className="absolute inset-0 z-10 cursor-pointer"></div>
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[4s] ease-in-out group-hover:scale-110" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20">
                                <div className="size-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-all">
                                    <span className="material-symbols-outlined text-white text-3xl">open_in_full</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 p-10 flex flex-col justify-end items-center z-10 pointer-events-none text-center">
                                <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">{item.category}</span>
                                <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 transform translate-y-2 group-hover:translate-y-0 transition-all">{item.title}</h4>
                                <p className="text-slate-400 text-xs font-light leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-all delay-75 transform translate-y-2 group-hover:translate-y-0">{item.description}</p>
                            </div>

                            {isAdmin && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(item);
                                    }}
                                    className="absolute top-6 left-6 z-30 size-12 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                                    title="관리자 설정"
                                >
                                    <span className="material-symbols-outlined text-xl">tune</span>
                                </button>
                            )}
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-20">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <span className="material-symbols-outlined text-xl">arrow_back</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`size-12 rounded-full font-black transition-all border ${currentPage === i + 1 ? 'bg-black/50 border-primary text-primary shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-110' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="size-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </button>
                </div>
            )}
        </div>
    );
};
