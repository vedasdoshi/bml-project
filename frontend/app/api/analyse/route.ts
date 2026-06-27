import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, detail: "API key is missing from your .env.local file." },
      { status: 500 }
    );
  }

  try {
    const { fileContent } = await request.json();

    if (!fileContent || fileContent.trim() === "") {
      return NextResponse.json(
        { success: false, detail: "The uploaded file content is empty." },
        { status: 400 }
      );
    }

    const prompt = `
      Analyze this raw customer reviews dataset and extract business metrics.
      
      Reviews Dataset:
      """
      ${fileContent}
      """

      You must respond with a raw JSON object matching this exact structure. Do not include markdown formatting or backticks like \`\`\`json.

      {
        "metrics": {
          "total_reviews": number,
          "sentiment_score": "string (e.g., +0.68)",
          "total_trends": number,
          "high_priority_opportunities": number
        },
        "trending_fast": {
          "title": "string",
          "description": "string (1-2 sentences)",
          "meta_tags": "string",
          "percentage": "string"
        },
        "rising_concept": {
          "title": "string",
          "description": "string",
          "percentage": "string"
        },
        "emerging_cluster": { "title": "string", "subtitle": "string" },
        "pain_point": { "title": "string", "subtitle": "string", "percentage": "string" },
        "declining_metric": { "title": "string", "subtitle": "string" },
        "top_opportunities": [
          { "rank": 1, "title": "string", "meta": "string", "badge1": "string", "badge2": "string" },
          { "rank": 2, "title": "string", "meta": "string", "badge1": "string", "badge2": "string" },
          { "rank": 3, "title": "string", "meta": "string" }
        ],
        "ai_strategic_summary": "string (Cohesive summary paragraph)"
      }
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ success: false, detail: data.error?.message || "Gemini error" }, { status: response.status });
    }

    const rawJsonText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({
      success: true,
      report: JSON.parse(rawJsonText)
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, detail: error.message || "Failed running analysis" },
      { status: 500 }
    );
  }
}