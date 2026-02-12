import React from 'react';

export const ExpertiseSection = () => {
    const stacks = [
        { name: '24시간 자동 비서 시스템', desc: '잠든 사이에도 카톡 알림톡과 챗봇이 사장님 대신 고객을 응대하고 예약까지 잡습니다.', icon: 'hub' },
        { name: '초고속 반응형 홈페이지', desc: '기다림 없는 빠른 속도로 고객의 이탈을 막고, 스마트폰에서도 완벽하게 작동하는 명품 명함을 만듭니다.', icon: 'layers' },
        { name: 'AI 지능형 상담 엔진', desc: '단순한 답변을 넘어 사장님의 사업 데이터를 학습한 AI가 전문적인 상담을 직접 진행합니다.', icon: 'psychology' },
        { name: '100% 철통 보안 관리', desc: '소중한 고객 정보와 상담 데이터를 안전하게 암호화하고, 실시간 백업으로 완벽하게 보호합니다.', icon: 'enhanced_encryption' }
    ];

    return (
        <section className="py-32 px-4 md:px-20 bg-[#0a0f1a] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-xs font-black text-primary tracking-[0.6em] uppercase mb-8 opacity-90">Core Expertise</h2>
                        <h3 className="text-5xl md:text-7xl font-black mb-12 leading-tight tracking-tighter uppercase break-keep">
                            기술적 신뢰성 <br /> <span className="text-slate-600 italic">Reliability.</span>
                        </h3>
                        <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-lg mx-auto md:mx-0 break-keep">
                            "보이는 아름다움 이면의 견고한 기술력을 증명합니다. 0.1초의 레이턴시를 깎아내고, 1%의 최적화를 위해 깊게 파고드는 기술 강박이 완벽을 만듭니다."
                        </p>

                        <div className="flex items-center justify-center md:justify-start gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-black text-white mb-2 tracking-tighter">0.1s</div>
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">목표 응답 속도</div>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-white mb-2 tracking-tighter">99.9%</div>
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">가동률 아키텍처</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {stacks.map((stack, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all group shadow-2xl text-center md:text-left">
                                <span className="material-symbols-outlined text-primary text-4xl mb-8 group-hover:scale-110 transition-transform block md:inline-block mx-auto md:mx-0">{stack.icon}</span>
                                <h4 className="text-xl font-black mb-4 uppercase tracking-tight">{stack.name}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-light break-keep">{stack.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
