'use client'

import { useState } from 'react'
import { 
  User, Lock, Camera, Shield, 
  CheckCircle, Pyramid, Globe,
  MapPin, Users, MessageSquare,
  Image as ImageIcon, Video, Poll
} from 'lucide-react'

export default function HomePage() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationStep, setRegistrationStep] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pharaoh-blue to-egy-black text-egy-white">
      {/* شريط التنقل */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-egy-red to-egy-gold rounded-lg">
              <Pyramid size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="text-egy-red">𓂀</span> EgyBook <span className="text-egy-gold">𓂀</span>
              </h1>
              <p className="text-sm text-egy-white/70">مجتمعك المصري، بصوتك</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowRegistration(true)}
              className="px-6 py-2 bg-gradient-to-r from-egy-red to-egy-gold rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              انضم إلينا
            </button>
            <button className="px-6 py-2 border border-egy-gold/50 rounded-lg font-semibold hover:bg-egy-gold/10 transition-colors">
              تسجيل الدخول
            </button>
          </div>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-egy-red/20 to-egy-gold/20 rounded-full mb-8 border-4 border-egy-gold/30">
            <Pyramid size={48} className="text-egy-gold" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-egy-red">مرحباً</span> بك في{' '}
            <span className="bg-gradient-to-r from-egy-red to-egy-gold bg-clip-text text-transparent">
              EgyBook
            </span>
          </h1>
          <p className="text-xl text-egy-white/80 max-w-3xl mx-auto mb-10">
            أول منصة تواصل اجتماعي مصرية 100%، بنظام هوية مصري محترم، حيث كل شخص مسؤول عن كلماته
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="bg-pharaoh-blue/50 p-6 rounded-xl border border-egy-gold/30 max-w-xs">
              <div className="inline-flex p-3 bg-egy-red/20 rounded-lg mb-4">
                <Shield className="text-egy-red" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">هوية مصرية</h3>
              <p className="text-egy-white/70">تسجيل بالبطاقة/الهوية، حساب واحد للفرد</p>
            </div>
            
            <div className="bg-pharaoh-blue/50 p-6 rounded-xl border border-egy-gold/30 max-w-xs">
              <div className="inline-flex p-3 bg-egy-gold/20 rounded-lg mb-4">
                <Globe className="text-egy-gold" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">27 محافظة</h3>
              <p className="text-egy-white/70">تواصل محلي في محافظتك، وانشر في كل مصر</p>
            </div>
            
            <div className="bg-pharaoh-blue/50 p-6 rounded-xl border border-egy-gold/30 max-w-xs">
              <div className="inline-flex p-3 bg-nile-green/20 rounded-lg mb-4">
                <CheckCircle className="text-nile-green" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">مسؤولية قانونية</h3>
              <p className="text-egy-white/70">كل كلمة مسؤول عنها، بيئة محترمة وآمنة</p>
            </div>
          </div>
        </div>

        {/* خريطة المحافظات المصغرة */}
        <div className="bg-pharaoh-blue/30 rounded-2xl p-8 border border-egy-gold/20 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-egy-gold">🗺️</span> اكتشف محافظات مصر
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {[
              'القاهرة', 'الإسكندرية', 'الجيزة', 'أسوان', 
              'الأقصر', 'المنيا', 'سوهاج', 'قنا',
              'أسيوط', 'بني سويف', 'الفيوم', 'دمياط',
              'الدقهلية', 'البحيرة', 'كفر الشيخ', 'الغربية',
              'الشرقية', 'بورسعيد', 'السويس', 'الإسماعيلية',
              'شمال سيناء', 'جنوب سيناء', 'البحر الأحمر', 'الوادي الجديد',
              'مطروح', 'القليوبية', 'المنوفية'
            ].slice(0, 14).map((province, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-pharaoh-blue/50 to-egy-black/50 p-4 rounded-lg border border-egy-gold/20 text-center hover:border-egy-red transition-colors cursor-pointer"
              >
                <MapPin className="inline-block mb-2 text-egy-gold" size={20} />
                <p className="font-medium">{province}</p>
              </div>
            ))}
          </div>
        </div>

        {/* نموذج تسجيل الهوية (يظهر عند الضغط على انضم إلينا) */}
        {showRegistration && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-b from-pharaoh-blue to-egy-black rounded-2xl p-8 max-w-2xl w-full border-2 border-egy-gold/30 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  <span className="text-egy-red">𓁢</span> التسجيل في EgyBook
                </h2>
                <button 
                  onClick={() => setShowRegistration(false)}
                  className="text-egy-white/70 hover:text-egy-white"
                >
                  ✕
                </button>
              </div>

              {registrationStep === 1 && (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-egy-red rounded-full flex items-center justify-center text-white">1</div>
                      <h3 className="text-xl font-bold">البيانات الأساسية</h3>
                    </div>
                    <p className="text-egy-white/70 mb-6">
                      أدخل بياناتك كما في البطاقة الشخصية
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الرقم القومي (14 رقم)
                      </label>
                      <input
                        type="text"
                        className="w-full bg-pharaoh-blue/50 border border-egy-gold/30 rounded-lg px-4 py-3 focus:border-egy-red focus:outline-none"
                        placeholder="29905280101234"
                        maxLength={14}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الاسم بالكامل (كما في البطاقة)
                      </label>
                      <input
                        type="text"
                        className="w-full bg-pharaoh-blue/50 border border-egy-gold/30 rounded-lg px-4 py-3 focus:border-egy-red focus:outline-none"
                        placeholder="أحمد محمد علي"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          تاريخ الميلاد
                        </label>
                        <input
                          type="date"
                          className="w-full bg-pharaoh-blue/50 border border-egy-gold/30 rounded-lg px-4 py-3 focus:border-egy-red focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          المحافظة
                        </label>
                        <select className="w-full bg-pharaoh-blue/50 border border-egy-gold/30 rounded-lg px-4 py-3 focus:border-egy-red focus:outline-none">
                          <option value="">اختر محافظتك</option>
                          <option value="cairo">القاهرة</option>
                          <option value="alexandria">الإسكندرية</option>
                          <option value="giza">الجيزة</option>
                          <option value="aswan">أسوان</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        className="w-full bg-pharaoh-blue/50 border border-egy-gold/30 rounded-lg px-4 py-3 focus:border-egy-red focus:outline-none"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        كلمة المرور
                      </label>
                      <input
                        type="password"
                        className="w-full bg-pharaoh-blue/50 border border-egy-gold/30 rounded-lg px-4 py-3 focus:border-egy-red focus:outline-none"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={() => setRegistrationStep(2)}
                        className="w-full bg-gradient-to-r from-egy-red to-egy-gold text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                      >
                        التالي: رفع صور الهوية
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {registrationStep === 2 && (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-egy-gold rounded-full flex items-center justify-center text-white">2</div>
                      <h3 className="text-xl font-bold">رفع صور الهوية</h3>
                    </div>
                    <p className="text-egy-white/70 mb-6">
                      يرجى رفع صور واضحة للبطاقة الشخصية
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="border-2 border-dashed border-egy-gold/50 rounded-xl p-6 text-center hover:border-egy-red transition-colors cursor-pointer">
                      <Camera className="mx-auto mb-3 text-egy-gold" size={32} />
                      <p className="font-medium">وجه البطاقة</p>
                      <p className="text-sm text-egy-white/50 mt-1">واضح ومقروء</p>
                    </div>
                    <div className="border-2 border-dashed border-egy-gold/50 rounded-xl p-6 text-center hover:border-egy-red transition-colors cursor-pointer">
                      <Camera className="mx-auto mb-3 text-egy-gold" size={32} />
                      <p className="font-medium">ظهر البطاقة</p>
                      <p className="text-sm text-egy-white/50 mt-1">واضح ومقروء</p>
                    </div>
                    <div className="border-2 border-dashed border-egy-gold/50 rounded-xl p-6 text-center hover:border-egy-red transition-colors cursor-pointer">
                      <User className="mx-auto mb-3 text-egy-gold" size={32} />
                      <p className="font-medium">صورة شخصية</p>
                      <p className="text-sm text-egy-white/50 mt-1">مع البطاقة</p>
                    </div>
                  </div>

                  <div className="bg-pharaoh-blue/30 rounded-xl p-6 mb-6 border border-egy-gold/20">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Shield size={18} /> الموافقة القانونية
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-sm">
                          أوافق على أن أتحمل المسؤولية القانونية الكاملة عن جميع منشوراتي وتفاعلاتي على المنصة
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-sm">
                          أوافق على أن يكون لي حساب واحد فقط مرتبط بهويتي الشخصية
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1" />
                        <span className="text-sm">
                          أوافق على أن يتم التحقق من هويتي بالتعاون مع الجهات المصرية المختصة عند الضرورة
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRegistrationStep(1)}
                      className="flex-1 border border-egy-gold/50 text-egy-gold py-3 px-4 rounded-lg font-semibold hover:bg-egy-gold/10 transition-colors"
                    >
                      السابق
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRegistration(false);
                        setRegistrationStep(1);
                        alert('تم استلام بياناتك، جاري التحقق');
                      }}
                      className="flex-1 bg-gradient-to-r from-egy-red to-egy-gold text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      إكمال التسجيل
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* تذييل الصفحة */}
      <footer className="border-t border-egy-gold/20 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-egy-red to-egy-gold rounded-lg">
                  <Pyramid size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">EgyBook</h2>
                  <p className="text-sm text-egy-white/70">مجتمعك المصري، بصوتك</p>
                </div>
              </div>
              <p className="text-egy-white/50 text-sm max-w-md">
                أول منصة تواصل اجتماعي مصرية 100%، بنظام هوية مصري محترم، حيث كل شخص مسؤول عن كلماته
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-egy-white/70 mb-2">© 2024 EgyBook - جميع الحقوق محفوظة</p>
              <p className="text-egy-white/50 text-sm">مصر لكل المصريين</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}