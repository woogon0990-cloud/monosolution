import { useState, useEffect, useRef } from 'react';
import { StickyBottomBar } from './components/StickyBottomBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { PortfolioDetail } from './components/PortfolioDetail';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { AdminDashboard } from './components/AdminDashboard';
import { KakaoFloatingButton } from './components/KakaoFloatingButton';
import { PricingSection } from './components/PricingSection';
import { EventPopup } from './components/EventPopup';
import { PORTFOLIO_DATA as initialData } from './constants';
import { PortfolioItem } from './types';
import { ConsultationModal } from './components/ConsultationModal';

const STORAGE_KEY = 'monosolution_v1_data';
const POPUP_STORAGE_KEY = 'monosolution_popup_config';
const ADMIN_KEY = 'monosolution_admin_access';

const App = () => {
    const [scrolled, setScrolled] = useState(false);
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);

    const [popupConfig, setPopupConfig] = useState({
        isActive: true, // Default to true for demo
        title: 'MONO SOLUTION 기간 한정 특가',
        mainText: '웹·앱 제작 국내 최저가 300,000원!',
        subText: '홈페이지 구축부터 세팅까지 완벽하게 도와드립니다.'
    });

    const [paginationConfig, setPaginationConfig] = useState({
        itemsPerPage: 6
    });

    const portfolioRef = useRef<HTMLDivElement>(null);
    const expertiseRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Persistence Logic
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch {
                setItems(initialData);
            }
        } else {
            setItems(initialData);
        }

        // Admin Session Logic
        const session = sessionStorage.getItem(ADMIN_KEY);
        if (session === 'active') setIsAdmin(true);

        // Popup Config Loading
        const savedPopup = localStorage.getItem(POPUP_STORAGE_KEY);
        if (savedPopup) {
            try {
                setPopupConfig(JSON.parse(savedPopup));
            } catch { }
        }

        // Pagination Config Loading
        const savedPagination = localStorage.getItem('monosolution_pagination_config');
        if (savedPagination) {
            try {
                setPaginationConfig(JSON.parse(savedPagination));
            } catch { }
        }



        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (items.length > 0)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(popupConfig));
    }, [popupConfig]);

    useEffect(() => {
        localStorage.setItem('monosolution_pagination_config', JSON.stringify(paginationConfig));
    }, [paginationConfig]);



    const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
        // Close detail/dashboard first to restore scroll context
        setSelectedItem(null);
        setIsDashboardOpen(false);
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    };

    const handleAdminToggle = () => {
        if (isAdmin) {
            if (window.confirm('관리자 모드를 종료하시겠습니까?')) {
                setIsAdmin(false);
                setIsDashboardOpen(false);
                sessionStorage.removeItem(ADMIN_KEY);
                alert('관리자 모드가 종료되었습니다.');
            }
        } else {
            const pass = prompt('Master Key를 입력하세요:');
            if (pass === 'monosolution-admin') {
                setIsAdmin(true);
                sessionStorage.setItem(ADMIN_KEY, 'active');
                alert('System Authenticated. 관리자 모드가 활성화되었습니다.');
            } else if (pass !== null) {
                alert('접근 권한이 없습니다.');
            }
        }
    };

    const handleAddItem = (item: PortfolioItem) => {
        setItems(prev => [{ ...item, id: Date.now() }, ...prev]);
    };

    const handleUpdateItem = (updatedItem: PortfolioItem) => {
        setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const handleDeleteItem = (id: number) => {
        if (window.confirm('이 디지털 자산을 영구적으로 삭제하시겠습니까?')) {
            setItems(prev => prev.filter(item => item.id !== id));
            if (editingItem?.id === id) setEditingItem(null);
        }
    };

    const handleConsultationCheck = () => {
        if (isAdmin) {
            setIsDashboardOpen(true);
        } else {
            handleAdminToggle();
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1a] selection:bg-primary selection:text-white">
            <Navbar
                scrolled={scrolled}
                onAdminClick={handleAdminToggle}
                isAdmin={isAdmin}
                onNavClick={(target) => {
                    if (target === 'portfolio') scrollTo(portfolioRef);
                    if (target === 'expertise') scrollTo(expertiseRef);
                    if (target === 'contact') scrollTo(contactRef);
                }}
                onConsultationClick={() => setIsConsultationOpen(true)}
                onConsultationCheck={handleConsultationCheck}
            />

            <main className="flex-grow">
                {isAdmin && isDashboardOpen ? (
                    <AdminDashboard
                        items={items}
                        popupConfig={popupConfig}
                        onPopupUpdate={setPopupConfig}
                        paginationConfig={paginationConfig}
                        onPaginationUpdate={setPaginationConfig}
                        onClose={() => setIsDashboardOpen(false)}
                        onEdit={(item: PortfolioItem) => { setEditingItem(item); setIsAdminOpen(true); }}
                        onDelete={handleDeleteItem}
                        onAdd={() => { setEditingItem(null); setIsAdminOpen(true); }}
                        onLogout={handleAdminToggle}
                    />
                ) : selectedItem ? (
                    <PortfolioDetail
                        item={selectedItem}
                        onBack={() => setSelectedItem(null)}
                        onContact={() => scrollTo(contactRef)}
                    />
                ) : (
                    <>
                        <Hero
                            onPortfolioClick={() => scrollTo(portfolioRef)}
                            onContactClick={() => scrollTo(contactRef)}
                        />

                        <section id="portfolio" ref={portfolioRef} className="py-32 px-5 md:px-20 relative">
                            <div className="max-w-7xl mx-auto">
                                <div className="mb-24 border-l-[3px] border-primary pl-10">
                                    <h2 className="text-xs font-black text-primary tracking-[0.6em] uppercase mb-4">Portfolio Grid</h2>
                                    <h3 className="text-6xl font-black tracking-tighter text-white uppercase leading-none">
                                        Digital <span className="text-slate-600 italic">Masterpieces.</span>
                                    </h3>
                                    {isAdmin && (
                                        <button onClick={() => setIsDashboardOpen(true)} className="mt-8 flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                                            관리자 콘솔 (Admin) <span className="material-symbols-outlined text-sm">settings_remote</span>
                                        </button>
                                    )}
                                </div>

                                <PortfolioGrid
                                    items={items}
                                    itemsPerPage={paginationConfig.itemsPerPage}
                                    onView={(item: PortfolioItem) => { setSelectedItem(item); window.scrollTo(0, 0); }}
                                    onEdit={(item: PortfolioItem) => { setEditingItem(item); setIsAdminOpen(true); }}
                                    isAdmin={isAdmin}
                                />
                            </div>
                        </section>

                        <PricingSection onConsultationClick={() => setIsConsultationOpen(true)} />

                        <section id="expertise" ref={expertiseRef}>
                            <ExpertiseSection />
                        </section>

                        <section id="contact" ref={contactRef}>
                            <ContactSection />
                        </section>
                    </>
                )}
            </main>

            <Footer onAdminClick={handleAdminToggle} />
            <EventPopup
                isActive={popupConfig.isActive}
                config={{
                    ...popupConfig,
                    onConsultationClick: () => setIsConsultationOpen(true)
                }}
                onClose={() => { }}
            />
            <StickyBottomBar />
            <KakaoFloatingButton />
            <ConsultationModal
                isOpen={isConsultationOpen}
                onClose={() => setIsConsultationOpen(false)}
                onSuccess={() => {
                    alert('성공적으로 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
                    setIsConsultationOpen(false);
                }}
            />

            {isAdmin && !isDashboardOpen && !selectedItem && (
                <button
                    onClick={() => { setEditingItem(null); setIsAdminOpen(true); }}
                    className="fixed bottom-12 left-12 size-20 bg-primary text-white rounded-full shadow-3xl flex items-center justify-center z-[110] hover:scale-110 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-4xl font-black">add</span>
                </button>
            )}

            <AdminModal
                isOpen={isAdminOpen}
                onClose={() => setIsAdminOpen(false)}
                onSave={editingItem ? handleUpdateItem : handleAddItem}
                onDelete={handleDeleteItem}
                item={editingItem}
            />
        </div>
    );
};

export default App;
