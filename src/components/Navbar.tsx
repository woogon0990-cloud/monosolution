import React from 'react';
import { REPRESENTATIVE_NUMBER } from '../constants';

interface NavbarProps {
    scrolled: boolean;
    onAdminClick: () => void;
    isAdmin: boolean;
    onNavClick: (target: string) => void;
    onConsultationClick: () => void;
}

export const Navbar = ({ scrolled, onAdminClick, isAdmin, onNavClick, onConsultationClick }: NavbarProps) => {
    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b ${scrolled ? 'bg-secondary/80 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-6'} px-6 md:px-20`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <a href="/" className="flex items-center gap-2 group">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                        <span className="material-symbols-outlined text-white text-xl font-bold">hexagon</span>
                    </div>
                    <span className="text-xl font-black tracking-tighter">monosolution</span>
                    {isAdmin && (
                        <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black uppercase rounded border border-primary/30">ADMIN</span>
                    )}
                </a>

                <div className="hidden md:flex items-center gap-10 font-bold text-[13px] tracking-widest uppercase">
                    <button onClick={() => onNavClick('portfolio')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">포트폴리오</button>
                    <button onClick={() => onNavClick('expertise')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">전문 분야</button>
                    <button onClick={() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' })} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">제작 비용</button>
                    <button onClick={() => onNavClick('contact')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">문의하기</button>
                    <button onClick={onAdminClick} className={`${isAdmin ? 'text-red-500 hover:text-red-400' : 'text-slate-500 hover:text-white'} transition-colors flex items-center gap-2`}>
                        <span className="material-symbols-outlined text-lg">{isAdmin ? 'logout' : 'admin_panel_settings'}</span>
                        {isAdmin ? '로그아웃' : '관리'}
                    </button>
                    <button onClick={onConsultationClick} className="text-white font-black hover:text-primary transition-colors tracking-widest text-xs border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 hover:border-white/50">
                        상담 예약조회
                    </button>
                    <button onClick={onConsultationClick} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full transition-all shadow-xl shadow-primary/20 active:scale-95">
                        무료 컨설팅 신청
                    </button>
                </div>

                <button className={`md:hidden p-2 ${isAdmin ? 'text-red-500' : 'text-white'}`} onClick={onAdminClick}>
                    <span className="material-symbols-outlined">{isAdmin ? 'logout' : 'admin_panel_settings'}</span>
                </button>
            </div>
        </nav>
    );
};
