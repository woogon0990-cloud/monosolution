import React from 'react';
import { REPRESENTATIVE_NUMBER } from '../constants';
import { AppPortfolioSection } from './AppPortfolioSection';

interface PricingSectionProps {
    onConsultationClick: () => void;
}

export const PricingSection = ({ onConsultationClick }: PricingSectionProps) => {
    const plans = [
        {
            name: 'Lite',
            price: '300,000',
            desc: '브랜드 홍보/명함용, 초고속 로딩 세팅',
            features: [
                '반응형 웹 (PC/Mobile)',
                '단일 페이지 (One-Page)',
                '기본 SEO 최적화',
                '초고속 로딩 속도',
                '도메인 연결 지원'
            ],
            highlight: false
        },
        {
            name: 'Standard',
            price: '800,000',
            desc: '알림톡 자동화, 24시간 챗봇, 실시간 상담메일',
            features: [
                'Lite 기능 포함',
                '알림톡/이메일 자동화',
                '24시간 AI 챗봇 연동',
                '관리자 페이지 제공',
                '네이버/구글 SEO 심화',
                '도메인/호스팅 1년 무료'
            ],
            highlight: true,
            tag: '강력추천'
        },
        {
            name: 'Premium',
            price: '1,500,000~',
            desc: '결제 시스템 연동, 맞춤형 DB 및 수익 모델 개발',
            features: [
                'Standard 기능 포함',
                'PG사 결제 연동',
                '회원가입/로그인 기능',
                '맞춤형 DB 설계',
                '수익화 모델 컨설팅',
                '전담 매니저 배정'
            ],
            highlight: false
        }
    ];


    return (
        <section className="py-32 px-4 md:px-20 bg-[#0a0f1a] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 size-[50vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20 animate-fade-in">
                    <h2 className="text-xs font-black text-primary tracking-[0.6em] uppercase mb-6">Service Pricing & Process</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-8">
                        투명한 정찰제 <span className="text-slate-600 italic">Premium.</span>
                    </h3>
                    <p className="text-slate-400 font-light max-w-2xl mx-auto break-keep">
                        MONO SOLUTION은 투명한 정찰제 가격 정책을 통해 불필요한 견적 거품을 제거합니다.<br className="hidden md:block" />
                        하이엔드 퀄리티를 합리적인 비용으로 경험하세요.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`relative p-8 md:p-10 rounded-[2.5rem] border transition-all duration-300 group hover:-translate-y-2 text-center md:text-left ${plan.highlight ? 'bg-white/10 border-primary/50 shadow-[0_0_50px_rgba(254,229,0,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black font-black text-[10px] px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                                    {plan.tag}
                                </div>
                            )}
                            <div className="mb-8">
                                <h4 className={`text-2xl font-black uppercase tracking-tight mb-2 ${plan.highlight ? 'text-primary' : 'text-white'}`}>{plan.name}</h4>
                                <p className="text-slate-500 text-xs font-medium">{plan.desc}</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                                {plan.price !== '별도 문의' && <span className="text-sm font-bold text-slate-500 ml-1">KRW</span>}
                            </div>
                            <ul className="space-y-4 mb-10 inline-block text-left w-full">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300 font-light justify-center md:justify-start">
                                        <span className={`material-symbols-outlined text-lg ${plan.highlight ? 'text-primary' : 'text-slate-600'}`}>check</span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={onConsultationClick} className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${plan.highlight ? 'bg-primary text-black hover:bg-primary/90' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                상담 예약하기
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mb-32">
                    <AppPortfolioSection />
                </div>

                {/* Info Text */}
                <div className="text-center border-t border-white/10 pt-10">
                    <p className="text-slate-500 text-sm font-light mb-4">
                        모든 서비스는 <span className="text-white font-bold">monosolution.ai.kr</span>의 표준 가이드라인을 준수합니다.
                    </p>
                    <button onClick={onConsultationClick} className="text-2xl font-black text-primary hover:text-white transition-colors tracking-tighter border-b-2 border-primary hover:border-white pb-1">
                        무료 컨설팅 예약하기
                    </button>
                </div>
            </div>
        </section>
    );
};
