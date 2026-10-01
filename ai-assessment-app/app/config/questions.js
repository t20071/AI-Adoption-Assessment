/**
 * Assessment Questions
 * 
 * 10 questions across 5 dimensions, 2 per dimension.
 * Mix: 5 self-report + 5 scenario-based.
 * Each question maps to a dimension with a weight.
 * 
 * To modify questions, edit this file. Each question needs:
 * - id: unique identifier
 * - dimension: which dimension it measures
 * - type: "self-report" or "scenario"
 * - text: the question text
 * - options: array of { text, points } objects
 */

const questions = [
  // ===== DIMENSION 1: AI Understanding & Literacy (Weight: 15%) =====
  {
    id: "q1",
    dimension: "understanding",
    dimensionLabel: "AI Understanding & Literacy",
    type: "self-report",
    text: "How would you describe your understanding of what AI tools like ChatGPT, Copilot, or Claude can and cannot do?",
    options: [
      { text: "I'm not really sure what these tools do", points: 0 },
      { text: "I know the basics — they generate text and can help with some tasks", points: 1 },
      { text: "I understand their strengths and common limitations like hallucinations", points: 2 },
      { text: "I can explain to colleagues when AI is reliable and when it isn't, with examples", points: 3 },
    ],
  },
  {
    id: "q2",
    dimension: "understanding",
    dimensionLabel: "AI Understanding & Literacy",
    type: "scenario",
    text: "Your colleague shares a detailed AI-generated market research report with specific statistics and company names. What is your first instinct?",
    options: [
      { text: "Use it as-is — AI is good at research", points: 0 },
      { text: "Skim it and use it if it looks reasonable", points: 1 },
      { text: "Verify the key statistics and company claims against original sources", points: 3 },
      { text: "Tell your colleague not to use AI for research", points: 1 },
    ],
  },

  // ===== DIMENSION 2: Practical Application & Tool Use (Weight: 25%) =====
  {
    id: "q3",
    dimension: "application",
    dimensionLabel: "Practical Application & Tool Use",
    type: "self-report",
    text: "How often and in what ways do you use AI tools in your work?",
    options: [
      { text: "I don't use AI tools at work", points: 0 },
      { text: "Occasionally for simple tasks (rewriting emails, quick lookups)", points: 1 },
      { text: "Regularly for multiple task types (writing, analysis, brainstorming, coding)", points: 2 },
      { text: "Daily across diverse tasks, often iterating back and forth with the AI to refine results", points: 3 },
    ],
  },
  {
    id: "q4",
    dimension: "application",
    dimensionLabel: "Practical Application & Tool Use",
    type: "scenario",
    text: "You need to prepare a summary of a 50-page policy document for your team. How would you approach this with AI?",
    options: [
      { text: "I wouldn't use AI for this — I'd read and summarize it myself", points: 1 },
      { text: "Paste the whole document into an AI tool and ask for a summary", points: 1 },
      { text: "Break the document into sections, summarize each with AI, then review and combine the summaries myself", points: 3 },
      { text: "Ask AI to summarize it and send the result directly to the team", points: 0 },
    ],
  },

  // ===== DIMENSION 3: Quality Control & Critical Evaluation (Weight: 25%) =====
  {
    id: "q5",
    dimension: "quality",
    dimensionLabel: "Quality Control & Critical Evaluation",
    type: "scenario",
    text: "You ask AI to draft talking points for a presentation. The draft includes: \"A 2025 WHO study found a 47% improvement in health outcomes from digital interventions.\" You don't recognise this statistic. What do you do?",
    options: [
      { text: "Keep it — it sounds specific and credible", points: 0 },
      { text: "Remove it to be safe", points: 1 },
      { text: "Search for the specific WHO study to verify whether it exists and says this", points: 3 },
      { text: "Rephrase it to be less specific", points: 1 },
    ],
  },
  {
    id: "q6",
    dimension: "quality",
    dimensionLabel: "Quality Control & Critical Evaluation",
    type: "self-report",
    text: "When you use AI to help with your work, how often do you check or edit the output before using it?",
    options: [
      { text: "I usually use AI output as-is", points: 0 },
      { text: "I make minor edits (formatting, tone)", points: 1 },
      { text: "I review for accuracy and make substantive corrections when needed", points: 2 },
      { text: "I systematically verify facts, check reasoning, and often restructure the output significantly", points: 3 },
    ],
  },

  // ===== DIMENSION 4: Workflow Integration & Strategy (Weight: 20%) =====
  {
    id: "q7",
    dimension: "workflow",
    dimensionLabel: "Workflow Integration & Strategy",
    type: "self-report",
    text: "How has AI changed the way you approach your work overall?",
    options: [
      { text: "It hasn't changed my work approach", points: 0 },
      { text: "I use it as a helpful add-on when I think of it", points: 1 },
      { text: "I've started building it into my regular processes for recurring tasks", points: 2 },
      { text: "I've redesigned parts of my workflow around AI, enabling work I couldn't do before", points: 3 },
    ],
  },
  {
    id: "q8",
    dimension: "workflow",
    dimensionLabel: "Workflow Integration & Strategy",
    type: "scenario",
    text: "Your team is starting a new project involving research, interviews, data analysis, and report writing. At which stages would you plan to use AI?",
    options: [
      { text: "I wouldn't plan for AI use at the start — I'd use it if I get stuck", points: 0 },
      { text: "Mainly for the writing stage at the end", points: 1 },
      { text: "For research and writing, with human judgment for interviews and analysis", points: 2 },
      { text: "I'd map AI's role at each stage upfront, with clear human review points throughout", points: 3 },
    ],
  },

  // ===== DIMENSION 5: Responsible & Ethical Use (Weight: 15%) =====
  {
    id: "q9",
    dimension: "ethics",
    dimensionLabel: "Responsible & Ethical Use",
    type: "scenario",
    text: "A colleague asks you to paste beneficiary survey data — including names and locations — into an AI chatbot to help identify patterns. What do you do?",
    options: [
      { text: "Go ahead — AI is a useful analysis tool", points: 0 },
      { text: "Remove the names but keep the locations", points: 1 },
      { text: "Decline and explain that personally identifiable information shouldn't be shared with external AI tools without proper protocols", points: 3 },
      { text: "Ask your manager what to do", points: 2 },
    ],
  },
  {
    id: "q10",
    dimension: "ethics",
    dimensionLabel: "Responsible & Ethical Use",
    type: "self-report",
    text: "How familiar are you with your organisation's policies or guidelines on using AI at work?",
    options: [
      { text: "I don't think we have any, or I haven't looked", points: 0 },
      { text: "I know they exist but haven't read them closely", points: 1 },
      { text: "I'm familiar with the key rules (what data can be shared, which tools are approved)", points: 2 },
      { text: "I know them well and help colleagues understand them too", points: 3 },
    ],
  },
];

