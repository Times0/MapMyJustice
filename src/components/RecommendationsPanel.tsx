import { useState, useRef, useEffect } from "react";
import { Calendar, Tag, ChevronRight, ChevronLeft, Filter, ChevronDown, ChevronUp } from "lucide-react";

interface RecommendationsPanelProps {
  prompt: string;
}

// Updated recommendations data
const recommendations = [
  {
    id: 1,
    title: "Environmental Emergency v. Local Government",
    summary:
      "Landmark case establishing precedents for government responsibility in waste management crises. The court ruled on the extent of local authorities' obligations during environmental emergencies, particularly regarding public health and safety measures.",
    date: "2023-05-15",
    category: "Environmental Law",
    relevanceScore: 0.95,
    country: "Italy",
    article: "Article 8",
  },
  {
    id: 2,
    title: "Citizens' Coalition v. Waste Management Authority",
    summary:
      "Class action lawsuit challenging the government's handling of a prolonged waste disposal crisis. Set new standards for accountability and transparency in environmental crisis management.",
    date: "2023-08-22",
    category: "Public Health",
    relevanceScore: 0.89,
    country: "Greece",
    article: "Article 3",
  },
  {
    id: 3,
    title: "Landfill Operators Association v. Environmental Regulator",
    summary:
      "Dispute over the closure and reopening of waste disposal facilities during an environmental crisis. Resulted in significant clarification of regulatory powers and environmental safety standards for waste management facilities.",
    date: "2023-11-03",
    category: "Administrative Law",
    relevanceScore: 0.87,
    country: "Spain",
    article: "Article 6",
  },
  {
    id: 4,
    title: "State v. Negligent Waste Disposal Operators",
    summary:
      "Criminal case involving private waste management companies accused of environmental violations. The court established a framework for determining criminal liability under EU environmental regulations.",
    date: "2023-09-30",
    category: "Criminal Environmental Law",
    relevanceScore: 0.84,
    country: "France",
    article: "Article 2",
  },
  {
    id: 5,
    title: "Residents v. Municipal Authorities",
    summary:
      "Civil case focusing on the right to a healthy environment and government's duty to protect. Created new precedents for citizens' rights and state obligations during prolonged environmental crises.",
    date: "2023-12-15",
    category: "Human Rights",
    relevanceScore: 0.82,
    country: "Romania",
    article: "Article 8",
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
