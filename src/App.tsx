import React from 'react';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { ProductInput, ProductDescription } from './types';
import { generateProductDescriptions } from './services/gemini';
import { ShoppingBag, Zap, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<ProductDescription[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerate = async (input: ProductInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateProductDescriptions(input);
      setResults(data);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo mô tả. Vui lòng thử lại sau.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <header className="bg-white border-bottom border-slate-200 pt-16 pb-20 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
              <ShoppingBag className="text-white" size={32} />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Tạo Mô Tả Sản Phẩm <br />
            <span className="text-brand-600">Chuyên Nghiệp & Chuẩn SEO</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Biến những tính năng khô khan thành những lời chào hàng hấp dẫn. 
            Tăng tỷ lệ chuyển đổi và thứ hạng tìm kiếm chỉ trong vài giây với sức mạnh của AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Zap size={16} className="text-brand-600" />
              Tốc độ tức thì
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <ShieldCheck size={16} className="text-brand-600" />
              Chuẩn SEO E-commerce
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Globe size={16} className="text-brand-600" />
              Đa ngôn ngữ
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 gap-12">
          <section>
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
          </section>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <section id="results" className="scroll-mt-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Kết quả gợi ý</h2>
                <p className="text-slate-500">Chúng tôi đã tạo ra {results.length} phiên bản khác nhau dành cho bạn.</p>
              </div>
              <ResultDisplay descriptions={results} />
            </section>
          )}
        </div>
      </main>

      <footer className="mt-20 py-10 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-400">
          &copy; 2026 E-comDescriber. Powered by Google Gemini AI.
        </p>
      </footer>
    </div>
  );
}
