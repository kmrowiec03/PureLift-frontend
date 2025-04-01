import React, { useEffect, useState } from "react";
import axios from "axios";

const TrainingPlans = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [trainingDays, setTrainingDays] = useState([]);

    // Pobieranie listy planów treningowych
    useEffect(() => {
        axios.get("http://localhost:8080/api/training")
            .then(response => {
                setPlans(response.data);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania planów:", error);
            });
    }, []);

    // Pobieranie dni treningowych dla wybranego planu
    const fetchTrainingDays = (planId) => {
        axios.get(`http://localhost:8080/api/training/${planId}`)
            .then(response => {
                setSelectedPlan(planId);
                setTrainingDays(response.data.trainingDays);
            })
            .catch(error => {
                console.error("Błąd podczas pobierania dni treningowych:", error);
            });
    };

    return (
        <div>
            <h2>Lista Planów Treningowych</h2>
            <ul>
                {plans.map(plan => (
                    <li key={plan.id}>
                        <button onClick={() => fetchTrainingDays(plan.id)}>
                            {plan.title}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedPlan && (
                <div>
                    <h3>Dni treningowe dla wybranego planu:</h3>
                    <ul>
                        {trainingDays.map(day => (
                            <li key={day.id}>Dzień </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TrainingPlans;
