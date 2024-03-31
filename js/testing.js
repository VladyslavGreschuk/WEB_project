const testData = {
    "testName": "Тест про туризм в Римі",
    "questions": [
      {
        "question": "Хто написав 'Мону Лізу'?",
        "answers": [
          {
            "answer": "Леонардо Да Вінчі",
            "isCorrect": true
          },
          {
            "answer": "Едуард Мане",
            "isCorrect": false
          },
          {
            "answer": "Поль Сезан",
            "isCorrect": false
          },
          {
            "answer": "Рафаель Санті",
            "isCorrect": false
          }
        ]
      },
      {
        "question": "Як називається техніка малювання, в якій художник використовує восковий олівець?",
        "answers": [
          {
            "answer": "Пастель",
            "isCorrect": true
          },
          {
            "answer": "Акварель",
            "isCorrect": false
          },
          {
            "answer": "Штрихування",
            "isCorrect": false
          },
          {
            "answer": "Гуаш",
            "isCorrect": false
          }
        ]
      },
      {
        "question": "Коли був заснований відомий художній рух 'імпресіонізм'?",
        "answers": [
          {
            "answer": "17 століття",
            "isCorrect": false
          },
          {
            "answer": "18 століття",
            "isCorrect": false
          },
          {
            "answer": "19 століття",
            "isCorrect": true
          },
          {
            "answer": "20 століття",
            "isCorrect": false
          }
        ]
      },
      {
        "question": "Хто з цих художників славиться роботами в стилі сюрреалізму?",
        "answers": [
          {
            "answer": "Вінсент Ван Гог",
            "isCorrect": false
          },
          {
            "answer": "Рембрандт",
            "isCorrect": false
          },
          {
            "answer": "Сальвадор Далі",
            "isCorrect": true
          },
          {
            "answer": "Іван Айвазовський",
            "isCorrect": false
          }
        ]
      },
      {
        "question": "Як називається художня техніка, в якій малюнок створюється за допомогою мінеральних пігментів, змішаних з лляними оліями?",
        "answers": [
          {
            "answer": "Акварель",
            "isCorrect": false
          },
          {
            "answer": "Гуаш",
            "isCorrect": false
          },
          {
            "answer":  "Акрил",
            "isCorrect": false
          },
          {
            "answer": "Олійне малювання",
            "isCorrect": true
          }
        ]
      }
    ]
};

const questionsContainer = document.getElementById('questions-container');
const submitButton = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

// Відображення питань та відповідей
function displayQuestions() {
    testData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>Питання ${index + 1}: ${question.question}</h3>`;
        
        question.answers.forEach((answer, answerIndex) => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            answerDiv.innerHTML = `
                <input type="radio" id="answer-${index}-${answerIndex}" name="answer-${index}" value="${answerIndex}">
                <label for="answer-${index}-${answerIndex}">${answer.answer}</label>
            `;
            questionDiv.appendChild(answerDiv);
        });
        
        questionsContainer.appendChild(questionDiv);
    });
}

// Перевірка правильності відповідей та виведення результату
function checkAnswers() {
    let correctAnswers = 0;
    testData.questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="answer-${index}"]:checked`);
        if (selectedAnswer) {
            const selectedAnswerIndex = selectedAnswer.value;
            const selectedAnswerElement = document.getElementById(`answer-${index}-${selectedAnswerIndex}`);
            if (question.answers[selectedAnswerIndex].isCorrect) {
                correctAnswers++;
                selectedAnswerElement.nextElementSibling.style.color = 'green';
            } else {
                selectedAnswerElement.nextElementSibling.style.color = 'red';
            }
        }
        // Відображення правильних відповідей
        question.answers.forEach((answer, answerIndex) => {
            const answerElement = document.getElementById(`answer-${index}-${answerIndex}`);
            if (answer.isCorrect) {
                answerElement.nextElementSibling.style.color = 'green';
            }
            // Відключення радіо-кнопок
            answerElement.disabled = true;
        });
    });
    const totalQuestions = testData.questions.length;
    const score = (correctAnswers / totalQuestions) * 100;
    resultDiv.textContent = `Ви відповіли правильно на ${correctAnswers} з ${totalQuestions} питань. Ваш результат: ${score}%`;
}

// Відображення питань при завантаженні сторінки
window.onload = () => {
    displayQuestions();
};

// Обробник події кнопки "Завершити тест"
submitButton.addEventListener('click', () => {
    checkAnswers();
});
