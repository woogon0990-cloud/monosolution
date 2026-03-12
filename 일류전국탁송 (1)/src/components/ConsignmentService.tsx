import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  ShieldCheck, 
  Coins, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  UserCheck,
  Navigation,
  X,
  AlertCircle,
  FileText,
  ShieldAlert,
  Wrench,
  Info,
  Ban,
  Camera,
  Database,
  FileSearch
} from 'lucide-react';

interface ConsignmentServiceProps {
  onConsult?: () => void;
}

const ConsignmentService: React.FC<ConsignmentServiceProps> = ({ onConsult }) => {
  const [selectedDetail, setSelectedDetail] = React.useState<{
    title: string;
    icon: React.ReactNode;
    color: string;
    content: React.ReactNode;
  } | null>(null);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative py-24 bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-bold tracking-widest uppercase mb-6 border border-white/30">
              Safe & Reliable Delivery | www.일류전국탁송.kr
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              🚙 대한민국 전역을 연결하는 <br className="hidden md:block" />
              프리미엄 차량 운송 솔루션, <span className="text-blue-200">일류전국탁송</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-50 font-medium max-w-3xl mx-auto leading-relaxed">
              고객님의 소중한 자산을 안전하고 신속하게 목적지까지 전달합니다.<br />
              체계적인 물류 시스템과 전문 인력을 통해 최상의 운송 경험을 제공하겠습니다.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Rate Table Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Navigation className="w-10 h-10 text-blue-600" /> 전국 거리별 자동차 탁송 요율표
            </h2>
            <p className="text-slate-500 font-medium">합리적이고 투명한 정찰제 요금을 약속드립니다.</p>
          </div>

          <div className="bg-white rounded-[2rem] lg:rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-8 py-6 font-bold text-lg">이동 거리</th>
                    <th className="px-8 py-6 font-bold text-lg">기본 요금</th>
                    <th className="px-8 py-6 font-bold text-lg">탁송 구분</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { dist: "0 ~ 20km", price: "15,000원 ~ 20,000원", type: "시내 탁송" },
                    { dist: "20 ~ 50km", price: "20,000원 ~ 30,000원", type: "근교 탁송" },
                    { dist: "50 ~ 100km", price: "30,000원 ~ 50,000원", type: "중거리 탁송" },
                    { dist: "100 ~ 200km", price: "50,000원 ~ 80,000원", type: "장거리 탁송" },
                    { dist: "200 ~ 300km", price: "80,000원 ~ 110,000원", type: "초장거리 탁송" },
                    { dist: "300km 이상", price: "120,000원 ~ 200,000원", type: "전국 탁송" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-8 py-6 font-bold text-slate-700">{row.dist}</td>
                      <td className="px-8 py-6 font-black text-blue-600">{row.price}</td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-bold">
                          {row.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 lg:p-12 bg-slate-50 border-t border-slate-100">
              <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" /> 요금 산정 시 참고 및 할증 조건
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-sm font-bold text-blue-600 mb-2">톨게이트 비용</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    위 요율표의 금액에는 기본적으로 <span className="text-slate-900 font-bold">톨게이트 통행료가 포함</span>되어 있습니다.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-sm font-bold text-blue-600 mb-2">주유비 실비 정산</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    목적지까지의 연료는 미리 주유해 두어야 하며, 부족 시 <span className="text-slate-900 font-bold">주유 금액은 실비로 추가 정산</span>됩니다.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-sm font-bold text-blue-600 mb-2">추가 할증 (±1~2만 원)</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    야간/주말, 대형/수입차, 산간 지역 등 환경 요인에 따라 <span className="text-slate-900 font-bold">1~2만 원의 요금 변동</span>이 발생할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="mt-12 pt-12 border-t border-slate-200">
                <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2">
                  <X className="w-5 h-5 text-red-500" /> 취소 및 환불 규정
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { time: "15일 전", policy: "전액 환불", color: "text-emerald-600", bg: "bg-emerald-50" },
                    { time: "14일 ~ 7일 전", policy: "20% 공제 후 환불", color: "text-slate-600", bg: "bg-white" },
                    { time: "6일 ~ 3일 전", policy: "50% 공제 후 환불", color: "text-slate-600", bg: "bg-white" },
                    { time: "2일 ~ 1일 전", policy: "70% 공제 후 환불", color: "text-slate-600", bg: "bg-white" },
                    { time: "탁송 당일", policy: "환불 불가", color: "text-red-600", bg: "bg-red-50" },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} p-4 rounded-xl border border-slate-100 text-center`}>
                      <p className="text-xs font-bold text-slate-400 mb-1">{item.time}</p>
                      <p className={`text-sm font-black ${item.color}`}>{item.policy}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-400 text-center font-medium">
                  ※ 취소 시점은 고객센터 운영 시간(평일 09:00~18:00) 접수 기준입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Special Promises Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
              <ShieldCheck className="w-10 h-10 text-blue-600" /> 일류전국탁송만의 특별한 3가지 약속
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Promise 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <Navigation className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                  1. '로드 탁송'으로 <br />
                  <span className="text-blue-600">보상금 UP!</span>
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  차량이 굴러만 간다면 견인차 대신 탁송 기사가 직접 운전해서 이동하는 '로드 탁송' 방식을 우선으로 진행합니다. 
                  비싼 견인비를 절감하여 고객님께 <span className="text-slate-900 font-bold">더 높은 보상금</span>으로 돌려드립니다.
                </p>
              </div>
            </motion.div>

            {/* Promise 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                  2. 운행 불가 차량도 <br />
                  <span className="text-emerald-600">안심 '무료 견인'</span>
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  사고나 고장으로 굴러가지 않는 차라도 걱정하지 마세요. 
                  일류전국탁송의 전문 견인차가 출동하여 <span className="text-slate-900 font-bold">추가 비용 부담 없이 무료로</span> 안전하게 폐차장까지 이동시켜 드립니다.
                </p>
              </div>
            </motion.div>

            {/* Promise 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <Coins className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                  3. 차량 인도 전 <br />
                  <span className="text-orange-600">'보상금 선입금'</span>
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  사기 피해를 원천 차단합니다. 차량을 가져가기 전, 약속된 보상금을 <span className="text-slate-900 font-bold">먼저 고객님 계좌로 입금</span>해 드립니다. 
                  입금 확인 후 안심하고 차키만 넘겨주시면 모든 절차가 끝납니다.
                </p>
              </div>
            </motion.div>

            {/* Promise 4: Accident & Insurance (Consolidated) */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedDetail({
                title: "사고 및 보험 처리 규정",
                icon: <ShieldAlert className="w-12 h-12" />,
                color: "bg-red-600",
                content: (
                  <div className="space-y-8">
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                      <h4 className="font-black text-red-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" /> 1. 사고 발생 시 조치
                      </h4>
                      <p className="text-red-700 font-medium leading-relaxed">
                        사고 발생 시 부상자 후송 등 필수 조치 후 지체 없이 회사에 통보해 주세요. 
                        탁송 회사 역시 기사로부터 전달받은 사고 상황을 즉시 고객님께 안내해 드립니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" /> 2. 증거 및 서류 확보
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          블랙박스 영상 등 보험사가 요청하는 일체의 서류와 증거를 지체 없이 제출하고 협조해야 합니다. 
                          이는 정확한 사고 조사와 신속한 보험 접수를 위해 필수적입니다.
                        </p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5 text-purple-600" /> 3. 보험 접수 및 부담금
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          기사가 가입한 '자동차탁송종합보험'으로 처리가 진행됩니다. 
                          보험 처리에 필요한 자기부담금(면책금)은 원칙적으로 탁송 기사가 부담합니다.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-indigo-600" /> 4. 차량 수리 원칙
                      </h4>
                      <p className="text-slate-600 text-sm font-medium leading-relaxed">
                        사고 차량 수리는 기사, 회사, 고객이 다자간 협의를 거쳐 확정한 자동차 종합 정비업체에 의뢰하여 진행하게 됩니다. 
                        임의 수리 시 보험 처리가 제한될 수 있습니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                        <h4 className="font-black text-orange-900 mb-3 flex items-center gap-2">
                          <Info className="w-5 h-5" /> 5. 간접 손해 면책
                        </h4>
                        <p className="text-orange-700 text-sm font-medium leading-relaxed">
                          수리 기간 중 발생하는 렌터카 비용(대차료)이나 영업 손실 등 간접 손해는 탁송 보험 보장 범위에서 제외됩니다.
                        </p>
                      </div>
                      <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                          <Ban className="w-5 h-5" /> 6. 기타 면책 사항
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          운행 전 미고지된 내부 기계 결함, 주행 중 돌 튐(스톤칩), 타이어 파손 등 불가항력적 손상은 면책 사항에 해당합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                  4. 사고 및 보험 <br />
                  <span className="text-red-600">처리 상세 규정</span>
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  사고 발생 시 조치 방법부터 보험 접수, 수리 원칙 및 면책 사항까지 안전한 처리를 위한 상세 규정을 확인하세요.
                </p>
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
                  전체 내용 보기 <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Promise 5: Data-driven Proof System */}
            <motion.div 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedDetail({
                title: "데이터 기반 무과실 증명 시스템",
                icon: <Database className="w-12 h-12" />,
                color: "bg-emerald-600",
                content: (
                  <div className="space-y-8">
                    <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100">
                      <h4 className="text-xl font-black text-emerald-900 mb-4 flex items-center gap-3">
                        <Camera className="w-6 h-6" /> 1. 타임스탬프 정밀 촬영 (8지점)
                      </h4>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white/60 p-4 rounded-xl border border-emerald-100">
                            <p className="font-bold text-emerald-900 text-sm mb-1">정면 및 후면</p>
                            <p className="text-xs text-emerald-700 leading-relaxed">차량 수평 상태와 번호판을 명확히 확인 가능하도록 촬영</p>
                          </div>
                          <div className="bg-white/60 p-4 rounded-xl border border-emerald-100">
                            <p className="font-bold text-emerald-900 text-sm mb-1">좌·우 측면</p>
                            <p className="text-xs text-emerald-700 leading-relaxed">문콕(도어 딩) 및 길게 이어진 스크래치 유무 파악</p>
                          </div>
                          <div className="bg-white/60 p-4 rounded-xl border border-emerald-100">
                            <p className="font-bold text-emerald-900 text-sm mb-1">4개 모서리 (45도)</p>
                            <p className="text-xs text-emerald-700 leading-relaxed">사각지대 제거 핵심 각도. 범퍼 하단 및 휠 흠집 확인</p>
                          </div>
                          <div className="bg-white/60 p-4 rounded-xl border border-emerald-100">
                            <p className="font-bold text-emerald-900 text-sm mb-1">루프 및 하부</p>
                            <p className="text-xs text-emerald-700 leading-relaxed">적재 시 발생 가능한 상부 손상 및 하부 긁힘 방지</p>
                          </div>
                        </div>
                        
                        <div className="bg-emerald-600 text-white p-4 rounded-xl shadow-inner">
                          <p className="font-black text-sm mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> 정밀 촬영 시 필수 주의사항
                          </p>
                          <ul className="text-xs space-y-1.5 opacity-90 font-medium">
                            <li>• <span className="font-bold underline">취약 부위 근접 촬영:</span> 분쟁이 빈번한 휠(Wheel)과 사이드 스텝은 반드시 근접 촬영</li>
                            <li>• <span className="font-bold underline">타임스탬프 앱 필수:</span> 조작 불가한 날짜, 시간, GPS 좌표가 박제된 사진만 법적 증거 인정</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                          <FileSearch className="w-5 h-5 text-blue-600" /> 2. 표준 상태 부호 리포트
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          "조금 긁힘" 같은 주관적 서술 대신, 자동차 성능점검 표준 부호(A:흠집, U:요철, W:판금 등)를 사용하여 객관적인 차량 상태 리포트를 작성합니다.
                        </p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                          <Database className="w-5 h-5 text-purple-600" /> 3. 디지털 증거 보존
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          주유 영수증, 디지털 리포트, 메시지 내역 등을 '전자문서 및 전자거래 기본법'에 따라 체계적으로 보존하여 과실 유무를 증명하는 핵심 근거로 활용합니다.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
                      <h4 className="text-xl font-black mb-6 flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-blue-400" /> 4. 무적의 특약 활용 (면책 조항)
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                        <li className="flex gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                          <span><strong className="text-white">기계적 결함 배제:</strong> 내부 고장은 원시적 결함으로 간주</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                          <span><strong className="text-white">자연적 손상 면책:</strong> 스톤칩, 타이어 펑크 등 면책</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                          <span><strong className="text-white">간접 손해 부제소:</strong> 렌터카 비용 등 청구 제한</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                          <span><strong className="text-white">육안 확인 불가 면책:</strong> 우천/황사 시 미세 흠집 면책</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              })}
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">
                  5. 데이터 기반 <br />
                  <span className="text-emerald-600">무과실 증명 시스템</span>
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  타임스탬프 정밀 촬영과 디지털 리포트 체계를 통해 억울한 분쟁을 원천 차단하는 일류전국탁송만의 전문 시스템입니다.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  상세 체계 보기 <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-24">
          <div className="bg-slate-50 rounded-[2.5rem] lg:rounded-[4rem] p-8 lg:p-20 border border-slate-100">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
                <Clock className="w-10 h-10 text-blue-600" /> 탁송 진행 절차
              </h2>
              <p className="text-slate-500 font-medium">복잡한 준비는 일류전국탁송이 알아서 합니다. 전화 한 통이면 충분합니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector line for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -translate-y-1/2 -z-0"></div>
              
              {[
                {
                  step: "STEP 1",
                  title: "전화 신청",
                  desc: "원하시는 시간과 장소를 예약해 주세요.",
                  icon: <PhoneCall className="w-6 h-6" />,
                  color: "bg-blue-600"
                },
                {
                  step: "STEP 2",
                  title: "기사 방문",
                  desc: "전문 탁송 기사 및 견인차가 고객님 계신 곳으로 찾아갑니다.",
                  icon: <MapPin className="w-6 h-6" />,
                  color: "bg-blue-600"
                },
                {
                  step: "STEP 3",
                  title: "확인 및 입금",
                  desc: "차량 확인 후 즉시 폐차비를 입금해 드립니다.",
                  icon: <Coins className="w-6 h-6" />,
                  color: "bg-blue-600"
                },
                {
                  step: "STEP 4",
                  title: "안전 이동",
                  desc: "입금 확인 후, 기사님이 차키를 인계받아 안전하게 이동시킵니다.",
                  icon: <CheckCircle2 className="w-6 h-6" />,
                  color: "bg-blue-600"
                }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 bg-white p-8 rounded-3xl shadow-lg border border-slate-100 text-center group hover:border-blue-500 transition-colors">
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-blue-600 tracking-widest mb-2 block">{item.step}</span>
                  <h4 className="text-xl font-black text-slate-900 mb-4">{item.title}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-slate-900 rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">
              복잡한 이동 준비는 <br className="md:hidden" />
              <span className="text-blue-400">일류전국탁송</span>이 모두 알아서 하겠습니다.
            </h2>
            <p className="text-xl text-slate-400 font-medium mb-12">
              고객님은 편안하게 계신 곳에서 전화 한 통만 주시면 됩니다!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:1668-3221"
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-black text-2xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-4 animate-bounce"
              >
                <PhoneCall className="w-8 h-8" /> 1668-3221
              </a>
              <button 
                onClick={onConsult}
                className="bg-white/10 hover:bg-white/20 text-white px-12 py-6 rounded-2xl font-black text-2xl transition-all border border-white/20 flex items-center justify-center gap-4"
              >
                <UserCheck className="w-8 h-8" /> 실시간 상담하기
              </button>
            </div>
          </div>
        </section>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedDetail && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedDetail(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                <div className="p-8 sm:p-12 overflow-y-auto">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-6">
                      <div className={`${selectedDetail.color} w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl`}>
                        {selectedDetail.icon}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-black text-slate-900">{selectedDetail.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedDetail(null)}
                      className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-6 h-6 text-slate-500" />
                    </button>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    {selectedDetail.content}
                  </div>
                </div>
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedDetail(null)}
                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                  >
                    확인했습니다
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConsignmentService;
