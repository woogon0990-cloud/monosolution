import React from 'react';

interface HeroProps {
    onPortfolioClick: () => void;
    onContactClick: () => void;
}

export const Hero = ({ onPortfolioClick, onContactClick }: HeroProps) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-5 md:px-20 overflow-hidden text-center md:text-center">
            <div className="absolute top-[-10%] left-[-10%] size-[70vw] bg-primary/10 rounded-full blur-[180px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] size-[60vw] bg-blue-900/15 rounded-full blur-[150px] -z-10"></div>

            <div className="max-w-6xl mx-auto animate-fade-in relative z-10 w-full">
                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-12 backdrop-blur-md mx-auto">
                    <span className="flex size-2.5 bg-primary rounded-full animate-ping"></span>
                    <span className="text-[11px] font-black tracking-[0.5em] text-slate-300 uppercase">monosolution Technical Studio</span>
                </div>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                        <span className="block text-slate-500 text-2xl md:text-3xl font-bold tracking-widest mb-4 uppercase">No-Code Agency</span>
                        <span className="text-white">상상하는 모든 것을</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">현실로 만듭니다.</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed break-keep">
                        우리는 기술의 장벽을 허물고<br className="md:hidden" /> 가장 빠르고 효율적인 방법으로<br />
                        당신의 비즈니스를 디지털 세상에 선보입니다.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <button onClick={onContactClick} className="w-full md:w-auto bg-primary text-black px-10 py-5 rounded-full font-black text-lg hover:bg-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            프로젝트 시작하기
                            <span className="material-symbols-outlined">arrow_outward</span>
                        </button>
                        <button onClick={onPortfolioClick} className="w-full md:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            포트폴리오 보기
                        </button>
                    </div>
                </div>
            </div>

            <div onClick={onPortfolioClick} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30 group cursor-pointer hover:opacity-100 transition-all duration-500 hidden md:flex">
                <span className="text-[10px] font-black tracking-[0.6em] uppercase italic group-hover:tracking-[0.8em] transition-all">Explore Matrix</span>
                <div className="w-px h-24 bg-gradient-to-b from-white via-white/50 to-transparent"></div>
            </div>
        </section>
    );
};
