import { dimensions, scoreBands } from "../config/questions";

/**
 * Calculate the total score and dimension breakdown from user answers.
 * @param {Object} answers - Map of questionId -> selected option index
 * @param {Array} questions - The questions array
 * @returns {Object} { totalScore, dimensionScores, level, levelDescription }
 */
export function calculateScore(answers, questions) {
  // Accumulate raw scores per dimension
  const rawScores = {};
  Object.keys(dimensions).forEach((dim) => {
    rawScores[dim] = 0;
  });

  questions.forEach((q) => {
    const selectedIndex = answers[q.id];
    if (selectedIndex !== undefined && selectedIndex !== null) {
      rawScores[q.dimension] += q.options[selectedIndex].points;
    }
  });

  // Calculate weighted dimension scores and total
  const dimensionScores = {};
  let totalScore = 0;

  Object.entries(dimensions).forEach(([key, dim]) => {
    const raw = rawScores[key];
    const scaled = (raw / dim.maxRaw) * dim.weight;
    dimensionScores[key] = {
      label: dim.label,
      raw,
      maxRaw: dim.maxRaw,
      weight: dim.weight,
      scaled: Math.round(scaled * 10) / 10,
      percentage: Math.round((raw / dim.maxRaw) * 100),
    };
    totalScore += scaled;
  });

  totalScore = Math.round(totalScore);

  // Determine level
  const band = scoreBands.find((b) => totalScore >= b.min && totalScore <= b.max) || scoreBands[0];

  return {
    totalScore,
    dimensionScores,
    level: band.level,
    levelDescription: band.description,
  };
}

/**
 * Get the answer levels for each dimension (for sending to LLM).
 * Returns dimension key -> "low" | "medium" | "high"
 */
export function getDimensionLevels(dimensionScores) {
  const levels = {};
  Object.entries(dimensionScores).forEach(([key, dim]) => {
    if (dim.percentage <= 33) levels[key] = "low";
    else if (dim.percentage <= 66) levels[key] = "medium";
    else levels[key] = "high";
  });
  return levels;
}
