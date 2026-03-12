import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  Key,
  Fuel,
  ShieldAlert,
  Zap,
  User, 
  Phone, 
  MapPin, 
  MessageSquare, 
  ChevronRight, 
  PhoneCall, 
  CheckCircle2,
  ArrowLeft,
  Truck,
  Navigation
} from 'lucide-react';

interface ConsignmentFormProps {
  onBack: () => void;
}

const ConsignmentForm: React.FC<ConsignmentFormProps> = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    carModel: '',
    drivable: '유',
    keyCount: '',
    fuelType: '',
    valuables: '',
    condition: '',
    startAddress: '',
    startPhone: '',
    endAddress: '',
    endPhone: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl p-10 lg:p-16 text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">탁송 상담 접수 완료!</h2>
          <p className="text-slate-500 text-lg font-medium mb-12">
            담당 전문가가 내용을 확인 후 신속하게 연락드리겠습니다.<br />
            급하신 용무는 아래 버튼을 눌러 바로 전화주세요.
          </p>

          <div className="space-y-6">
            <a 
              href="tel:1668-3221"
              className="flex items-center justify-center gap-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-2xl transition-all shadow-xl shadow-blue-600/30 animate-bounce"
            >
              <PhoneCall className="w-8 h-8" /> 지금 바로 전화하기
            </a>
            
            <button 
              onClick={onBack}
              className="text-slate-400 font-bold hover:text-slate-600 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-5 h-5" /> 메인으로 돌아가기
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          돌아가기
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-blue-600 p-10 lg:p-12 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Truck className="w-10 h-10" />
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight">탁송 상담 신청</h1>
            </div>
            <p className="text-blue-100 font-medium opacity-80">
              정확한 정보를 입력해 주시면 더욱 빠른 견적 안내가 가능합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-10">
            {/* Section 1: Client Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-black text-slate-900">의뢰인 정보</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">성함</label>
                  <input 
                    required
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">연락처</label>
                  <input 
                    required
                    type="tel"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section: Vehicle Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <Car className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-black text-slate-900">차량 정보</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">차종</label>
                  <input 
                    required
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    placeholder="예: 그랜저, 아반떼"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">현주행가능 여부</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['유', '무'].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, drivable: option }))}
                        className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                          formData.drivable === option 
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-600' 
                            : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">차키 수</label>
                  <input 
                    required
                    type="text"
                    name="keyCount"
                    value={formData.keyCount}
                    onChange={handleChange}
                    placeholder="예: 1개, 2개"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">유종</label>
                  <input 
                    required
                    type="text"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    placeholder="휘발유, 경유, 전기차 등"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">차내 귀중품</label>
                  <input 
                    type="text"
                    name="valuables"
                    value={formData.valuables}
                    onChange={handleChange}
                    placeholder="없음 (있을 경우 기재)"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">외관 컨디션 (사고 유/무)</label>
                  <input 
                    required
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    placeholder="예: 무사고, 조수석 도어 찌그러짐 등"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Departure Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-black text-slate-900">출발지 정보</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">출발지 주소</label>
                  <input 
                    required
                    type="text"
                    name="startAddress"
                    value={formData.startAddress}
                    onChange={handleChange}
                    placeholder="상세 주소를 입력해 주세요"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">현장 연락처</label>
                  <input 
                    required
                    type="tel"
                    name="startPhone"
                    value={formData.startPhone}
                    onChange={handleChange}
                    placeholder="출발지 담당자 연락처"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Destination Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <Navigation className="w-5 h-5 text-rose-600" />
                <h2 className="text-xl font-black text-slate-900">도착지 정보</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">도착지 주소</label>
                  <input 
                    required
                    type="text"
                    name="endAddress"
                    value={formData.endAddress}
                    onChange={handleChange}
                    placeholder="상세 주소를 입력해 주세요"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">현장 연락처</label>
                  <input 
                    required
                    type="tel"
                    name="endPhone"
                    value={formData.endPhone}
                    onChange={handleChange}
                    placeholder="도착지 담당자 연락처"
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-rose-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Notes */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <h2 className="text-xl font-black text-slate-900">기타 전달사항</h2>
              </div>
              <div className="space-y-2">
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="차량 종류, 희망 시간 등 추가 요청사항을 적어주세요"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-slate-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-medium resize-none"
                />
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
              >
                상담 접수하기 <ChevronRight className="w-6 h-6" />
              </button>
              <p className="text-center text-slate-400 text-sm mt-6 font-medium">
                접수 즉시 담당자가 확인하여 연락드립니다.
              </p>
            </div>
          </form>
        </div>

        {/* Quick Call Banner */}
        <div className="mt-12 bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black mb-2">상담이 급하신가요?</h3>
            <p className="text-slate-400 font-medium tracking-tight">전화 한 통으로 즉시 배차 및 견적 확인이 가능합니다.</p>
          </div>
          <a 
            href="tel:1668-3221"
            className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center gap-3 shadow-xl shadow-orange-500/20"
          >
            <PhoneCall className="w-6 h-6" /> 1668-3221
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConsignmentForm;
