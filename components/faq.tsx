'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is your typical timeline for a project?",
    answer: "For software MVP development, projects typically range from 4 to 8 weeks depending on complexity. Technical research and whitepapers are usually delivered within 5 to 7 days."
  },
  {
    question: "How does the payment structure work?",
    answer: "I require a 70% upfront payment to secure your slot and commence discovery and planning. The remaining 30% is transferred upon final delivery and project handoff."
  },
  {
    question: "Do we need to have frequent meetings?",
    answer: "Not at all. I prioritize a real-time, collaborative workflow relying on async updates. You stay fully informed on progress without unnecessary meetings eating into your schedule."
  },
  {
    question: "What do your technical research services entail?",
    answer: "I deliver applied research, architecture reviews, feasibility studies, product research, and whitepaper development to turn complex technical ideas into clear, strategic decisions for your business."
  },
  {
    question: "Can you work with AI-native integrations?",
    answer: "Yes. I specialize in building scalable web applications and MVPs with integrated AI capabilities, robust architecture, and high performance."
  },
  {
    question: "How do we communicate and share feedback?",
    answer: "We typically use emails for quick communications and async updates, alongside a project management tool for tracking deliverables."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, I offer various system maintenance and security packages to ensure your software remains secure, up-to-date, and performant after launch."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto divide-y divide-gray-200">
      {faqs.map((faq, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between text-left focus:outline-none"
          >
            <span className="text-lg font-medium text-gray-900">{faq.question}</span>
            <span className="ml-6 flex-shrink-0">
              {openIndex === index ? (
                <Minus className="h-5 w-5 text-[#FF0000]" />
              ) : (
                <Plus className="h-5 w-5 text-gray-400" />
              )}
            </span>
          </button>
          {openIndex === index && (
            <div className="mt-4 pr-12">
              <p className="text-base text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
