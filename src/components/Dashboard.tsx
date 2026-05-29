/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { getBriefOutcomes, BriefOutcome } from '../data';
import { TransitionConfig } from '../types';
import { 
  Copy, Check, FileText, ArrowRight, ShieldCheck, 
  Layers, Settings, Inbox, Key, AlertTriangle, Play 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  config: TransitionConfig;
  onNavigateToSandbox: () => void;
}

export default function Dashboard({ config, onNavigateToSandbox }: DashboardProps) {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const outcomes = getBriefOutcomes(config);
  const activeOutcome = outcomes.find(o => o.id === selectedId) || outcomes[0];

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="dashboard-wrapper" className="space-y-6">
      
      {/* AETHER Core Definition & Suspension Layer Architecture */}
      <div id="aether-definition-card" className="bg-white border border-zinc-200 rounded p-5 shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-zinc-50 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20 opacity-60" />
        <div className="relative">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">System Identity & Context</span>
          <h2 className="text-xl font-display font-bold tracking-tight text-zinc-950 mt-1 flex items-center gap-2">
            AETHER <span className="text-zinc-300 font-light">//</span> THE SUSPENSION LAYER
          </h2>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed max-w-4xl mt-2">
            AETHER is the suspension environment of the system: the medium in which repositories, documents, specifications, datasets, policies, memories, and knowledge stores exist prior to active retrieval.
            Information remains available, indexed, and discoverable here until acted upon. 
            <span className="block mt-2 font-mono text-[11px] text-zinc-900 font-bold bg-zinc-50 border border-zinc-150 p-2.5 rounded italic">
              "AETHER is not the answer. AETHER is the field from which answers emerge."
            </span>
          </p>
          
          {/* Architecture Mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-zinc-150">
            <div className="p-3 bg-zinc-50/50 rounded border border-zinc-150">
              <span className="text-[9px] font-mono text-zinc-400 uppercase font-black tracking-wider block">01. Suspension Layer</span>
              <h4 className="text-xs font-bold text-zinc-900 mt-1 uppercase font-display">AETHER Holds</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                Does not govern, retrieve, or decide. Keeps all raw source assets and codebases structured.
              </p>
            </div>
            <div className="p-3 bg-zinc-50/50 rounded border border-zinc-150">
              <span className="text-[9px] font-mono text-zinc-400 uppercase font-black tracking-wider block">02. Dynamic Traversal</span>
              <h4 className="text-xs font-bold text-zinc-900 mt-1 uppercase font-display">HERMES Traverses</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                An active semantic and index-aware agent that traverses AETHER to catalog files and match context.
              </p>
            </div>
            <div className="p-3 bg-zinc-50/50 rounded border border-zinc-150">
              <span className="text-[9px] font-mono text-zinc-400 uppercase font-black tracking-wider block">03. Governance Gate</span>
              <h4 className="text-xs font-bold text-zinc-900 mt-1 uppercase font-display">OCTAGON Governs</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                Defines safety rules, licensing gates, and strict SHA-256 locks on what emerges out of AETHER.
              </p>
            </div>
            <div className="p-3 bg-zinc-50/50 rounded border border-zinc-150">
              <span className="text-[9px] font-mono text-zinc-400 uppercase font-black tracking-wider block">04. Action Core</span>
              <h4 className="text-xs font-bold text-zinc-900 mt-1 uppercase font-display">Operator Acts</h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed mt-1">
                The terminal operator reviews provenance chains and deploys clean verified outputs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="dashboard-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT PANEL: 10 OUTCOMES LIST (Surgical execution of user brief) */}
      <div id="brief-sidebar" className="lg:col-span-5 space-y-3">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h2 className="text-base font-display font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
              <Layers className="text-zinc-900 w-5 h-5" />
              Transition Outputs ({outcomes.length})
            </h2>
            <p className="text-xs text-zinc-500">Select an item to inspect its transition state</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 bg-white text-zinc-800 rounded border border-zinc-200 shadow-xs">
            {config.governanceLevel} Mode
          </span>
        </div>

        <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
          {outcomes.map((outcome) => {
            const isSelected = outcome.id === selectedId;
            return (
              <button
                key={outcome.id}
                id={`outcome-btn-${outcome.id}`}
                onClick={() => setSelectedId(outcome.id)}
                className={`w-full text-left p-3 rounded border transition-all duration-200 flex items-center justify-between group ${
                  isSelected 
                    ? 'bg-zinc-900 border-zinc-950 text-white shadow' 
                    : 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-emerald-400' : 'bg-zinc-300'
                  }`} />
                  <div>
                    <h3 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-955 group-hover:text-zinc-900'}`}>
                      {outcome.title}
                    </h3>
                    <p className={`text-[11px] line-clamp-1 mt-0.5 ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>{outcome.description}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                  isSelected 
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-200' 
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 group-hover:text-zinc-900'
                }`}>
                  {outcome.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="p-4 rounded bg-white border border-zinc-200 text-xs shadow-xs">
          <p className="text-zinc-900 font-bold mb-1">Verify Source Attribution</p>
          <p className="text-zinc-500 leading-relaxed mb-3">
            Run compliance policies and audit real-time provenance traces for {config.targetBrand} components.
          </p>
          <button
            onClick={onNavigateToSandbox}
            className="w-full py-2 bg-zinc-900 hover:bg-zinc-805 text-xs text-white font-bold rounded transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            Launch Auditing Sandbox
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: INSPECTOR & PAYLOAD CODE VIEWER */}
      <div id="brief-payload-inspector" className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="flex-1 bg-white border border-zinc-200 rounded p-5 flex flex-col justify-between overflow-hidden shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-250">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-1.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800 font-mono text-[11px] font-semibold">
                    OUTCOME_0{activeOutcome.id}
                  </span>
                  <h3 className="font-display font-bold text-zinc-900 text-base">
                    {activeOutcome.title}
                  </h3>
                </div>
                
                {activeOutcome.deliverablePayload && (
                  <button
                    onClick={() => handleCopy(activeOutcome.deliverablePayload || '', activeOutcome.id)}
                    className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-950 transition flex items-center gap-1.5 text-xs text-white cursor-pointer shadow-xs"
                    title="Copy payload to clipboard"
                  >
                    {copiedId === activeOutcome.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy Payload</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="mt-4">
                <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded border border-zinc-100 mb-4 font-sans italic">
                  {activeOutcome.details}
                </p>
                
                {activeOutcome.deliverablePayload ? (
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                      Deliverable Asset Payload Template
                    </span>
                    <div className="relative rounded overflow-hidden bg-zinc-900 border border-zinc-950 font-mono text-xs max-h-[380px] overflow-y-auto">
                      <pre className="p-4 text-zinc-200 whitespace-pre-wrap leading-relaxed select-all">
                        {activeOutcome.deliverablePayload}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center text-zinc-400 flex flex-col items-center justify-center">
                    <FileText className="w-12 h-12 text-zinc-300 mb-2" />
                    <p className="text-xs">No static code attachment for this milestone.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-150 flex items-center justify-between text-[11px] text-zinc-500">
              <span className="flex items-center gap-1 text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Valid under Apache 2.0 Licensing
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Verified Cryptographic Signature
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  </div>
  );
}
