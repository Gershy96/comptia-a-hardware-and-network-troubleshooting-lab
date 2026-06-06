/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = 'beginner' | 'intermediate' | 'exam';

export type SubsystemType = 
  | 'Motherboard' 
  | 'RAM' 
  | 'CPU' 
  | 'Power Supply' 
  | 'Storage' 
  | 'Display' 
  | 'Printer' 
  | 'Mobile Device' 
  | 'Network';

export interface DeviceSpec {
  cpu: string;
  motherboard: string;
  ram: string;
  gpu: string;
  psu: string;
  storage: string;
  os: string;
}

export interface SupportTicket {
  id: string;
  clientName: string;
  userDepartment: string;
  assetTag: string;
  role: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  submittedTime: string;
  description: string;
}

export interface HiddenRootCause {
  component: string;
  shortDescription: string;
  detailedCause: string;
  possibleTheories: string[]; // Options for Step 2
  correctTheory: string;      // The actual right theory
  requiredTests: string[];    // Action IDs in Step 3 that confirm theory
  correctPlan: string;        // Correct action in Step 4
  correctVerification: string;// Correct verification in Step 5
  correctPreventive: string;  // Correct preventive in Step 5
}

export interface Scenario {
  id: string;
  title: string;
  subsystem: SubsystemType;
  difficultyRating: 'Easy' | 'Medium' | 'Hard';
  ticket: SupportTicket;
  specification: DeviceSpec;
  hiddenRootCause: HiddenRootCause;
  symptoms: string[];
  actionResponses: Record<string, {
    text: string;
    revealsRootCause?: boolean;
    isClue?: boolean;
    damagesHardware?: boolean;
  }>;
  explanation: string;
  comptiaObjectives: string[];
}

export type TroubleshootingStepNumber = 1 | 2 | 3;

export interface TroubleshootingLog {
  timestamp: Date;
  step: TroubleshootingStepNumber;
  actionId: string;
  actionLabel: string;
  response: string;
  scorePenalty: number;
}

export interface SimulationState {
  currentScenario: Scenario | null;
  difficulty: Difficulty;
  isHintEnabled: boolean;
  score: number;
  timeSpentMinutes: number;
  currentStep: TroubleshootingStepNumber;
  selectedTheory: string | null;
  theoryTestedAndConfirmed: boolean;
  solutionImplemented: boolean;
  verificationDone: boolean;
  preventiveDone: boolean;
  documentationCompleted: boolean;
  actionLogs: TroubleshootingLog[];
  completedScenariosCount: number;
  casesHistory: {
    scenarioId: string;
    score: number;
    difficulty: Difficulty;
    timeSpent: number;
    stepAdherence: number; // 0-100%
    accuracy: number;     // 0-100%
    efficiency: number;   // 0-100%
    timestamp: Date;
  }[];
}

export interface Action {
  id: string;
  label: string;
  category: 'visual' | 'hardware' | 'software_bios' | 'testing';
  timeMinutes: number;
  comptiaStep: number;
  hints?: string;
}
