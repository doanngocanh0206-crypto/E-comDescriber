import { GoogleGenAI } from "@google/genai";
import { ProductInput, ProductDescription } from "../types";

export async function generateProductDescriptions(input: ProductInput, count: number = 3): Promise<ProductDescription[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("API Key chưa được cấu hình. Vui lòng kiểm tra lại cài đặt Secrets.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-flash-latest";
  
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
    
    Lưu ý: Chỉ trả về JSON hợp lệ. Không bao gồm markdown backticks (\`\`\`json) hay bất kỳ văn bản nào khác ngoài JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    let text = response.text;
    if (!text) {
      console.error("Empty response from Gemini");
      throw new Error("Không nhận được phản hồi từ AI. Vui lòng thử lại.");
    }
    
    // Clean potential markdown formatting
    text = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error. Raw text:", text);
      throw new Error("Dữ liệu trả về từ AI không đúng định dạng JSON. Vui lòng thử lại.");
    }
  } catch (error: any) {
    console.error("Error generating descriptions:", error);
    
    if (error?.message?.includes("API key not valid")) {
      throw new Error("API Key không hợp lệ. Vui lòng kiểm tra lại trong phần Settings.");
    }
    
    if (error?.message?.includes("quota")) {
      throw new Error("Đã hết hạn mức sử dụng AI (Quota exceeded). Vui lòng thử lại sau.");
    }

    throw new Error(error?.message || "Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại.");
  }
}
