/**
 * Fallback recommendations based on dimension scores.
 * Used when the LLM API call fails or no API key is configured.
 * All recommendations are grounded in Phase 1 research evidence.
 */

const dimensionRecommendations = {
  understanding: {
    low: {
      title: "Build Your AI Foundations",
      description:
        "Start by understanding what AI tools can and cannot do. Spend 30 minutes exploring a tool like ChatGPT or Claude with simple tasks — ask it to summarize an article, draft an email, or explain a concept. Pay attention to where it does well and where it struggles. Research shows that understanding AI's 'jagged frontier' (where it's strong vs. weak) is the single biggest factor separating effective AI users from average ones.",
      source: "Based on: Harvard/BCG 'Jagged Frontier' study (Dell'Acqua et al., 2023)",
    },
    medium: {
      title: "Deepen Your Understanding of AI Limitations",
      description:
        "You have a good foundation. Now focus on learning about specific failure modes: hallucinations (confident but wrong answers), bias in outputs, and data cutoff limitations. Try deliberately testing an AI tool on something you know well — this builds your intuition for when to trust it and when to verify.",
      source: "Based on: OECD/EC AILit Framework (2026); Microsoft WTI 2026",
    },
    high: {
      title: "Share Your Knowledge",
      description:
        "You have strong AI understanding. Consider helping colleagues build their AI literacy — research shows peer-led learning is one of the most effective ways to scale AI adoption across teams. Offer to run a 15-minute 'AI myths and realities' session for your team.",
      source: "Based on: BCG AI at Work 2026; training effectiveness research",
    },
  },
  application: {
    low: {
      title: "Start with One High-Value Task",
      description:
        "Don't try to use AI for everything at once. Pick one task you do frequently — like drafting status updates, summarising meeting notes, or researching a topic — and practice using AI for it over the next two weeks. Focus on learning to iterate: give feedback to the AI and refine the output rather than accepting the first response.",
      source: "Based on: Anthropic Economic Index usage patterns (2026)",
    },
    medium: {
      title: "Expand Your AI Toolkit",
      description:
        "You're using AI for some tasks. Now try applying it to a different type of work — if you mostly use it for writing, try data analysis or brainstorming. Practice the technique of breaking complex tasks into smaller steps and using AI for each step, rather than asking for everything in one prompt.",
      source: "Based on: Microsoft 'Frontier Professional' behaviours (2026)",
    },
    high: {
      title: "Optimise Your Prompting Approach",
      description:
        "You're a regular AI user. Focus on building repeatable prompt templates for your most common tasks — this creates consistency and saves time. Consider trying different AI models for different tasks, as each has different strengths.",
      source: "Based on: High-performer behaviour research (2025-2026)",
    },
  },
  quality: {
    low: {
      title: "Develop a Verification Habit",
      description:
        "The most important skill in AI use is checking the output. Start with a simple rule: never use an AI-generated fact, statistic, or name without verifying it from the original source. AI tools can 'hallucinate' — generating confident but incorrect information. This one habit will dramatically improve your AI effectiveness.",
      source: "Based on: Harvard/BCG study — AI users 19pp more likely to err when they don't verify; Microsoft WTI 2026 — quality control is the #1 valued human skill",
    },
    medium: {
      title: "Structure Your Review Process",
      description:
        "You review some AI output. Now build a systematic approach: (1) check all factual claims, (2) assess whether the logic makes sense, (3) verify that the tone and framing are appropriate for your audience, (4) add your own expertise and judgement. Research shows this 'human-in-the-loop' approach produces the best outcomes.",
      source: "Based on: BCG 2026 'Joy Paradox' — cognitive load management",
    },
    high: {
      title: "Teach Verification Skills",
      description:
        "You have strong critical evaluation skills. Help others develop them. Create a simple checklist for your team on 'how to review AI output' — covering factual accuracy, logical reasoning, tone, and audience fit. Share examples of AI mistakes you've caught.",
      source: "Based on: Peer-led learning effectiveness research",
    },
  },
  workflow: {
    low: {
      title: "Map AI Into One Workflow",
      description:
        "Choose one process you repeat regularly (weekly reporting, client prep, project planning) and identify where AI could help at each step. Don't automate everything — identify which steps benefit from AI assistance and which need purely human judgement. Start small and build gradually.",
      source: "Based on: Microsoft 'Frontier Firm' concept (2025); BCG strategic clarity findings",
    },
    medium: {
      title: "Build Repeatable AI Workflows",
      description:
        "You've started integrating AI. Now make it systematic: create templates, document your prompts, and build step-by-step processes that you and your team can reuse. The difference between occasional use and workflow integration is the biggest productivity multiplier in the research.",
      source: "Based on: Microsoft WTI 2026 — Frontier Professionals redesign workflows",
    },
    high: {
      title: "Redesign for AI-Augmented Impact",
      description:
        "You're already integrating AI strategically. Consider: what work could you now attempt that was previously impossible? 80% of Frontier Professionals report producing work they couldn't have done before. Look for opportunities to take on more ambitious projects using AI as a thinking partner.",
      source: "Based on: Microsoft WTI 2026 — 80% of Frontier Professionals report enabling new work",
    },
  },
  ethics: {
    low: {
      title: "Learn Your Organisation's AI Policies",
      description:
        "Start by finding out whether your organisation has guidelines on AI use — what data can be shared, which tools are approved, and what needs human review. If no policy exists, follow a simple rule: never share personally identifiable information, confidential data, or client details with external AI tools. The EU AI Act now requires organisations to support AI literacy.",
      source: "Based on: EU AI Act Article 4 (2024); Gallup data on 'shadow AI' risks",
    },
    medium: {
      title: "Build Data Awareness Into Your AI Habits",
      description:
        "You're aware of policies. Now make responsible use automatic: before every AI interaction with work data, ask yourself 'Is this data safe to share externally?' Consider anonymising or aggregating data before using AI tools. Help colleagues understand why this matters.",
      source: "Based on: UNESCO AI Competency Framework (2024) — ethics dimension",
    },
    high: {
      title: "Champion Responsible AI Practice",
      description:
        "You have strong ethical awareness. Consider contributing to your organisation's AI guidelines if they need updating. Lead by example: when you use AI, be transparent about it, and share your approach to data protection with your team.",
      source: "Based on: OECD/EC AILit 'Shape AI' domain; DigComp 3.0",
    },
  },
};

