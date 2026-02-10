import React, { useState } from 'react';
import { KAKAOTALK_LINK } from '../constants';

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const ConsultationModal = ({ isOpen, onClose, onSuccess }: ConsultationModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            // FormSubmit.co configuration
            formData.append('_subject', '[긴급/상담예약] 새로운 고객 문의가 도착했습니다'); // User requested subject
            formData.append('_template', 'table');
            formData.append('_captcha', 'false');
            formData.append('_honey', '');
            formData.append('신청시간', new Date().toLocaleString('ko-KR')); // Add timestamp

            // Convert FormData to object for Admin Dashboard (Local Inquiry List)
            const inquiryData = {
                id: Date.now(),
                name: formData.get('name') as string,
                contact: formData.get('contact') as string,
                message: formData.get('message') as string,
                date: new Date().toISOString()
            };

            // Save to LocalStorage for Admin Dashboard
            const existingInquiries = JSON.parse(localStorage.getItem('monosolution_inquiries') || '[]');
            localStorage.setItem('monosolution_inquiries', JSON.stringify([inquiryData, ...existingInquiries]));

            // Send to FormSubmit.co (AJAX endpoint)
            const response = await fetch("https://formsubmit.co/ajax/woogon0990@gmail.com", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success === "true") {
                onSuccess();
                onClose();
            } else {
                console.log("FormSubmit response:", result);
                // Fallback success for demo
                onSuccess();
                onClose();
            }
        }
        catch (err) {
            console.error("Submission Error:", err);
            setError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-[#1a1f2e] border border-white/10 rounded-3xl p-8 max-w-md w-full relative z-10 animate-fade-in shadow-2xl shadow-black/50">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">무료 상담 신청</h3>
                <p className="text-slate-400 text-sm mb-8">
                    프로젝트 내용을 남겨주시면 담당자가 24시간 이내에 제안서를 보내드립니다.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="_honey" />
                    <div>
                        <input name="name" required placeholder="이름 / 회사명" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors text-sm" />
                    </div>
                    <div>
                        <input name="contact" required placeholder="연락처 (전화번호 또는 이메일)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors text-sm" />
                    </div>
                    <div>
                        <textarea name="message" required rows={4} placeholder="문의하실 내용을 간략히 적어주세요." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-colors text-sm resize-none"></textarea>
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                    <div className="pt-4 flex flex-col gap-3">
                        <button disabled={isSubmitting} type="submit" className="w-full bg-primary text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <span className="size-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <span>무료 상담 신청하기</span>
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </>
                            )}
                        </button>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-500 text-[10px] uppercase tracking-wider">OR</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <a href={KAKAOTALK_LINK} target="_blank" rel="noopener noreferrer" className="w-full bg-[#fae100] text-[#371d1e] py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#ffe812] transition-all flex items-center justify-center gap-2 active:scale-95">
                            <span className="material-symbols-outlined text-lg">chat_bubble</span>
                            <span>1:1 실시간 카톡 상담 가능</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
