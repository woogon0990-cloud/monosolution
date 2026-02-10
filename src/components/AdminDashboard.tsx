import React from 'react';
import { PortfolioItem } from '../types';

export interface PopupConfig {
    isActive: boolean;
    title: string;
    mainText: string;
    subText: string;
}

export interface PaginationConfig {
    itemsPerPage: number;
}

interface AdminDashboardProps {
    items: PortfolioItem[];
    popupConfig: PopupConfig;
    onPopupUpdate: (config: PopupConfig) => void;
    paginationConfig: PaginationConfig;
    onPaginationUpdate: (config: PaginationConfig) => void;
    onClose: () => void;
    onEdit: (item: PortfolioItem) => void;
    onDelete: (id: number) => void;
    onAdd: () => void;
    onLogout: () => void;
}

export const AdminDashboard = ({ items, popupConfig, onPopupUpdate, paginationConfig, onPaginationUpdate, onClose, onEdit, onDelete, onAdd, onLogout }: AdminDashboardProps) => {
    const [inquiries, setInquiries] = React.useState<any[]>([]);

    React.useEffect(() => {
        const saved = localStorage.getItem('monosolution_inquiries');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setInquiries(parsed.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            } catch { }
        }
    }, []);
    return (
        <section className="min-h-screen pt-32 pb-20 px-6 md:px-20 animate-fade-in">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 border-b border-white/5 pb-10">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">관리자 페이지</h2>
                        <p className="text-slate-500 font-medium text-lg italic mb-6">"모든 디지털 자산이 이곳에서 통제됩니다."</p>

                        <div className="flex flex-col gap-2 mb-8 md:mb-0">
                            <button onClick={onAdd} className="bg-primary text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 text-xs w-full justify-center md:w-auto">
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                새 프로젝트
                            </button>
                            <div className="flex gap-2">
                                <button onClick={onClose} className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-white/10 transition-all text-xs flex-1 justify-center">
                                    <span className="material-symbols-outlined text-lg">close</span>
                                    나가기
                                </button>
                                <button onClick={onLogout} className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-red-500/20 transition-all text-xs flex-1 justify-center group">
                                    <span className="material-symbols-outlined text-lg group-hover:rotate-180 transition-transform">logout</span>
                                    로그아웃
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Popup Configuration Panel */}
                    <div className="flex-1 max-w-2xl flex flex-col gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">campaign</span>
                                    팝업 설정 (Event Popup)
                                </h3>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={popupConfig.isActive}
                                        onChange={(e) => onPopupUpdate({ ...popupConfig, isActive: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    <span className="ms-2 text-xs font-medium text-slate-400">
                                        {popupConfig.isActive ? '노출 중' : '비활성'}
                                    </span>
                                </label>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <input
                                    type="text"
                                    value={popupConfig.title}
                                    onChange={(e) => onPopupUpdate({ ...popupConfig, title: e.target.value })}
                                    placeholder="팝업 제목 (예: 기간 한정 특가)"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-primary outline-none transition-colors"
                                />
                                <input
                                    type="text"
                                    value={popupConfig.mainText}
                                    onChange={(e) => onPopupUpdate({ ...popupConfig, mainText: e.target.value })}
                                    placeholder="팝업 내용 (예: 올인원 패키지 300,000원)"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-primary outline-none transition-colors"
                                />
                                <input
                                    type="text"
                                    value={popupConfig.subText}
                                    onChange={(e) => onPopupUpdate({ ...popupConfig, subText: e.target.value })}
                                    placeholder="상세 설명 (예: 선착순 마감)"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-primary outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Pagination Configuration */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">view_agenda</span>
                                페이지네이션 설정
                            </h3>
                            <div className="flex items-center justify-between bg-black/20 rounded-xl p-3 border border-white/5">
                                <span className="text-slate-400 text-xs font-bold">페이지당 포트폴리오 노출 개수</span>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        value={paginationConfig.itemsPerPage}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 0;
                                            if (val > 0) onPaginationUpdate({ ...paginationConfig, itemsPerPage: val });
                                        }}
                                        min="1"
                                        className="w-20 bg-transparent text-right text-white font-black text-lg focus:outline-none"
                                    />
                                    <span className="text-xs text-slate-500 font-medium">Items</span>
                                </div>
                            </div>
                        </div>

                        {/* General Configuration */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">inbox</span>
                                상담 접수 현황 (Inquiries)
                            </h3>
                            <div className="bg-black/20 rounded-xl border border-white/5 max-h-[200px] overflow-y-auto custom-scrollbar p-2">
                                {inquiries.length === 0 ? (
                                    <p className="text-slate-500 text-xs text-center py-4">접수된 상담이 없습니다.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {inquiries.map((inq: any) => (
                                            <div key={inq.id} className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-primary font-bold text-xs">{inq.name}</span>
                                                    <span className="text-slate-600 text-[9px]">{new Date(inq.date).toLocaleString()}</span>
                                                </div>
                                                <div className="text-white text-[10px] mb-1">{inq.contact}</div>
                                                <p className="text-slate-400 text-[10px] line-clamp-2">{inq.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {/* Buttons moved to header */}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-2">미리보기 (Preview)</div>
                    <div className="col-span-3">프로젝트명</div>
                    <div className="col-span-2">카테고리</div>
                    <div className="col-span-3">설명 (Summary)</div>
                    <div className="col-span-1 text-right">관리</div>
                </div>

                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <div key={item.id} className="grid grid-cols-12 items-center bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6 hover:border-white/20 transition-all group">
                            <div className="col-span-1 text-slate-500 font-mono text-sm">{idx + 1}</div>
                            <div className="col-span-2">
                                <div className="size-16 rounded-xl bg-cover bg-center grayscale brightness-75 group-hover:grayscale-0 transition-all" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
                            </div>
                            <div className="col-span-3 font-black text-lg md:text-xl tracking-tighter">{item.title}</div>
                            <div className="col-span-2">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded border border-primary/20">{item.category}</span>
                            </div>
                            <div className="col-span-3 text-slate-500 text-sm truncate pr-4">{item.description}</div>
                            <div className="col-span-1 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                    title="수정"
                                >
                                    <span className="material-symbols-outlined text-xl">edit</span>
                                </button>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="size-10 rounded-full bg-white/5 flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-all"
                                    title="삭제"
                                >
                                    <span className="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};
