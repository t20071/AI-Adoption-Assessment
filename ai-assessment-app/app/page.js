"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import questions, { dimensions } from "./config/questions";
import leaderConfig from "./config/leader";
import { calculateScore, getDimensionLevels } from "./lib/scoring";
import { getFallbackRecommendations } from "./lib/recommendations";

/* ====================================================================
   Screen: Welcome
   ==================================================================== */
function WelcomeScreen({ onStart }) {
  return (
    <div className="card welcome" role="main">
      <div className="welcome__badge">📊 Assessment</div>
      <h1 className="welcome__title">AI Adoption Assessment</h1>
      <p className="welcome__subtitle">
        Discover how effectively you use AI at work and get personalised,
        evidence-based recommendations to improve.
      </p>
      <div className="welcome__features">
        <div className="welcome__feature">
          <span className="welcome__feature-icon" aria-hidden="true">⏱️</span>
          <span className="welcome__feature-text">
            <strong>5 minutes</strong>10 research-backed questions
          </span>
        </div>
        <div className="welcome__feature">
          <span className="welcome__feature-icon" aria-hidden="true">🎯</span>
          <span className="welcome__feature-text">
            <strong>5 dimensions</strong>Comprehensive AI readiness profile
          </span>
        </div>
        <div className="welcome__feature">
          <span className="welcome__feature-icon" aria-hidden="true">📈</span>
          <span className="welcome__feature-text">
            <strong>Personalised score</strong>With actionable recommendations
          </span>
        </div>
        <div className="welcome__feature">
          <span className="welcome__feature-icon" aria-hidden="true">🔬</span>
          <span className="welcome__feature-text">
            <strong>Evidence-based</strong>Grounded in 2024–2026 research
          </span>
        </div>
      </div>
      <div className="welcome__privacy">
        <span aria-hidden="true">🔒</span>
        <span>No data is stored or shared. Your answers stay in your browser.</span>
      </div>
      <button
        id="start-assessment"
        className="btn btn--primary"
        onClick={onStart}
      >
        Start Assessment →
      </button>
    </div>
  );
}

/* ====================================================================
   Screen: Question
   ==================================================================== */
function QuestionScreen({ question, index, total, selectedOption, onSelect, onNext, onBack }) {
  return (
    <>
      <div className="progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total} aria-label={`Question ${index + 1} of ${total}`}>
        <div className="progress__header">
          <span className="progress__label">{question.dimensionLabel}</span>
          <span className="progress__count">
            {index + 1} of {total}
          </span>
        </div>
        <div className="progress__bar">
          <div
            className="progress__fill"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="card" role="main">
        <div>
          <span className="question__dimension-tag">{question.dimensionLabel}</span>
          <span className="question__type-tag">
            {question.type === "scenario" ? "Scenario" : "Self-Report"}
          </span>
        </div>

        <h2 className="question__text">{question.text}</h2>

        <div className="question__options" role="radiogroup" aria-label="Answer options">
          {question.options.map((option, i) => (
            <button
              key={i}
              id={`option-${question.id}-${i}`}
              className={`question__option${selectedOption === i ? " question__option--selected" : ""}`}
              onClick={() => onSelect(i)}
              role="radio"
              aria-checked={selectedOption === i}
            >
              <span className="question__option-radio" aria-hidden="true" />
              <span>{option.text}</span>
            </button>
          ))}
        </div>

        <div className="question__actions">
          <button
            id="btn-back"
            className="btn btn--secondary btn--small"
            onClick={onBack}
            disabled={index === 0}
          >
            ← Back
          </button>
          <button
            id="btn-next"
            className="btn btn--primary btn--small"
            onClick={onNext}
            disabled={selectedOption === null || selectedOption === undefined}
          >
            {index === total - 1 ? "See Results" : "Next →"}
          </button>
        </div>
      </div>
    </>
  );
}

/* ====================================================================
   Screen: Results
   ==================================================================== */
