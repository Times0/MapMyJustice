import React from "react";
import { Calendar, Tag } from "lucide-react";

interface RecommendationsPanelProps {
  prompt: string;
}

// Fake recommendations data
const recommendations = [
  {
    id: 1,
    title: "Smith v. Digital Privacy Corp",
    summary:
      "Landmark case establishing new precedents for data privacy in the digital age. The court ruled in favor of strengthening individual privacy rights in relation to AI-powered surveillance systems.",
    date: "2023-05-15",
    category: "Constitutional Rights",
    relevanceScore: 0.95,
  },
  {
    id: 2,
    title: "Environmental Alliance v. TechGiant Inc",
    summary:
      "Groundbreaking environmental lawsuit challenging tech companies' data center emissions. Set new standards for corporate environmental responsibility in the digital infrastructure sector.",
    date: "2023-08-22",
    category: "Environmental",
    relevanceScore: 0.89,
  },
  {
    id: 3,
    title: "Neural Networks Patent Dispute",
    summary:
      "Major patent infringement case involving AI neural network architectures. Resulted in significant clarification of intellectual property rights in artificial intelligence innovations.",
    date: "2023-11-03",
    category: "Intellectual Property",
    relevanceScore: 0.87,
  },
  {
    id: 4,
    title: "State v. AutoDrive Systems",
    summary:
      "Criminal liability case involving autonomous vehicle accidents. Established framework for determining criminal responsibility in AI-driven transportation incidents.",
    date: "2023-09-30",
    category: "Criminal Law",
    relevanceScore: 0.84,
  },
  {
    id: 5,
    title: "AI Merger Oversight Case",
    summary:
      "Corporate merger case focusing on AI market concentration. Created new precedents for antitrust evaluation of AI-focused corporate consolidations.",
    date: "2023-12-15",
    category: "Corporate Law",
    relevanceScore: 0.82,
  },
];

export function RecommendationsPanel({ prompt }: RecommendationsPanelProps) {
  return (
    <div className="absolute top-4 right-4 w-96 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">Most Relevant Cases</h2>
        <p className="text-sm text-gray-600 mt-1">Based on your search:</p>
        <p className="text-sm text-gray-800 italic mt-1">"{prompt}"</p>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:border-blue-200 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-800">{rec.title}</h3>
              <span className="text-sm text-blue-600 font-medium">
                {(rec.relevanceScore * 100).toFixed(0)}% match
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{rec.summary}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(rec.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {rec.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