export const dimensions = {
  understanding: { label: "AI Understanding & Literacy", weight: 15, maxRaw: 6 },
  application: { label: "Practical Application & Tool Use", weight: 25, maxRaw: 6 },
  quality: { label: "Quality Control & Critical Evaluation", weight: 25, maxRaw: 6 },
  workflow: { label: "Workflow Integration & Strategy", weight: 20, maxRaw: 6 },
  ethics: { label: "Responsible & Ethical Use", weight: 15, maxRaw: 6 },
};

export const scoreBands = [
  { min: 0, max: 20, level: "Starting Out", description: "You're at the beginning of your AI journey. Focus on understanding what AI can do and trying simple tasks." },
  { min: 21, max: 40, level: "Building Foundations", description: "You have basic awareness and some experience. Focus on building regular habits and learning to evaluate AI output." },
  { min: 41, max: 60, level: "Developing Proficiency", description: "You use AI regularly and are developing good practices. Focus on deepening your quality control skills and integrating AI into workflows." },
  { min: 61, max: 80, level: "Advanced Practitioner", description: "You're a skilled AI user who integrates it strategically. Focus on helping others and pushing the boundaries of what's possible." },
  { min: 81, max: 100, level: "Leading", description: "You're among the most effective AI users, redesigning work around AI while maintaining high quality and ethical standards." },
];

export default questions;