function ResultsScreen({ results, recommendations, isAiGenerated, aiProvider, isLoading, onRetake }) {
  const circleRef = useRef(null);
  const circumference = 2 * Math.PI * 68;
  const offset = circumference - (results.totalScore / 100) * circumference;

  useEffect(() => {
    // Animate the circle on mount
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = circumference;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          circleRef.current.style.strokeDashoffset = offset;
        });
      });
    }
  }, [circumference, offset]);

  return (
    <div className="results">
      {/* Score Card */}
      <div className="card results__score-card">
        <div className="results__score-circle">
          <svg viewBox="0 0 160 160" aria-hidden="true">
            <circle className="results__score-circle-bg" cx="80" cy="80" r="68" />
            <circle
              ref={circleRef}
              className="results__score-circle-fill"
              cx="80"
              cy="80"
              r="68"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
            />
          </svg>
          <div className="results__score-value">
            <div className="results__score-number">{results.totalScore}</div>
            <div className="results__score-max">out of 100</div>
          </div>
        </div>
        <div className="results__level">{results.level}</div>
        <p className="results__level-desc">{results.levelDescription}</p>
      </div>

      {/* Leader Message Card */}
      <div className="card card--wide" style={{ padding: 0, overflow: "hidden" }}>
        <div className="leader-card">
          <img
            className="leader-card__avatar"
            src={leaderConfig.photo}
            alt={`${leaderConfig.name} avatar`}
            width={72}
            height={72}
          />
          <div className="leader-card__content">
            <div className="leader-card__name">{leaderConfig.name}</div>
            <div className="leader-card__title">{leaderConfig.title}</div>
            <div className="leader-card__question">
              &ldquo;What is your score, and what is your recommendation for improving AI use in the workplace?&rdquo;
            </div>
            <div className="leader-card__message">
              Your AI Adoption Score is <strong>{results.totalScore}/100</strong> — placing you at the{" "}
              <strong>{results.level}</strong> level. {results.levelDescription}{" "}
              See the personalised recommendations below for your next steps.
            </div>
          </div>
        </div>
      </div>

      {/* Dimension Breakdown */}
      <div className="card card--wide dimensions">
        <h3 className="dimensions__title">Score by Dimension</h3>
        {Object.entries(results.dimensionScores).map(([key, dim]) => (
          <div className="dimension-bar" key={key}>
            <div className="dimension-bar__header">
              <span className="dimension-bar__label">{dim.label}</span>
              <span className="dimension-bar__value">{dim.percentage}%</span>
            </div>
            <div className="dimension-bar__track">
              <div
                className={`dimension-bar__fill ${dim.percentage <= 33 ? "dimension-bar__fill--low" : dim.percentage <= 66 ? "dimension-bar__fill--mid" : "dimension-bar__fill--high"}`}
                style={{ width: `${dim.percentage}%` }}
              />
            </div>
          </div>
        ))}
        <p className="results__note">
          Your score is measured against a fixed proficiency scale based on research,
          not compared to other individuals. As more team members complete the
          assessment, team-level comparisons may become available.
        </p>
      </div>

      {/* Recommendations */}
      <div className="card card--wide recommendations">
        <h3 className="recommendations__title">Your Personalised Recommendations</h3>
        <p className="recommendations__subtitle">
          Prioritised actions to improve your AI effectiveness, starting with your biggest opportunities.
        </p>
        {isAiGenerated && (
          <div className="recommendations__ai-label">
            ✨ Generated by {aiProvider || "AI"}
          </div>
        )}
        {isLoading ? (
          <div className="loading">
            <div className="loading__spinner" />
            <div className="loading__text">Generating personalised recommendations…</div>
          </div>
        ) : (
          recommendations.map((rec, i) => (
            <div className="recommendation-item" key={i}>
              <div className="recommendation-item__header">
                <span className="recommendation-item__priority">{rec.priority || i + 1}</span>
                <span className="recommendation-item__title">{rec.title}</span>
              </div>
              <div className="recommendation-item__dimension">{rec.dimension}</div>
              <p className="recommendation-item__description">{rec.description}</p>
              {rec.source && (
                <p className="recommendation-item__source">{rec.source}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Actions */}
      <div className="results__actions">
        <button id="btn-retake" className="btn btn--secondary" onClick={onRetake}>
          Retake Assessment
        </button>
      </div>
    </div>
  );
}

/* ====================================================================
   Main App Component
   ==================================================================== */
export default function Home() {
  const [screen, setScreen] = useState("welcome"); // welcome | question | results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [aiProvider, setAiProvider] = useState("");
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  const handleStart = useCallback(() => {
    setScreen("question");
    setCurrentQuestion(0);
    setAnswers({});
  }, []);

  const handleSelectOption = useCallback(
    (optionIndex) => {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: optionIndex,
      }));
    },
    [currentQuestion]
  );

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate results
      const scoreResults = calculateScore(answers, questions);
      setResults(scoreResults);
      setScreen("results");

      // Load fallback recommendations immediately
      const fallback = getFallbackRecommendations(scoreResults.dimensionScores);
      setRecommendations(fallback);
      setIsAiGenerated(false);

      // Try to get AI-generated recommendations
      setIsLoadingRecs(true);
      const dimensionLevels = getDimensionLevels(scoreResults.dimensionScores);

      fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalScore: scoreResults.totalScore,
          level: scoreResults.level,
          dimensionLevels,
          dimensionScores: scoreResults.dimensionScores,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.fallback && data.recommendations) {
            setRecommendations(data.recommendations);
            setIsAiGenerated(true);
            if (data.provider) setAiProvider(data.provider);
          }
          // If fallback, we already have the rule-based ones
        })
        .catch(() => {
          // Silently use fallback recommendations
        })
        .finally(() => {
          setIsLoadingRecs(false);
        });
    }
  }, [currentQuestion, answers]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleRetake = useCallback(() => {
    setScreen("welcome");
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setRecommendations([]);
    setIsAiGenerated(false);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <span className="app-header__title">AI Adoption Assessment</span>
      </header>

      <main className="app-main">
        {screen === "welcome" && <WelcomeScreen onStart={handleStart} />}

        {screen === "question" && (
          <QuestionScreen
            question={questions[currentQuestion]}
            index={currentQuestion}
            total={questions.length}
            selectedOption={answers[questions[currentQuestion].id]}
            onSelect={handleSelectOption}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {screen === "results" && results && (
          <ResultsScreen
            results={results}
            recommendations={recommendations}
            isAiGenerated={isAiGenerated}
            aiProvider={aiProvider}
            isLoading={isLoadingRecs}
            onRetake={handleRetake}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          AI Adoption Assessment — Built with evidence from 20+ research sources (2023–2026).
          No data is stored or shared.
        </p>
      </footer>
    </div>
  );
}
