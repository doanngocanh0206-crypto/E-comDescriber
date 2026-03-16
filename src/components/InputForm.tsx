import React from 'react';
import { ProductInput } from '../types';
import { Package, ListChecks, Sparkles, Search, Languages, MessageSquare } from 'lucide-react';

interface Props {
  onSubmit: (input: ProductInput) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<ProductInput>({
    name: '',
    features: '',
    benefits: '',
    keywords: '',
    language: 'vi',
    tone: 'Thuyết phục và Chuyên nghiệp',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Package size={16} className="text-brand-600" />
          Tên sản phẩm
        </label>
        <input
          required
          type="text"
          placeholder="Ví dụ: Tai nghe Bluetooth Sony WH-1000XM5"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Languages size={16} className="text-brand-600" />
            Ngôn ngữ
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all appearance-none bg-white"
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value as 'vi' | 'en' })}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageSquare size={16} className="text-brand-600" />
            Giọng văn
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all appearance-none bg-white"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          >
            <option value="Thuyết phục và Chuyên nghiệp">Thuyết phục & Chuyên nghiệp</option>
            <option value="Sáng tạo và Hào hứng">Sáng tạo & Hào hứng</option>
            <option value="Thân thiện và Gần gũi">Thân thiện & Gần gũi</option>
            <option value="Sang trọng và Đẳng cấp">Sang trọng & Đẳng cấp</option>
            <option value="Ngắn gọn và Súc tích">Ngắn gọn & Súc tích</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <ListChecks size={16} className="text-brand-600" />
          Tính năng chính (Mỗi tính năng một dòng)
        </label>
        <textarea
          required
          rows={3}
          placeholder="Ví dụ: Chống ồn chủ động, Pin 30 giờ, Sạc nhanh 10 phút..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Sparkles size={16} className="text-brand-600" />
          Lợi ích cho khách hàng
        </label>
        <textarea
          required
          rows={3}
          placeholder="Ví dụ: Tận hưởng âm nhạc trọn vẹn, không bị làm phiền bởi tiếng ồn xung quanh..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
          value={formData.benefits}
          onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Search size={16} className="text-brand-600" />
          Từ khóa SEO (Phân cách bằng dấu phẩy)
        </label>
        <input
          type="text"
          placeholder="Ví dụ: tai nghe sony, tai nghe chống ồn, WH-1000XM5 giá rẻ"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          value={formData.keywords}
          onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
        />
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Đang tạo mô tả...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Tạo mô tả sản phẩm
          </>
        )}
      </button>
    </form>
  );
};
