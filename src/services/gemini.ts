import { GoogleGenAI } from "@google/genai";
import { ProductInput, ProductDescription } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateProductDescriptions(input: ProductInput, count: number = 3): Promise<ProductDescription[]> {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `
    Bạn là một chuyên gia Copywriter E-commerce và chuyên gia SEO.
    Nhiệm vụ của bạn là tạo ra ${count} phiên bản mô tả sản phẩm khác nhau dựa trên thông tin sau:
    
    Tên sản phẩm: ${input.name}
    Tính năng chính: ${input.features}
    Lợi ích cho khách hàng: ${input.benefits}
    Từ khóa SEO: ${input.keywords}
    Ngôn ngữ: ${input.language === 'vi' ? 'Tiếng Việt' : 'English'}
    Giọng văn: ${input.tone}

    Yêu cầu cho mỗi phiên bản:
    1. Tiêu đề hấp dẫn (H1).
    2. Một đoạn giới thiệu ngắn gọn, thu hút.
    3. Danh sách các tính năng chính (dùng gạch đầu dòng).
    4. Một đoạn văn bản chi tiết về lợi ích mà khách hàng nhận được.
    5. Tích hợp các từ khóa SEO một cách tự nhiên.
    6. Lời kêu gọi hành động (CTA) mạnh mẽ ở cuối.

    Định dạng đầu ra: Trả về một mảng JSON chứa các đối tượng có cấu trúc:
    [
      {
        "id": "1",
        "title": "Tên phiên bản (ví dụ: Chuyên nghiệp, Sáng tạo, Thuyết phục)",
        "content": "Nội dung mô tả sản phẩm dưới dạng Markdown",
        "html": "Nội dung mô tả sản phẩm dưới dạng HTML đơn giản (chỉ dùng h1, h2, p, ul, li, strong)"
      },
      ...
    ]
    
    Lưu ý: Chỉ trả về JSON, không kèm theo văn bản giải thích nào khác.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("Không nhận được phản hồi từ AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating descriptions:", error);
    throw error;
  }
}
