import React, { useEffect } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioDetailProps {
    item: PortfolioItem;
    onBack: () => void;
    onContact: () => void;
}

export const PortfolioDetail = ({ item, onBack, onContact }: PortfolioDetailProps) => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="min-h-screen bg-[#0a0f1a] animate-fade-in relative">
            <button onClick={onBack} className="fixed top-24 left-6 md:left-20 z-[110] size-14 md:size-16 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all group">
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            </button>

            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110" style={{ backgroundImage: `url(${item.heroImage || item.imageUrl})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-black/30"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20">
                    <div className="max-w-7xl mx-auto">
                        <span className="inline-block px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6">{item.category}</span>
                        <h2 className="text-5xl md:text-9xl font-black tracking-tighter mb-4 text-white uppercase">{item.title}</h2>
                        <div className="h-1 w-24 bg-primary"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-20 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                <div className="lg:col-span-7 space-y-16">
                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-primary tracking-[0.5em] uppercase">Project Essence</h3>
                        <p className="text-2xl md:text-4xl leading-snug font-light text-slate-300">{item.fullDescription || item.description}</p>
                    </div>

                    <div className="space-y-8 p-10 bg-white/5 rounded-[2.5rem] border border-white/10">
                        <h3 className="text-xs font-black text-slate-500 tracking-[0.5em] uppercase">Solution Delivered</h3>
                        <p className="text-xl md:text-2xl font-bold text-white leading-relaxed italic">
                            "{item.solution || '맞춤형 기술 아키텍처를 통한 비즈니스 가치 증대'}"
                        </p>
                    </div>

                    <div className="space-y-10">
                        <h3 className="text-xs font-black text-primary tracking-[0.5em] uppercase">Key Features</h3>
                        <ul className="space-y-4">
                            {(item.features || ['커스텀 UI/UX 설계', '성능 최적화 솔루션', '데이터 보안 아키텍처']).map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-4 text-lg md:text-xl text-slate-400">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-12">
                    <div className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 backdrop-blur-xl">
                        <h3 className="text-xs font-black text-white tracking-[0.5em] uppercase mb-12 text-center">Measured Impact</h3>
                        <div className="space-y-12">
                            {(item.results || ['전환율 180% 상승', '이탈률 40% 감소', '고객 만족도 95%']).map((result, idx) => (
                                <div key={idx} className="text-center group">
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-primary transition-colors tracking-tighter">
                                        {result.split(' ')[1]}
                                    </div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        {result.split(' ')[0]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-10">
                        <button onClick={onContact} className="w-full bg-white text-secondary hover:bg-primary hover:text-white py-8 rounded-[2rem] font-black text-xl transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4">
                            비슷한 프로젝트 문의하기
                            <span className="material-symbols-outlined">rocket_launch</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full h-[40vh] bg-cover bg-fixed grayscale opacity-20" style={{ backgroundImage: `url(${item.imageUrl})` }}></div>
        </section>
    );
};