/**
 * Generate fallback recommendations based on dimension scores.
 * Returns 3-5 prioritized recommendations, targeting the weakest dimensions first.
 */
export function getFallbackRecommendations(dimensionScores) {
  // Sort dimensions by percentage (ascending) to prioritize weakest
  const sorted = Object.entries(dimensionScores)
    .map(([key, dim]) => ({ key, ...dim }))
    .sort((a, b) => a.percentage - b.percentage);

  const recommendations = [];

  for (const dim of sorted) {
    if (recommendations.length >= 5) break;

    const level = dim.percentage <= 33 ? "low" : dim.percentage <= 66 ? "medium" : "high";
    const rec = dimensionRecommendations[dim.key]?.[level];

    if (rec) {
      recommendations.push({
        dimension: dim.label,
        ...rec,
        priority: recommendations.length + 1,
      });
    }
  }

  // Ensure at least 3 recommendations
  if (recommendations.length < 3) {
    for (const dim of sorted) {
      if (recommendations.length >= 3) break;
      if (!recommendations.find((r) => r.dimension === dim.label)) {
        const level = dim.percentage <= 33 ? "low" : dim.percentage <= 66 ? "medium" : "high";
        const rec = dimensionRecommendations[dim.key]?.[level];
        if (rec) {
          recommendations.push({
            dimension: dim.label,
            ...rec,
            priority: recommendations.length + 1,
          });
        }
      }
    }
  }

  return recommendations;
}

export default dimensionRecommendations;
