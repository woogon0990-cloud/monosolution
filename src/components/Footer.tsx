import React from 'react';
import { KAKAOTALK_LINK } from '../constants';

interface FooterProps {
    onAdminClick: () => void;
}

export const Footer = ({ onAdminClick }: FooterProps) => {
    return (
        <footer className="bg-secondary border-t border-white/10">
            <div className="max-w-7xl mx-auto px-5 md:px-20 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start mb-24 text-center md:text-left">
                    <div className="animate-fade-in">
                        <a href="https://monosolution.ai.kr" className="flex items-center justify-center md:justify-start gap-3 mb-10 group cursor-pointer">
                            <div className="size-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl shadow-primary/20">
                                <span className="material-symbols-outlined text-white text-2xl font-bold">hexagon</span>
                            </div>
                            <span className="text-3xl font-black tracking-tighter text-white">monosolution</span>
                        </a>
                        <p className="text-slate-500 max-w-sm mx-auto md:mx-0 mb-12 leading-relaxed font-light text-xl italic break-keep">
                            "우리는 단순한 웹사이트가 아닌, <span className="text-white font-bold">비즈니스의 압도적 경쟁력</span>을 설계합니다."
                        </p>

                        <div className="space-y-8 text-slate-400 text-sm font-medium">
                            <div className="flex items-start justify-center md:justify-start gap-5">
                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                                </div>
                                <div className="text-left md:text-left">
                                    <span className="block font-bold text-white mb-1 uppercase tracking-widest text-[10px]">Office Base</span>
                                    <span className="text-slate-500">충남 천안시 서북구 (상담 예약제 운영)</span>
                                </div>
                            </div>
                            <div className="flex items-start justify-center md:justify-start gap-5">
                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-xl">person</span>
                                </div>
                                <div className="text-left md:text-left">
                                    <span className="block font-bold text-white mb-1 uppercase tracking-widest text-[10px]">Owner / Representative</span>
                                    <span className="text-slate-500">김우곤 (Woogon Kim)</span>
                                </div>
                            </div>
                            <div className="flex items-start justify-center md:justify-start gap-5">
                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-xl">mail</span>
                                </div>
                                <div className="text-left md:text-left">
                                    <span className="block font-bold text-white mb-1 uppercase tracking-widest text-[10px]">Secure Email</span>
                                    <a href="mailto:woogon0990@gmail.com" className="text-slate-500 hover:text-white transition-colors">woogon0990@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start justify-center md:justify-start gap-5">
                                <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-xl">chat</span>
                                </div>
                                <div className="text-left md:text-left">
                                    <span className="block font-bold text-white mb-1 uppercase tracking-widest text-[10px]">1:1 Consultation</span>
                                    <a href={KAKAOTALK_LINK} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors font-bold underline decoration-primary/30 underline-offset-4">
                                        카카오톡 실시간 상담 바로가기
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 w-full">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 flex items-center justify-center md:justify-start gap-4">
                            <span className="w-12 h-px bg-slate-800"></span>
                            운영 본부 (Operation Hub)
                        </h4>

                        <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/5 grayscale-[0.9] hover:grayscale-0 transition-all duration-1000 cursor-crosshair group relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.541444143494!2d127.1512456!3d36.781354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ad604c5a6b09f%3A0x6a0a09e3e3b7b2b!2z7LKc7JWI7IucIOuPmOuCqMq1rCDslpHroztlowsmrTsIq!5e0!3m2!1sko!2skr!4v1715000000001!5m2!1sko!2skr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                title="monosolution HQ"
                            ></iframe>
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-all pointer-events-none"></div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between px-2 gap-4 md:gap-0">
                            <a href="https://monosolution.ai.kr" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-all group">
                                monosolution.ai.kr
                                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>
                            <button onClick={onAdminClick} className="text-[9px] text-slate-800 font-black uppercase tracking-[0.5em] hover:text-slate-500 transition-colors">
                                관리자 접속
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col gap-3 text-center md:text-left">
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em]">© 2026 monosolution. All Rights Reserved.</p>
                        <p className="text-[9px] text-slate-700 font-medium">Technical Studio of Excellence. No-Code / High-End Design / Full Integration.</p>
                    </div>

                    <div className="flex items-center gap-10">
                        {['LinkedIn', 'Instagram', 'GitHub'].map(social => (
                            <a href="#" key={social} className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-[0.3em] transition-all relative group">
                                {social}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all"></span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
