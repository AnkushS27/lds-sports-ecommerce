"use client";
import React, { useState } from "react";
import styles from "./page.module.css"; // Update the path based on your project structure

export default function FAQComponent({
  params,
}: {
  params: {
    id?: string;
    question: string;
    answer: string;
  };
}) {
  const [iconDirection, setIconDirection] = useState<string>("down");

  return (
    <div className={styles.faqItem}>
      <div className={styles.questionContainer}>
        <div className={styles.question}>{params.question}</div>
        <div
          className={styles.dropdownIcon}
          onClick={() => {
            setIconDirection(iconDirection === "down" ? "up" : "down");
          }}
        >
          {iconDirection === "down" ? "▼" : "▲"}
        </div>
      </div>
      {iconDirection === "up" && (
        <div className={styles.answer}>
          <p>{params.answer}</p>
        </div>
      )}
    </div>
  );
}
