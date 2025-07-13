"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is this YouTube downloader free to use?",
    answer: "Yes! This app is 100% free to use and doesn’t require any sign-up or payment.",
  },
  {
    question: "Can I download both video and audio?",
    answer: "Absolutely! You can download videos in MP4 format or extract audio as MP3.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No installation needed. Just paste the YouTube URL, pick a format, and download.",
  },
  {
    question: "Is it safe to use?",
    answer: "Yes, it’s safe. We don’t store any of your data or downloaded files.",
  },
  {
    question: "Why can’t I download some videos?",
    answer: "Some YouTube videos may have copyright restrictions or region locks that prevent downloading.",
  },
  {
    question: "Why is the YouTube downloader not working?",
    answer: "Due to YouTube API and policy restrictions, the downloader may not work on the hosted version. You can clone this project and run it locally to explore full functionality for educational purposes.",
  },
];


export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="Faqs" className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border rounded-lg shadow-sm transition hover:shadow-md"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none"
          >
            <span className="font-medium text-gray-700">{faq.question}</span>
            <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
