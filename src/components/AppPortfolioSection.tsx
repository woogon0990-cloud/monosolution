import React, { useState, useEffect } from 'react';

const APP_PORTFOLIO = [
    {
        id: 1,
        title: '배달의 민족 2.0',
        desc: '기존 배달 앱의 UI/UX를 혁신적으로 개선하여 주문 편의성을 극대화한 푸드테크 플랫폼입니다.',
        icon: 'restaurant_menu',
        color: 'bg-cyan-500'
    },
    {
        id: 2,
        title: '토스 뱅크',
        desc: '복잡한 금융 업무를 직관적인 디자인으로 풀어내어 누구나 쉽게 자산을 관리할 수 있습니다.',
        icon: 'account_balance_wallet',
        color: 'bg-blue-500'
    },
    {
        id: 3,
        title: '당근마켓 Pro',
        desc: '지역 기반 중고 거래를 넘어, 로컬 커뮤니티와 비즈니스를 연결하는 하이퍼 로컬 슈퍼앱입니다.',
        icon: 'storefront',
        color: 'bg-orange-500'
    },
    {
        id: 4,
        title: '직방 VR',
        desc: '가상현실 기술을 도입하여 집을 직접 방문하지 않아도 생생하게 매물을 확인할 수 있습니다.',
        icon: 'apartment',
        color: 'bg-indigo-500'
    },
    {
        id: 5,
        title: '야놀자 글로벌',
        desc: '전 세계 숙소와 액티비티를 한곳에서 예약하고 관리하는 통합 여행 플랫폼입니다.',
        icon: 'flight_takeoff',
        color: 'bg-pink-500'
    }
];

export const AppPortfolioSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    /* Auto-play slider */
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % APP_PORTFOLIO.length);
        }, 4000); // Change slide every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section className="w-full relative py-10 px-4">
            <div className="flex flex-col items-center justify-center w-full">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8 text-center">
                    APP PORTFOLIO
                </h3>

                <div className="w-[calc(100%-32px)] max-w-[100%] md:max-w-md relative overflow-hidden h-[300px]">
                    <div
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {APP_PORTFOLIO.map((app) => (
                            <div key={app.id} className="w-full flex-shrink-0 px-4 flex flex-col items-center justify-center">
                                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${app.color} flex items-center justify-center mb-6 shadow-2xl shadow-black/50`}>
                                    <span className="material-symbols-outlined text-4xl md:text-5xl text-white">{app.icon}</span>
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-white mb-3">{app.title}</h4>
                                <p className="text-sm text-slate-400 text-center leading-relaxed break-keep px-2">
                                    {app.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Numbered Pagination */}
                <div className="flex gap-3 mt-8">
                    {APP_PORTFOLIO.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${activeIndex === idx
                                ? 'bg-primary text-black border-primary scale-110'
                                : 'bg-transparent text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {String(idx + 1).padStart(2, '0')}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
