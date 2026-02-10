import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem } from '../types';

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: PortfolioItem) => void;
    onDelete: (id: number) => void;
    item: PortfolioItem | null;
}

export const AdminModal = ({ isOpen, onClose, onSave, onDelete, item }: AdminModalProps) => {
    const [formData, setFormData] = useState<Partial<PortfolioItem>>({
        title: '',
        category: '',
        description: '',
        fullDescription: '',
        solution: '',
        results: ['', '', ''],
        features: ['', '', ''],
        imageUrl: '',
        heroImage: ''
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title,
                category: item.category,
                description: item.description,
                fullDescription: item.fullDescription || '',
                solution: item.solution || '',
                results: item.results?.length ? [...item.results] : ['', '', ''],
                features: item.features?.length ? [...item.features] : ['', '', ''],
                imageUrl: item.imageUrl,
                heroImage: item.heroImage || item.imageUrl
            });
        } else {
            setFormData({
                title: '',
                category: '',
                description: '',
                fullDescription: '',
                solution: '',
                results: ['', '', ''],
                features: ['', '', ''],
                imageUrl: '',
                heroImage: ''
            });
        }
    }, [item, isOpen]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File is too large for local persistence. Max 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(p => ({ ...p, imageUrl: reader.result as string, heroImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData as PortfolioItem,
            id: item?.id,
            results: formData.results!.filter(r => r.trim() !== ''),
            features: formData.features!.filter(f => f.trim() !== '')
        });
        onClose();
    };

    const updateArrayField = (field: 'results' | 'features', index: number, value: string) => {
        const newArr = [...formData[field]!];
        newArr[index] = value;
        setFormData(p => ({ ...p, [field]: newArr }));
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-secondary/95 backdrop-blur-3xl animate-fade-in overflow-y-auto">
            <div className="w-full max-w-4xl bg-[#0d121e] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-3xl relative my-auto">
                <div className="absolute top-0 right-0 p-8">
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                </div>

                <div className="mb-10">
                    <h3 className="text-3xl font-black mb-2 flex items-center gap-4 tracking-tighter uppercase">
                        <span className="material-symbols-outlined text-primary text-4xl">settings_input_component</span>
                        Asset Configuration
                    </h3>
                    <p className="text-slate-500 font-medium italic">"하이엔드 비즈니스 자산의 무결성을 검증하고 배포합니다."</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Main Display Visual</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-video w-full rounded-[2rem] bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden group relative"
                                >
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <span className="material-symbols-outlined text-slate-600 text-4xl">add_photo_alternate</span>
                                    )}
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Strategic Overview</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.fullDescription}
                                    onChange={e => setFormData(p => ({ ...p, fullDescription: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all text-sm font-medium resize-none"
                                    placeholder="핵심 전략 및 비전"
                                ></textarea>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-all text-sm font-bold"
                                    placeholder="프로젝트명"
                                />
                                <input
                                    required
                                    value={formData.category}
                                    onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-all text-sm font-bold"
                                    placeholder="카테고리"
                                />
                            </div>
                            <input
                                required
                                value={formData.solution}
                                onChange={e => setFormData(p => ({ ...p, solution: e.target.value }))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-primary outline-none transition-all text-sm font-bold text-primary"
                                placeholder="Solution 핵심 문구"
                            />

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Measured Impact (Results)</label>
                                {formData.results!.map((res, i) => (
                                    <input
                                        key={`res-${i}`}
                                        value={res}
                                        onChange={e => updateArrayField('results', i, e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary outline-none text-xs font-medium"
                                        placeholder={`예: 전환율 180% 상승 (인덱스 ${i + 1})`}
                                    />
                                ))}
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Features</label>
                                {formData.features!.map((feat, i) => (
                                    <input
                                        key={`feat-${i}`}
                                        value={feat}
                                        onChange={e => updateArrayField('features', i, e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:border-primary outline-none text-xs font-medium"
                                        placeholder={`핵심 기술 ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                        {item && (
                            <button type="button" onClick={() => { onDelete(item.id); onClose(); }} className="px-10 py-5 rounded-2xl border border-red-500/20 text-red-500 font-black hover:bg-red-500/10 transition-all uppercase tracking-widest text-xs">
                                Delete Asset
                            </button>
                        )}
                        <button type="submit" className="flex-grow bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3">
                            DEPLOY CHANGES
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
