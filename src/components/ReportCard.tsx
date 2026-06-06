/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scenario, Difficulty, TroubleshootingLog } from '../types';
import { CheckCircle, AlertTriangle, Clock, Award, ChevronRight, Bookmark, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

interface ReportCardProps {
  scenario: Scenario | null;
  difficulty: Difficulty;
  score: number;
  timeSpent: number;
  logs: TroubleshootingLog[];
  onNext: () => void;
  onReturnToDashboard: () => void;
  metrics: {
    stepAdherence: number;
    accuracy: number;
    efficiency: number;
  };
}

export default function ReportCard({
  scenario,
  difficulty,
  score,
  timeSpent,
  logs,
  onNext,
  onReturnToDashboard,
  metrics
}: ReportCardProps) {
  if (!scenario) return null;

  // Count unnecessary steps
  const totalActions = logs.length;
  const wrongActions = logs.filter(log => log.scorePenalty > 0);

  // Score color helper
  const getScoreColor = (num: number) => {
    if (num >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
    if (num >= 75) return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
    return 'text-rose-400 border-rose-500/30 bg-rose-950/20';
  };

  return (
    <motion.div
      id="report-card-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-8"
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800" id="report-header">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 px-2 py-1 bg-emerald-950/40 border border-emerald-900/50 rounded-md">
            Case Resolved Successful
          </span>
          <h2 className="text-2xl font-bold font-sans text-slate-100 mt-2">
            Ticket #{scenario.ticket.id}: {scenario.ticket.clientName}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Subsystem: <span className="text-slate-200 font-medium">{scenario.subsystem}</span> • Difficulty: <span className="text-slate-200 font-medium uppercase text-xs">{difficulty}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs bg-slate-800/80 text-slate-300 font-mono px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {timeSpent} mins spent
          </span>
          <span className="text-xs bg-slate-800/80 text-slate-300 font-mono px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-500" /> {totalActions} actions taken
          </span>
        </div>
      </div>

      {/* Score Circle & Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" id="score-metrics">
        {/* Score Ring */}
        <div className="flex flex-col items-center justify-center py-6 bg-slate-950/40 border border-slate-800/80 rounded-xl">
          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                className={`transition-all duration-1000 ease-out ${
                  score >= 90 ? 'stroke-emerald-500' : score >= 75 ? 'stroke-amber-500' : 'stroke-rose-500'
                }`}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 64}
                strokeDashoffset={2 * Math.PI * 64 * (1 - score / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-extrabold font-mono text-slate-50">{score}</span>
              <span className="text-xs font-medium text-slate-400 block">out of 100</span>
            </div>
          </div>
          <p className="text-sm font-semibold mt-4 text-slate-200">
            {score >= 90 ? 'Expert Efficiency!' : score >= 75 ? 'Competent Tech' : 'Needs Review'}
          </p>
        </div>

        {/* Metrics details */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">CompTIA grading parameters</h3>
          <div className="space-y-3.5">
            {/* Step Adherence */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-medium">Troubleshooting Methodology Adherence</span>
                <span className="font-mono font-bold text-slate-100">{metrics.stepAdherence}%</span>
              </div>
              <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${metrics.stepAdherence}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Measures sequence compliance from Identifying problem down to documenting results.
              </p>
            </div>

            {/* Diagnostic Accuracy */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-medium">Theory & Testing Accuracy</span>
                <span className="font-mono font-bold text-slate-100">{metrics.accuracy}%</span>
              </div>
              <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${metrics.accuracy}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Reflects choosing correct theories and corroborating them over guesswork.
              </p>
            </div>

            {/* Path Efficiency */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-medium">Hardware Action Efficiency</span>
                <span className="font-mono font-bold text-slate-100">{metrics.efficiency}%</span>
              </div>
              <div className="w-full bg-slate-850 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${metrics.efficiency}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Penalizes unnecessary high-cost physical component replacements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Details Card */}
      <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-6 space-y-4" id="educational-review">
        <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-emerald-400" /> Educational Case Review
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Identified Root Cause:</span>
            <span className="text-slate-200 font-semibold text-sm">{scenario.hiddenRootCause.component}</span>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">{scenario.hiddenRootCause.shortDescription}</p>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-1 uppercase font-bold text-[10px]">Applied Resolution:</span>
            <span className="text-slate-200 font-semibold text-sm">{scenario.hiddenRootCause.correctPlan.replace('_', ' ').toUpperCase()}</span>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">Required to restore complete system operations.</p>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-slate-400 uppercase font-bold text-[10px] block">CompTIA Exam Context & Explanation:</span>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">{scenario.explanation}</p>
        </div>

        {/* Objectives */}
        <div className="pt-2">
          <span className="text-slate-400 uppercase font-bold text-[10px] block mb-1.5">CompTIA Objectives Covered:</span>
          <div className="flex flex-wrap gap-2">
            {scenario.comptiaObjectives.map((obj, i) => (
              <span key={i} className="text-xs bg-slate-900 text-slate-300 px-3 py-1 border border-slate-800 rounded-md">
                {obj}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Logs Summary Timeline */}
      <div className="space-y-4" id="action-timeline-summary">
        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-sky-400" /> Resolution Action Timeline
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-800/80 bg-slate-950/20 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                <th className="p-3">#</th>
                <th className="p-3">CompTIA Step</th>
                <th className="p-3">Action Executed</th>
                <th className="p-3">System Feedback Response</th>
                <th className="p-3 text-right">Penalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {logs.map((log, index) => (
                <tr key={index} className={`hover:bg-slate-900/30 transition-colors ${log.scorePenalty > 0 ? 'bg-rose-950/10' : ''}`}>
                  <td className="p-3 font-mono text-slate-500">{index + 1}</td>
                  <td className="p-3 font-mono text-xs">
                    <span className="text-sky-300 font-medium">Step {log.step}</span>
                  </td>
                  <td className="p-3 font-medium text-slate-200">{log.actionLabel}</td>
                  <td className="p-3 text-slate-400 max-w-sm cut-text">{log.response}</td>
                  <td className="p-3 text-right font-mono font-medium">
                    {log.scorePenalty > 0 ? (
                      <span className="text-rose-400">-{log.scorePenalty} pts</span>
                    ) : (
                      <span className="text-emerald-400">0</span>
                    )}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500 italic">No actions logged in timeline.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Guidance / Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800" id="report-footer-actions">
        <button
          onClick={onReturnToDashboard}
          className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 active:bg-slate-750 text-slate-200 font-bold px-6 py-3 rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
        >
          Return to Dashboard
        </button>

        <button
          onClick={onNext}
          className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-bold px-6 py-3 rounded-lg transition-all duration-150 flex items-center justify-center gap-1 shadow-lg shadow-emerald-950/40 cursor-pointer"
        >
          Begin Next Scenario <ChevronRight className="w-5 h-5 text-slate-950" />
        </button>
      </div>
    </motion.div>
  );
}
