import { LegalCase } from '../types';
import { clusters } from './clusters';

function generateRandomOffset(): [number, number, number] {
  // Increased spread for more mixing between clusters
  const spread = 25;
  return [
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
  ];
}

function addVectors(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

const caseTemplates = {
  'Constitutional Rights': [
    'Freedom of Speech Case',
    'Equal Rights Dispute',
    'Voting Rights Challenge',
    'Privacy Rights Violation',
    'Religious Freedom Case',
    'Civil Rights Matter',
    'Due Process Appeal',
    'First Amendment Case',
    'Equal Protection Claim',
    'Constitutional Challenge',
  ],
  'Corporate Law': [
    'Merger Acquisition Dispute',
    'Shareholder Rights Case',
    'Securities Fraud',
    'Corporate Governance',
    'Bankruptcy Proceedings',
    'Antitrust Violation',
    'Board Responsibility',
    'Insider Trading',
    'Contract Breach',
    'Fiduciary Duty',
  ],
  'Criminal Law': [
    'State v.',
    'People v.',
    'Criminal Appeal',
    'Evidence Suppression',
    'Sentencing Review',
    'Habeas Corpus',
    'Double Jeopardy',
    'Miranda Rights',
    'Search and Seizure',
    'Self Defense',
  ],
  'Environmental': [
    'Clean Water Act Violation',
    'Emissions Standards Case',
    'Wildlife Protection',
    'Chemical Disposal Dispute',
    'Land Conservation',
    'Air Quality Control',
    'Endangered Species',
    'Wetland Preservation',
    'Pollution Control',
    'Environmental Impact',
  ],
  'Intellectual Property': [
    'Patent Infringement',
    'Trademark Dispute',
    'Copyright Violation',
    'Trade Secret Case',
    'Design Patent',
    'Software Patent',
    'Fair Use Dispute',
    'IP Licensing',
    'Digital Rights',
    'Brand Protection',
  ],
};

export function generateCases(count: number): LegalCase[] {
  const cases: LegalCase[] = [];
  const casesPerCluster = Math.floor(count / clusters.length);

  clusters.forEach((cluster) => {
    const templates = caseTemplates[cluster.name as keyof typeof caseTemplates];
    
    for (let i = 0; i < casesPerCluster; i++) {
      const templateIndex = Math.floor(Math.random() * templates.length);
      const baseTitle = templates[templateIndex];
      const position = addVectors(cluster.center, generateRandomOffset());
      
      cases.push({
        id: `${cluster.name}-${i}`,
        title: `${baseTitle} ${Math.floor(Math.random() * 9999) + 1}`,
        summary: `Notable ${cluster.name.toLowerCase()} case with significant implications for ${templates[Math.floor(Math.random() * templates.length)].toLowerCase()}`,
        year: Math.floor(Math.random() * 20) + 2005,
        category: cluster.name,
        position,
        color: cluster.color,
        cluster: cluster.name,
      });
    }
  });

  return cases;
}