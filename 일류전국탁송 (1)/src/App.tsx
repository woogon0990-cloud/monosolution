/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Truck, 
  Car, 
  Zap, 
  Bus, 
  Ship, 
  HardHat, 
  PhoneCall, 
  MessageCircle, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Loader2,
  User,
  Settings
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { generateTransportImage } from './services/imageService';
import DriverRecruitment from './components/DriverRecruitment';
import ScrapExport from './components/ScrapExport';
import ConsignmentForm from './components/ConsignmentForm';
import ConsignmentService from './components/ConsignmentService';
import CustomerCenter from './components/CustomerCenter';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import PopupManager from './components/PopupManager';
import Chatbot from './components/Chatbot';
import { useAuth, useContent } from './AuthContext';
import * as LucideIcons from 'lucide-react';

const steps = [
  { id: "01", title: "상담신청", desc: "차종 및 지역 정보 기반\n실시간 무료 견적 상담" },
  { id: "02", title: "현장픽업", desc: "원하는 시간과 장소로\n전문 기사가 방문하여 인수" },
  { id: "03", title: "대금지급", desc: "차량 입고 즉시 확인 후\n당일 최고가 현금 지급" },
  { id: "04", title: "말소처리", desc: "관공서 말소 신고 대행 및\n말소증명서 비대면 발송" }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'recruitment' | 'scrapExport' | 'consignmentForm' | 'consignmentService' | 'customerCenter' | 'login' | 'admin'>('home');
  const { user, logout, isAdmin } = useAuth();
  const { content } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Helper to render icon by name
  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Car className="w-8 h-8" />;
  };

  useEffect(() => {
    async function loadImage() {
      try {
        const img = await generateTransportImage();
        setHeroImage(img);
      } catch (error) {
        console.error("Failed to generate image:", error);
      } finally {
        setIsLoadingImage(false);
      }
    }
    loadImage();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Truck className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-black text-blue-900 tracking-tighter">일류전국탁송</span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              {[
                { name: '탁송서비스', page: 'consignmentService' },
                { name: '폐차/수출', page: 'scrapExport' },
                { name: '기사모집', page: 'recruitment' },
                { name: '고객센터', page: 'customerCenter' }
              ].map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => setCurrentPage(item.page as any)}
                  className={`text-[15px] font-semibold transition-colors ${
                    currentPage === item.page && item.page !== 'home' 
                      ? 'text-blue-600' 
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-4 border-r border-slate-100 pr-6 mr-2">
                {user ? (
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{user.role}</span>
                      <span className="text-xs font-bold text-slate-900">{user.email.split('@')[0]}님</span>
                    </div>
                    <button 
                      onClick={logout}
                      className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"
                    >
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setCurrentPage('login')}
                    className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-blue-600 transition-colors group"
                  >
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold">로그인</span>
                  </button>
                )}
                
                {isAdmin && (
                  <button 
                    onClick={() => setCurrentPage('admin')}
                    className={`flex flex-col items-center gap-0.5 transition-colors group ${currentPage === 'admin' ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
                  >
                    <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    <span className="text-[10px] font-bold">관리자</span>
                  </button>
                )}
              </div>
              <button 
                onClick={() => setCurrentPage('consignmentForm')}
                className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-lg shadow-orange-500/20"
              >
                무료 견적 신청
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 py-6 px-6 space-y-6">
            <div className="flex justify-around items-center pb-4 border-b border-slate-50">
              {user ? (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{user.role}</span>
                  <span className="text-sm font-bold text-slate-900">{user.email}</span>
                  <button onClick={logout} className="text-xs text-red-500 font-bold mt-1">로그아웃</button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setCurrentPage('login');
                    setIsMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 text-slate-600"
                >
                  <User className="w-6 h-6" />
                  <span className="text-xs font-bold">로그인/가입</span>
                </button>
              )}
              
              {isAdmin && (
                <button 
                  onClick={() => {
                    setCurrentPage('admin');
                    setIsMenuOpen(false);
                  }}
                  className="flex flex-col items-center gap-1 text-slate-600"
                >
                  <Settings className="w-6 h-6" />
                  <span className="text-xs font-bold">관리자</span>
                </button>
              )}
            </div>
            <div className="space-y-4">
              {[
                { name: '탁송서비스', page: 'consignmentService' },
                { name: '폐차/수출', page: 'scrapExport' },
                { name: '기사모집', page: 'recruitment' },
                { name: '고객센터', page: 'customerCenter' }
              ].map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => {
                    setCurrentPage(item.page as any);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left text-lg font-semibold transition-colors ${
                    currentPage === item.page && item.page !== 'home' 
                      ? 'text-blue-600' 
                      : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button 
              onClick={() => {
                setCurrentPage('consignmentForm');
                setIsMenuOpen(false);
              }}
              className="w-full bg-[#FF9800] text-white py-4 rounded-xl font-bold text-lg"
            >
              무료 견적 신청
            </button>
          </div>
        )}
      </nav>

      {currentPage === 'recruitment' ? (
        <DriverRecruitment onConsult={() => setIsChatbotOpen(true)} />
      ) : currentPage === 'scrapExport' ? (
        <ScrapExport />
      ) : currentPage === 'consignmentForm' ? (
        <ConsignmentForm onBack={() => setCurrentPage('home')} />
      ) : currentPage === 'consignmentService' ? (
        <ConsignmentService onConsult={() => setIsChatbotOpen(true)} />
      ) : currentPage === 'customerCenter' ? (
        <CustomerCenter onBack={() => setCurrentPage('home')} />
      ) : currentPage === 'login' ? (
        <LoginPage onSuccess={() => setCurrentPage('home')} />
      ) : currentPage === 'admin' ? (
        isAdmin ? <AdminDashboard /> : <LoginPage onSuccess={() => setCurrentPage('admin')} />
      ) : (
        <>
          <PopupManager />
          {/* Hero Section */}
          <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Animated Connection Boxes */}
            <div className="flex flex-col gap-8 justify-center order-2 lg:order-1">
              <motion.button
                onClick={() => setCurrentPage('consignmentForm')}
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full bg-white border-4 border-blue-50 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl hover:shadow-blue-200/50 hover:border-blue-400 transition-all text-left group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="text-blue-600 font-black text-lg uppercase tracking-widest mb-3 block">Quick Service</span>
                  <h3 className="text-3xl lg:text-6xl font-black text-slate-900 mb-4 tracking-tighter">{content.heroTitle.includes('상담') ? content.heroTitle : '탁송 상담'}</h3>
                  <p className="text-lg lg:text-2xl text-slate-500 font-bold">실시간 전문가 1:1 상담 연결</p>
                </div>
                <div className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Truck className="w-64 h-64" />
                </div>
                <div className="absolute bottom-8 right-10 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                  <ChevronRight className="w-8 h-8" />
                </div>
              </motion.button>

              <motion.button
                onClick={() => setCurrentPage('scrapExport')}
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="w-full bg-slate-900 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl hover:shadow-orange-500/20 transition-all text-left group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="text-orange-400 font-black text-lg uppercase tracking-widest mb-3 block">Best Price</span>
                  <h3 className="text-3xl lg:text-6xl font-black text-white mb-4 tracking-tighter">수출, 폐차 견적</h3>
                  <p className="text-lg lg:text-2xl text-slate-300 font-bold">당일 최고가 시세 확인하기</p>
                </div>
                <div className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity text-white">
                  <Zap className="w-64 h-64" />
                </div>
                <div className="absolute bottom-8 right-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-[#FF9800] group-hover:text-white transition-all shadow-lg">
                  <ChevronRight className="w-8 h-8" />
                </div>
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 flex flex-col items-center text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
                전국 어디서나 24시간 상담 가능
              </span>
              <h1 className="text-4xl lg:text-5xl font-black leading-[1.2] tracking-tight mb-8">
                {content.heroTitle} <br />
                {content.heroSubtitle.includes('입니다.') ? (
                  <>
                    <span className="text-blue-600">{content.heroSubtitle.replace('입니다.', '')}</span>
                    <span className="text-slate-900">입니다.</span>
                  </>
                ) : (
                  <span className="text-blue-600">{content.heroSubtitle}</span>
                )}
              </h1>
              <div className="space-y-6 mb-12 max-w-2xl">
                {content.heroDescription.split('\n\n').map((line, i) => {
                  const [title, ...rest] = line.split(':');
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-3 group text-left"
                    >
                      <div className="mt-1 bg-blue-50 p-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 group-hover:text-white" />
                      </div>
                      <div className="text-lg lg:text-xl leading-relaxed">
                        {rest.length > 0 ? (
                          <p className="text-slate-600 font-medium">
                            <span className="text-blue-600 font-black mr-2">{title}:</span>
                            {rest.join(':')}
                          </p>
                        ) : (
                          <p className="text-slate-600 font-medium">{line}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button 
                  onClick={() => setCurrentPage('consignmentForm')}
                  className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2"
                >
                  무료 견적 신청하기 <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsChatbotOpen(true)}
                  className="bg-white border-2 border-slate-100 px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600" /> 실시간 채팅 상담
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">맞춤형 탁송 서비스</h2>
            <p className="text-slate-500 font-medium">차종과 상황에 맞는 최적의 운송 솔루션을 제공합니다.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {content.services.map((service, idx) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20">
                    {renderIcon(service.iconName)}
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col flex-grow">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <span className="text-orange-500 font-bold text-sm tracking-tight">
                    {service.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Banner */}
      <section className="bg-[#1A237E] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 h-full w-full">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-white/20 h-full" />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">프리미엄 탁송 기사님 상시 모집</h2>
              <p className="text-blue-100 text-lg opacity-80 font-medium">일류전국탁송과 함께 성장할 신뢰할 수 있는 파트너를 기다립니다.</p>
            </div>
            <button 
              onClick={() => setCurrentPage('recruitment')}
              className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-black/20 shrink-0"
            >
              기사 지원하기
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">간편한 폐차 & 탁송 프로세스</h2>
            <p className="text-slate-500 font-medium">전화 한 통으로 시작되는 빠르고 완벽한 서비스</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black mb-8 shadow-2xl transition-all ${idx === 0 ? 'bg-white border-4 border-[#FF9800] text-[#FF9800]' : 'bg-slate-50 text-slate-300 border-4 border-slate-100'}`}>
                    {step.id}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                  <p className="text-slate-500 text-[15px] leading-relaxed whitespace-pre-line font-medium">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )}

      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all group"
        aria-label="실시간 상담"
      >
        <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
          LIVE
        </span>
      </button>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 pt-20 pb-12">
        <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 lg:col-span-1">
                <div className="flex items-center gap-2 text-blue-600 mb-8">
                  <Truck className="w-7 h-7" />
                  <span className="text-xl font-black text-blue-900 tracking-tighter">일류전국탁송</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-4">
                  일류전국탁송은 신속하고 안전한 차량 탁송 및 폐차/수출 전문 기업입니다. <br />
                  고객님의 소중한 자산, 투명한 절차와 최고의 전문성으로 보답하겠습니다.
                </p>
                <p className="text-sm font-bold text-blue-600">www.일류전국탁송.kr</p>
              </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-8">서비스 안내</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                {['일반 폐차 상담', '조기 폐차 신청', '수출 상담', '전국 탁송 요금표'].map(item => (
                  <li key={item}><a href="#" className="hover:text-blue-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-8">고객센터</h4>
              <div className="space-y-4 text-sm text-slate-500 font-medium">
                <a href="tel:1668-3221" className="flex items-center gap-3 group">
                  <PhoneCall className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">1668-3221</span>
                </a>
                <p>상담시간: 09:00 - 18:00</p>
                <p>(주말 및 공휴일 휴무)</p>
                <button 
                  onClick={() => setIsChatbotOpen(true)}
                  className="text-blue-600 hover:underline font-bold"
                >
                  실시간 상담 바로가기
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-8">회사 정보</h4>
              <div className="space-y-2 text-sm text-slate-500 font-medium">
                <p>사업자등록번호: 318-18-02355</p>
                <p>대표: 김정렬 | 주소: 경기 용인시 기흥구 보정로 117 CH리베로3빌딩 601호</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-medium">© 2026 일류전국탁송 (monosolution). All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 font-medium">이용약관</a>
              <a href="#" className="text-xs text-slate-600 hover:text-slate-900 font-bold">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
