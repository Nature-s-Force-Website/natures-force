"use client";

import React from "react";

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessStepsData {
  title?: string;
  subtitle?: string;
  description?: string;
  steps: ProcessStep[];
  backgroundColor?: string;
  layout?: "vertical" | "horizontal" | "grid";
  showNumbers?: boolean;
  showIcons?: boolean;
}

interface ProcessStepsProps {
  data: ProcessStepsData;
}

export default function ProcessSteps({ data }: ProcessStepsProps) {
  const getStepIcon = (iconType: string, stepNumber: number) => {
    const icons = {
      consultation: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      quote: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      production: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      delivery: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      support: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.18l6.364 6.364a1 1 0 010 1.414L12 16.364a4 4 0 11-5.657-5.657L12 4.343a1 1 0 011.414 0z"
          />
        </svg>
      ),
      default: (
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {stepNumber}
        </div>
      ),
    };

    if (!iconType || !icons[iconType as keyof typeof icons]) {
      return icons.default;
    }

    return icons[iconType as keyof typeof icons];
  };

  const renderStep = (step: ProcessStep, index: number) => {
    const stepNumber = index + 1;
    const isLastStep = index === data.steps.length - 1;

    return (
      <div key={step.id || index} className="relative">
        {/* Step Content */}
        <div className="flex items-start gap-6">
          {/* Serial Number */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {stepNumber}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        </div>

        {/* Connecting Line (except for last step) */}
        {!isLastStep && data.layout !== "grid" && (
          <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-teal-200 to-emerald-200"></div>
        )}
      </div>
    );
  };

  const renderGridStep = (step: ProcessStep, index: number) => {
    const stepNumber = index + 1;

    return (
      <div key={step.id || index} className="text-center">
        {/* Serial Number */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {stepNumber}
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    );
  };

  if (!data.steps || data.steps.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: data.backgroundColor || "#f8f9fa" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(data.title || data.subtitle || data.description) && (
          <div className="text-center mb-16">
            {data.title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-xl text-teal-600 font-semibold mb-6">
                {data.subtitle}
              </p>
            )}
            {data.description && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {data.description}
              </p>
            )}
          </div>
        )}

        {/* Process Steps */}
        <div className="relative">
          {data.layout === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12">
              {data.steps.map((step, index) => renderGridStep(step, index))}
            </div>
          ) : data.layout === "horizontal" ? (
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {data.steps.map((step, index) => (
                <div key={step.id || index} className="flex-1">
                  {renderGridStep(step, index)}
                </div>
              ))}
            </div>
          ) : (
            // Vertical layout (default)
            <div className="max-w-4xl mx-auto">
              {data.steps.map((step, index) => renderStep(step, index))}
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-teal-400/5 to-emerald-400/5 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}

// Default data for Contract Packing process
export const defaultContractPackingProcess: ProcessStepsData = {
  title: "How It Works",
  subtitle: "Simple Process Steps",
  description:
    "Brief process steps so prospective clients know what to expect:",
  steps: [
    {
      id: 1,
      title: "Contact & Consultation",
      description:
        "You share your product formula or brief; we discuss packaging wants, volumes, options.",
    },
    {
      id: 2,
      title: "Quote & Sample",
      description:
        "We provide a detailed quote + mock-up or sample packaging (if needed).",
    },
    {
      id: 3,
      title: "Production & QC",
      description:
        "Ingredient sourcing, blending, filling, labelling, all under our quality protocols.",
    },
    {
      id: 4,
      title: "Delivery / Dispatch",
      description: "Finished products packaged, labelled, and shipped to you.",
    },
    {
      id: 5,
      title: "Ongoing Support",
      description:
        "We assist with reorders, packaging adjustments, compliance, and scaling.",
    },
  ],
  layout: "vertical",
  showNumbers: true,
  showIcons: false,
  backgroundColor: "#f8f9fa",
};
