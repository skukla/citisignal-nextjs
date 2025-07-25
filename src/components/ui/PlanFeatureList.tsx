'use client';

interface PlanFeatureListProps {
  data: string;
  hotspot: string;
  streaming: string[];
  contractRequired: boolean;
  networkPriority: string;
}

export default function getPlanFeatures({
  data,
  hotspot,
  streaming,
  contractRequired,
  networkPriority
}: PlanFeatureListProps): string[] {
  return [
    `${data} Data`,
    `${hotspot} Mobile Hotspot`,
    ...streaming,
    contractRequired ? 'Contract Required' : 'No Contract Required',
    `${networkPriority.charAt(0).toUpperCase() + networkPriority.slice(1)} Network Priority`
  ];
} 