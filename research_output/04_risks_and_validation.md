# Risks, Fairness Concerns, and Validation Plan

## Measurement Risks

### 1. Self-Report Bias (High Risk)
**The problem**: 92% of professionals feel confident in their AI skills (Pluralsight, 2025), yet competence gaps persist. Research documents a "reverse Dunning-Kruger" effect where AI-literate users show *greater* overconfidence due to cognitive offloading.

**Our mitigation**: 50% of questions are scenario-based, forcing demonstrated reasoning rather than confidence reporting. Scenario questions have objectively better and worse answers that can't be gamed by simply claiming high competence.

**Residual risk**: Even scenario-based questions in a text format are a proxy for actual behavior. A person might choose the "right" answer on the assessment but not follow through in practice. This is inherent to any self-administered assessment.

### 2. Social Desirability Bias (Medium Risk)
**The problem**: If people know what the "right" answer is, they'll choose it regardless of their actual behavior.

**Our mitigation**: Scenario questions are designed so the best answer isn't always the most obvious one (e.g., Q4 option b — "paste the whole document" — sounds productive but is suboptimal). The assessment is framed as a development tool, not a test.

### 3. Gaming (Medium Risk, increases if scores have consequences)
**The problem**: If the score is tied to performance reviews or rewards, people will optimize for the test.

**Our mitigation**: Recommend this as a development tool, never as a performance metric. Include a note in the app that the score is for personal growth. If the organization wants to tie consequences to AI skills, recommend separate, proctored assessments.

### 4. Role and Context Variation (Medium Risk)
**The problem**: A field researcher's optimal AI use differs from a data scientist's. Generic questions may disadvantage people whose roles don't obviously benefit from AI or whose organizations don't provide access.

**Our mitigation**: Questions are designed to be role-agnostic, focusing on general AI interaction skills (understanding, evaluation, integration) rather than specific tool proficiency. The results note states: "Your score reflects general AI readiness, which may vary based on your role and the tools available to you."

### 5. Access Inequality (Medium Risk)
**The problem**: People with access to better AI tools, more training, and more supportive organizations will naturally score higher, regardless of personal aptitude.

**Our mitigation**: Include understanding and judgment-based questions that are independent of tool access. Acknowledge in the results that the score is influenced by opportunity, not just ability.

### 6. Temporal Decay (Low-Medium Risk)
**The problem**: AI capabilities evolve rapidly. Questions that are appropriate in October 2026 may be outdated by mid-2027.

**Our mitigation**: Design questions around stable competencies (evaluation, integration, ethics) rather than specific tools. Plan for biannual review and update of the question bank.

---

## Fairness Concerns

### Digital Divide
People in under-resourced contexts (weaker internet, fewer tools, less training) are structurally disadvantaged. The assessment should never be used to penalize people who lack access.

### Language and Cultural Bias
AI tools and most AI research are English-centric. Non-English speakers may have different AI interaction patterns. Our questions are written in English and assume English-language AI tool use.

### Disability and Accessibility
The web app must be fully accessible (keyboard navigation, screen reader support, sufficient contrast). AI tools themselves have accessibility gaps that may affect how people with disabilities interact with them — this is not captured in the assessment.

### Organizational Power Dynamics
If a leader or manager mandates the assessment, employees may feel pressured to perform well or may be anxious about results being shared. The app should clearly state that no data is stored or shared.

---

## Validation Plan

### Phase 1: Internal Pilot (N = 50+)
**Timeline**: First 2–4 weeks after launch.

**Activities**:
1. Administer the assessment to 50+ team members.
2. Calculate Cronbach's alpha for overall score and each dimension. Target: α ≥ 0.70.
3. Calculate item-total correlations. Flag any item with r < 0.30.
4. Review score distributions: check for ceiling effects (> 25% scoring 81+), floor effects (> 25% scoring < 20), or unusual clustering.
5. Collect qualitative feedback: Were questions clear? Did any feel irrelevant? Did the scenarios feel realistic?

**Decision point**: Revise or replace items with poor psychometric properties. Adjust difficulty if distributions are skewed.

### Phase 2: Expanded Pilot (N = 100+)
**Timeline**: 2–3 months after launch.

**Activities**:
1. Run exploratory factor analysis (EFA) to confirm the 5-dimension structure.
2. Check whether the proposed dimensions emerge from the data or whether a different structure fits better.
3. If available, correlate scores with external indicators:
   - AI tool usage logs (if IT can provide them)
   - Manager ratings of AI effectiveness
   - Self-reported productivity changes
4. Begin calculating team-level descriptive statistics (means, standard deviations).

**Decision point**: If EFA suggests fewer than 5 factors, consider simplifying the model. If more than 5, consider splitting a dimension.

### Phase 3: Confirmatory Validation (N = 200+)
**Timeline**: 6–12 months after launch.

**Activities**:
1. Confirmatory factor analysis (CFA) on the refined model.
2. Test-retest reliability with a subset (re-administer after 2–4 weeks).
3. Establish internal team norms (team percentiles become available).
4. Assess sensitivity to change: do people who complete training show score improvements?

**Decision point**: If the model holds up, publish internal norms. If not, iterate on the model structure.

### Ongoing Maintenance
- **Biannual review**: Update questions to reflect evolving AI capabilities and workplace practices.
- **Annual psychometric review**: Recalculate reliability and validity metrics as new data accumulates.
- **Question bank expansion**: Develop a larger question pool to enable randomized question selection, reducing gaming risk for repeat test-takers.
