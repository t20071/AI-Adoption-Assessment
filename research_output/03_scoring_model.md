# Scoring Model

## Overview
- **Dimensions**: 5
- **Questions**: 10 (2 per dimension)
- **Score range**: 0–100
- **Question types**: Mix of self-report (5) and scenario-based (5) — 50% each
- **Time to complete**: ~5 minutes

### Why 10 Questions (Not 20)
Psychometric literature shows 10–12 items provide an optimal balance of reliability (Cronbach's alpha ≥ 0.70 is achievable) and completion rate for non-clinical workplace assessments. Completion rates drop significantly past 12 items, and reliability gains show diminishing returns beyond 15–20 items. Since this is a voluntary development tool (not a high-stakes clinical instrument), we optimize for completion.

---

## Dimensions, Weights, and Scoring Rules

### Dimension 1: AI Understanding & Literacy (15%)

**Q1 (Self-report)**: *How would you describe your understanding of what AI tools like ChatGPT, Copilot, or Claude can and cannot do?*
- (a) I'm not really sure what these tools do → 0 points
- (b) I know the basics — they generate text and can help with some tasks → 1 point
- (c) I understand their strengths and common limitations like hallucinations → 2 points
- (d) I can explain to colleagues when AI is reliable and when it isn't, with examples → 3 points

**Q2 (Scenario)**: *Your colleague shares a detailed AI-generated market research report with specific statistics and company names. What is your first instinct?*
- (a) Use it as-is — AI is good at research → 0 points
- (b) Skim it and use it if it looks reasonable → 1 point
- (c) Verify the key statistics and company claims against original sources → 3 points
- (d) Tell your colleague not to use AI for research → 1 point

Dimension max raw: 6 points → scaled to 15/100

---

### Dimension 2: Practical Application & Tool Use (25%)

**Q3 (Self-report)**: *How often and in what ways do you use AI tools in your work?*
- (a) I don't use AI tools at work → 0 points
- (b) Occasionally for simple tasks (rewriting emails, quick lookups) → 1 point
- (c) Regularly for multiple task types (writing, analysis, brainstorming, coding) → 2 points
- (d) Daily across diverse tasks, often iterating back and forth with the AI to refine results → 3 points

**Q4 (Scenario)**: *You need to prepare a summary of a 50-page policy document for your team. How would you approach this with AI?*
- (a) I wouldn't use AI for this — I'd read and summarize it myself → 1 point
- (b) Paste the whole document into an AI tool and ask for a summary → 1 point
- (c) Break the document into sections, summarize each with AI, then review and combine the summaries myself → 3 points
- (d) Ask AI to summarize it and send the result directly to the team → 0 points

Dimension max raw: 6 points → scaled to 25/100

---

### Dimension 3: Quality Control & Critical Evaluation (25%)

**Q5 (Scenario)**: *You ask AI to draft talking points for a presentation to a funding partner. The draft includes a claim that "a 2025 WHO study found a 47% improvement in health outcomes from digital interventions." You don't recognize this statistic. What do you do?*
- (a) Keep it — it sounds specific and credible → 0 points
- (b) Remove it to be safe → 1 point
- (c) Search for the specific WHO study to verify whether it exists and says this → 3 points
- (d) Rephrase it to be less specific → 1 point

**Q6 (Self-report)**: *When you use AI to help with your work, how often do you check or edit the output before using it?*
- (a) I usually use AI output as-is → 0 points
- (b) I make minor edits (formatting, tone) → 1 point
- (c) I review for accuracy and make substantive corrections when needed → 2 points
- (d) I systematically verify facts, check reasoning, and often restructure the output significantly → 3 points

Dimension max raw: 6 points → scaled to 25/100

---

### Dimension 4: Workflow Integration & Strategy (20%)

**Q7 (Self-report)**: *How has AI changed the way you approach your work overall?*
- (a) It hasn't changed my work approach → 0 points
- (b) I use it as a helpful add-on when I think of it → 1 point
- (c) I've started building it into my regular processes and have specific ways I use it for recurring tasks → 2 points
- (d) I've redesigned parts of my workflow around AI, saving significant time and enabling work I couldn't do before → 3 points

**Q8 (Scenario)**: *Your team is starting a new research project that will involve literature review, stakeholder interviews, data analysis, and report writing. At which stages would you plan to use AI?*
- (a) I wouldn't plan for AI use at the start — I'd use it if I get stuck → 0 points
- (b) Mainly for the writing stage at the end → 1 point
- (c) For literature review and writing, with human judgment for interviews and analysis → 2 points
- (d) I'd map AI's role at each stage upfront: research synthesis, interview guide drafting, analysis assistance, drafting, and quality-checking — with clear human review points → 3 points

Dimension max raw: 6 points → scaled to 20/100

---

### Dimension 5: Responsible & Ethical Use (15%)

**Q9 (Scenario)**: *A colleague asks you to paste beneficiary survey data (including names and locations) into an AI chatbot to help identify patterns. What do you do?*
- (a) Go ahead — AI is a useful analysis tool → 0 points
- (b) Remove the names but keep the locations → 1 point
- (c) Decline and explain that personally identifiable information shouldn't be shared with external AI tools without proper data handling protocols → 3 points
- (d) Ask your manager what to do → 2 points

**Q10 (Self-report)**: *How familiar are you with your organization's policies or guidelines on using AI at work?*
- (a) I don't think we have any, or I haven't looked → 0 points
- (b) I know they exist but haven't read them closely → 1 point
- (c) I'm familiar with the key rules (what data can be shared, which tools are approved) → 2 points
- (d) I know them well and help colleagues understand them too → 3 points

Dimension max raw: 6 points → scaled to 15/100

---

## Scoring Formula

```
Total Score = (D1_raw / 6 × 15) + (D2_raw / 6 × 25) + (D3_raw / 6 × 25) + (D4_raw / 6 × 20) + (D5_raw / 6 × 15)
```

Where each dimension raw score is the sum of its two question scores (0–6).

Maximum possible score: 100
Minimum possible score: 0

---

## Score Bands

| Score Range | Level | Description |
|-------------|-------|-------------|
| 0–20 | Starting Out | You're at the beginning of your AI journey. Focus on understanding what AI can do and trying simple tasks. |
| 21–40 | Building Foundations | You have basic awareness and some experience. Focus on building regular habits and learning to evaluate AI output. |
| 41–60 | Developing Proficiency | You use AI regularly and are developing good practices. Focus on deepening your quality control and integrating AI into workflows. |
| 61–80 | Advanced Practitioner | You're a skilled AI user who integrates it strategically. Focus on helping others and pushing the boundaries of what's possible. |
| 81–100 | Leading | You're among the most effective AI users, redesigning work around AI while maintaining high quality and ethical standards. |

---

## Percentile Decision

**No percentile is shown at launch.**

The assessment displays a clear note: *"Your score is measured against a fixed proficiency scale based on research, not compared to other individuals. As more team members complete the assessment, team-level comparisons may become available."*

This decision is based on the finding that no public dataset supports a valid global benchmark (see Section 2d of findings).
