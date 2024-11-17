import { useState, useRef, useEffect } from "react";
import { Calendar, Tag, ChevronRight, ChevronLeft, Filter, ChevronDown, ChevronUp } from "lucide-react";

interface RecommendationsPanelProps {
  prompt: string;
}

// Fake recommendations data
const recommendations = [
  {
    id: 1,
    title: "Schmidt v. Digital Privacy GmbH",
    summary:
      "Landmark case establishing new precedents for data privacy in the digital age. The European Court of Justice ruled in favor of strengthening individual privacy rights under GDPR in relation to AI-powered surveillance systems.",
    date: "2023-05-15",
    category: "Constitutional Rights",
    relevanceScore: 0.95,
    country: "Germany",
    article: "Article 1",
  },
  {
    id: 2,
    title: "Green Europe Alliance v. TechGiant PLC",
    summary:
      "Groundbreaking environmental lawsuit challenging tech companies' data center emissions. Set new standards for corporate environmental responsibility under the European Green Deal framework.",
    date: "2023-08-22",
    category: "Environmental",
    relevanceScore: 0.89,
    country: "United Kingdom",
    article: "Article 3",
  },
  {
    id: 3,
    title: "Neural Networks Patent Dispute",
    summary:
      "Major patent infringement case involving AI neural network architectures. Resulted in significant clarification of intellectual property rights under the European Patent Convention for artificial intelligence innovations.",
    date: "2023-11-03",
    category: "Intellectual Property",
    relevanceScore: 0.87,
    country: "France",
    article: "Article 5",
  },
  {
    id: 4,
    title: "State v. AutoDrive Systems",
    summary:
      "Criminal liability case involving autonomous vehicle accidents. The court established a framework for determining criminal responsibility under EU transportation and AI regulations.",
    date: "2023-09-30",
    category: "Criminal Law",
    relevanceScore: 0.84,
    country: "Netherlands",
    article: "Article 2",
  },
  {
    id: 5,
    title: "AI Merger Oversight Case",
    summary:
      "Corporate merger case focusing on AI market concentration. Created new precedents for antitrust evaluation under European Commission competition law for AI-focused corporate consolidations.",
    date: "2023-12-15",
    category: "Corporate Law",
    relevanceScore: 0.82,
    country: "Belgium",
    article: "Article 7",
  },
];


const countries = [...new Set(recommendations.map((rec) => rec.country))];
const articles = Array.from({ length: 8 }, (_, i) => `Article ${i + 1}`);

export function RecommendationsPanel({ prompt }: RecommendationsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [isPromptExpanded, setIsPromptExpanded] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const togglePrompt = () => {
    setIsPromptExpanded(!isPromptExpanded);
  };

  const filteredRecommendations = recommendations.filter(
    (rec) =>
      (!selectedCountry || rec.country === selectedCountry) &&
      (!selectedArticle || rec.article === selectedArticle)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-4 right-0 h-[calc(100vh-2rem)] bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 ${
        isExpanded ? "w-96" : "w-12"
      } overflow-hidden`}
    >
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/90 p-2 rounded-l-md cursor-pointer"
        onClick={togglePanel}
      >
        {isExpanded ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </div>
      {isExpanded && (
        <div className="p-4 h-full overflow-y-auto">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              Most Relevant Cases
            </h2>
            <div className="relative" ref={filterRef}>
              <button
                onClick={toggleFilter}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
              </button>
              {isFilterExpanded && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-4">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">
                    Filters
                  </h3>
                  <div className="flex flex-col gap-2">
                    <select
                      className="p-2 border rounded text-sm"
                      value={selectedCountry || ""}
                      onChange={(e) =>
                        setSelectedCountry(e.target.value || null)
                      }
                    >
                      <option value="">All Countries</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <select
                      className="p-2 border rounded text-sm"
                      value={selectedArticle || ""}
                      onChange={(e) =>
                        setSelectedArticle(e.target.value || null)
                      }
                    >
                      <option value="">All Articles</option>
                      {articles.map((article) => (
                        <option key={article} value={article}>
                          {article}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={togglePrompt}
            >
              <p className="text-sm text-gray-600">Based on your search:</p>
              {isPromptExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              )}
            </div>
            {isPromptExpanded && (
              <p className="text-sm text-gray-800 italic mt-1">"{prompt}"</p>
            )}
          </div>
          <div className="space-y-4">
            {filteredRecommendations.map((rec) => (
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
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Filter className="w-4 h-4" />
                    {rec.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {rec.article}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
