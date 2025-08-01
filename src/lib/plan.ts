/**
 * Utility functions for plan-related business logic
 */

import type { Plan } from '@/types/commerce';

/**
 * Determine if a plan should be marked as popular
 * @param planType The type of plan
 * @returns True if the plan should show popular badge
 */
export function isPlanPopular(planType: string): boolean {
  return planType === 'unlimited';
}

/**
 * Determine if a plan is new
 * @param plan The plan object
 * @returns True if the plan is new
 */
export function isPlanNew(plan: Plan): boolean {
  return Boolean(plan.isNew);
}

/**
 * Generate formatted features list for plan display
 * @param plan The plan object
 * @returns Array of formatted feature strings
 */
export function formatPlanFeatures(plan: Plan): string[] {
  return [
    `${plan.data} Data`,
    `${plan.hotspot} Mobile Hotspot`,
    ...plan.streaming,
    plan.contract_required ? 'Contract Required' : 'No Contract Required',
    `${plan.network_priority.charAt(0).toUpperCase() + plan.network_priority.slice(1)} Network Priority`
  ];
}

/**
 * Format network priority for display
 * @param priority The network priority value
 * @returns Capitalized priority string
 */
export function formatNetworkPriority(priority: string): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}