
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends code to the Gemini API for review.
 * @param code The code to be reviewed.
 * @param language The programming language of the code.
 * @returns A streaming response from the API.
 */
export async function reviewCode(code: string, language: string) {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
You are an expert senior software engineer and an automated code review assistant.
Your task is to provide a comprehensive, clear, and constructive review of the following code written in ${language}.

Analyze the code for the following aspects:
1.  **Bugs and Errors:** Identify any potential bugs, logical errors, or edge cases that are not handled correctly.
2.  **Performance:** Suggest optimizations for performance bottlenecks, inefficient algorithms, or excessive resource usage.
3.  **Best Practices & Readability:** Check for adherence to language-specific best practices, conventions, and code style. Comment on code clarity, naming conventions, and overall structure.
4.  **Security:** Point out any potential security vulnerabilities (e.g., SQL injection, XSS, insecure configurations).
5.  **Maintainability & Scalability:** Assess how easy the code is to understand, modify, and extend. Suggest improvements for better modularity, simplification, and scalability.

Provide your feedback in a structured markdown format. Use headings for each category, bullet points for individual observations, and code blocks for suggested improvements or examples. Start the review with a brief, high-level summary.

Here is the code to review:
\`\`\`${language}
${code}
\`\`\`
`;

  try {
    const stream = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
    });
    return stream;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini API. Check your API key and network connection.");
  }
}
