import { useState } from 'react';
import './QuizPage.css';
import { quizQuestions } from '../../Data/quizQuestions';
import { QuestionCard } from '../../Components/QuestionCard/QuestionCard';
import { useNavigate } from 'react-router-dom';

export const QuizPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<(string | number | null)[]>(
        Array(quizQuestions.length).fill(null)
    );
    const [riskProfile, setRiskProfile] = useState<string | null>(null);

    const currentQuestion = quizQuestions[currentIndex];
    const navigate = useNavigate();

    const handleAnswer = (value: string | number) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = value;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleGenerate = async () => {
        try {
            const response = await fetch("http://localhost:8000/risk-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    answers: answers.map(Number)
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch risk profile");
            }

            const data = await response.json();
            setRiskProfile(data.risk_profile);

            navigate("/proposal", { state: { riskProfile: data.risk_profile } });

        } catch (error) {
            console.error("Error sending answers:", error);
            alert("Something went wrong while generating the proposal.");
        }
    };

    return (
        <div className="quiz-page">
            <QuestionCard
                question={currentQuestion}
                answer={answers[currentIndex]}
                onAnswer={handleAnswer}
            />

            <div className="nav-buttons">
                {currentIndex > 0 && (
                    <button onClick={handlePrevious}>Previous</button>
                )}

                {currentIndex < quizQuestions.length - 1 ? (
                    <button
                        onClick={handleNext}
                        disabled={answers[currentIndex] === null}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleGenerate}
                        disabled={answers[currentIndex] === null}
                    >
                        Generate Proposal
                    </button>
                )}
            </div>
        </div>
    );
};
// The QuizPage component is responsible for rendering the quiz questions and handling user input.
// It uses the useState hook to manage the current question index, user answers, and the risk profile.