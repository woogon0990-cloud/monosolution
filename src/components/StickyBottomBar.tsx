import React from 'react';

export const StickyBottomBar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#F4F4F4] text-[#333333] py-4 px-6 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] border-t border-slate-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1">
                <div className="text-sm font-bold tracking-tight flex items-center gap-3">
                    <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Info</span>
                    <span className="tracking-tighter">월 관리비 1~3만 원  |  의무 약정 1년~</span>
                </div>
                <div className="text-sm font-black tracking-tight animate-pulse">
                    ★ 연 3회 디자인 무상 수정 지원 ★
                </div>
            </div>
        </div>
    );
};
