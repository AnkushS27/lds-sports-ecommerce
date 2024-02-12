"use client";
import React, { useState } from "react";
import styles from "./page.module.css"; // Update the path based on your project structure

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is your product?",
    answer: "Our product is a fantastic solution for...",
  },
  {
    question: "How can I get started?",
    answer: "To get started, simply follow these steps:...",
  },
  // Add more FAQ items as needed
];

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [iconDirections, setIconDirections] = useState<("up" | "down")[]>(
    Array(faqData.length).fill("down")
  );

  const toggleQuestion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const toggleIconDirection = (index: number) => {
    setIconDirections((prevDirections) => {
      const newDirections = [...prevDirections];

      // Revert the direction of the previously opened dropdown
      if (openIndex !== null && openIndex !== index) {
        newDirections[openIndex] = 'down';
      }

      // Toggle the direction of the clicked dropdown
      newDirections[index] = newDirections[index] === 'down' ? 'up' : 'down';
      return newDirections;
    });

    toggleQuestion(index); // Toggle the question along with icon direction
  };

  return (
    <div className={styles.container}>
      <h1>Frequently Asked Questions</h1>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <div className={styles.questionContainer}>
              <div
                className={styles.question}
              >
                {item.question}
              </div>
              <div
                className={styles.dropdownIcon}
                onClick={() => toggleIconDirection(index)}
              >
                {iconDirections[index] === "down" ? "▼" : "▲"}
              </div>
            </div>
            {openIndex === index && (
              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
