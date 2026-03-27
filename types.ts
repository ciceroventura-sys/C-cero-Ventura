
import React from 'react';

export type PilotType = string | null;

export interface GameState {
  stage: number;
  pilot: PilotType;
  showError: boolean;
  introText: string;
  outroText: string;
  isLoadingAI: boolean;
}

export interface DecisionOption {
  text: string;
  isCorrect: boolean;
}

export interface StageConfig {
  id: number;
  type: 'intro' | 'pilot' | 'launch' | 'alert' | 'decision' | 'success' | 'final' | 'cabin';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  options?: DecisionOption[];
  nextStage?: number;
  variant?: 'primary' | 'alert' | 'success' | 'neutral';
}
