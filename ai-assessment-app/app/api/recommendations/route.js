import { NextResponse } from "next/server";

/**
 * POST /api/recommendations
 * 
 * Server-side function that calls an LLM to generate personalized recommendations.
 * Supports:
 *  - Groq (https://console.groq.com) via GROQ_API_KEY (gsk_...) - Lightning fast & free tier
 *  - Grok AI (xAI) via GROK_API_KEY or XAI_API_KEY (xai-...)
 *  - OpenAI via OPENAI_API_KEY
 * 
 * Only dimension scores and proficiency levels are sent — never names, emails, or PII.
 * Falls back to research-grounded rule-based recommendations on error or if no key is configured.
 */
export async function POST(request) {
  // Support both GROQ_API_KEY and GROK_API_KEY
  const groqOrGrokKey =
    process.env.GROQ_API_KEY ||
    process.env.GROK_API_KEY ||
    process.env.XAI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!groqOrGrokKey && !openaiApiKey) {
    return NextResponse.json({ fallback: true, reason: "No API key configured" });
  }

  // Detect provider:
  // If key starts with "gsk_" or GROQ_API_KEY is defined -> Groq (api.groq.com)
  // If key starts with "xai-" or XAI_API_KEY is defined -> xAI Grok (api.x.ai)
  // Otherwise OpenAI
  let endpoint = "";
  let apiKey = "";
  let model = "";
  let providerName = "";

  if (groqOrGrokKey) {
    apiKey = groqOrGrokKey;
    if (apiKey.startsWith("gsk_") || process.env.GROQ_API_KEY) {
      providerName = "Groq AI";
      endpoint = "https://api.groq.com/openai/v1/chat/completions";
      model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
    } else {
      providerName = "Grok AI";
      endpoint = "https://api.x.ai/v1/chat/completions";
      model = process.env.GROK_MODEL || "grok-2-latest";
    }
  } else {
    apiKey = openaiApiKey;
    providerName = "OpenAI";
    endpoint = "https://api.openai.com/v1/chat/completions";
    model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  }

  try {
    const body = await request.json();
    const { totalScore, level, dimensionLevels, dimensionScores } = body;

    // Build prompt with zero PII
    const prompt = `You are an expert in workplace AI adoption and organizational training. Based on the following AI adoption assessment results, provide 3-5 specific, actionable, prioritized recommendations for improving AI effectiveness at work.

Assessment Results:
- Total Score: ${totalScore}/100
- Level: ${level}
- Dimension Breakdown:
${Object.entries(dimensionScores || {})
  .map(
    ([key, dim]) =>
      `  - ${dim.label}: ${dim.percentage}% (${dimensionLevels?.[key] || "moderate"} proficiency)`
  )
  .join("\n")}

Requirements:
1. Prioritize the weakest dimensions first.
2. Be specific and actionable — concrete practical steps to take this week.
3. Each recommendation must have a clear title and a 2-3 sentence description.
4. Ground advice in evidence (e.g. concepts like Jagged Frontier, verification habits, systematic prompting, workflow redesign).
5. Format strictly as a valid JSON array of objects with keys:
   - "title" (string)
   - "description" (string)
   - "dimension" (string)
   - "priority" (number: 1, 2, 3, etc.)

Return ONLY the raw JSON array. Do not include markdown code block backticks or introductory text.`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are an AI adoption expert providing evidence-based workplace recommendations. Always output a valid JSON array.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`${providerName} API error (${response.status}):`, errText);
      return NextResponse.json({
        fallback: true,
        reason: `${providerName} API returned status ${response.status}`,
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ fallback: true, reason: "Empty response from LLM" });
    }

    // Clean markdown code blocks if present
    const cleaned = content.replace(/```(?:json)?\n?/gi, "").replace(/```\n?/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Fallback: extract substring between first '[' and last ']'
      const startIdx = cleaned.indexOf("[");
      const endIdx = cleaned.lastIndexOf("]");
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        parsed = JSON.parse(cleaned.substring(startIdx, endIdx + 1));
      } else {
        throw new Error("Unable to parse JSON recommendations array");
      }
    }

    let rawList = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.recommendations)
      ? parsed.recommendations
      : [];

    if (rawList.length === 0) {
      return NextResponse.json({ fallback: true, reason: "No recommendations in response" });
    }

    // Normalize recommendations and ensure priority is a number
    const recommendations = rawList.slice(0, 5).map((rec, idx) => ({
      title: rec.title || "Targeted AI Improvement",
      description: rec.description || "",
      dimension: rec.dimension || "General",
      priority: typeof rec.priority === "number" ? rec.priority : idx + 1,
    }));

    return NextResponse.json({
      fallback: false,
      aiGenerated: true,
      provider: providerName,
      recommendations,
    });
  } catch (error) {
    console.error("Recommendations API error:", error);
    return NextResponse.json({
      fallback: true,
      reason: error?.message || "Server error generating recommendations",
    });
  }
}
