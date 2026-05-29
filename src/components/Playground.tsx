/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FORGE_FILES_DATA } from '../data';
import { VirtualFile, QueryResult, GovernanceRule, TransitionConfig } from '../types';
import { 
  Play, ShieldCheck, AlertTriangle, Terminal, Cpu, FileCode, CheckCircle, 
  HelpCircle, RefreshCw, Key, ExternalLink, RefreshCw as LoopIcon, Lock, Search, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlaygroundProps {
  config: TransitionConfig;
  activeRules: GovernanceRule[];
}

export default function Playground({ config, activeRules }: PlaygroundProps) {
  const [selectedFile, setSelectedFile] = useState<VirtualFile>(FORGE_FILES_DATA[0]);
  const [queryText, setQueryText] = useState<string>('What is the rebranding audit strategy from legacy FORGE to ' + config.targetBrand + '?');
  const [loading, setLoading] = useState<boolean>(false);
  const [simulateFailover, setSimulateFailover] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);

  // Quick query runners
  const PRESETS = [
    { label: 'Branding Check', query: `What is the rebranding audit strategy from legacy FORGE to ${config.targetBrand}?` },
    { label: 'metadata.json Audit', query: 'Auditing the metadata.json structure for competition readiness.' },
    { label: 'README Setup Plan', query: `Outline the recommended README.md setup for ${config.targetBrand}.` },
    { label: 'Integrity Check', query: 'Show files marked for ARCHIVE and verify containment safeguards.' }
  ];

  const handleQuery = async (inputQuery: string = queryText) => {
    if (!inputQuery.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: inputQuery,
          activeRules: activeRules.filter(r => r.enabled).map(r => r.name),
          config,
          simulateFailover
        })
      });
      const data = await response.json();
      setQueryResult(data);
    } catch (err) {
      console.error("Query failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="sandbox-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* LEFT COLUMN: VIRTUAL FILES & CONFIG SELECTION (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        
        {/* Workspace Indexer */}
        <div className="bg-white border border-zinc-200 rounded p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-205">
            <div className="flex items-center gap-2">
              <Cpu className="text-zinc-900 w-4.5 h-4.5" />
              <h3 className="font-display font-medium text-xs text-zinc-900 font-bold uppercase tracking-tight">Indexed Workspace Context</h3>
            </div>
            <span className="text-[9px] font-mono bg-zinc-900 text-white px-2 py-0.5 rounded shadow-xs">
              Active Sync
            </span>
          </div>

          <p className="text-[11px] text-zinc-500 mt-2 mb-3">
            Select a repository file from the index registry to inspect content and code-level governance status:
          </p>

          <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
            {FORGE_FILES_DATA.map((file) => {
              const isSelected = file.path === selectedFile.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left text-xs p-2 rounded transition flex items-center justify-between font-mono cursor-pointer ${
                    isSelected 
                      ? 'bg-zinc-900 text-white border-l-2 border-zinc-950 pl-3 shadow' 
                      : 'bg-zinc-50 border border-zinc-150 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`} />
                    <span className="truncate">{file.name}</span>
                  </div>
                  
                  <span className={`text-[8px] px-1.5 py-0.2 rounded border ${
                    file.status === 'retain' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' 
                      : file.status === 'archive'
                      ? 'bg-red-50 border-red-200 text-red-800 font-bold'
                      : 'bg-amber-50 border-amber-200 text-amber-805 font-bold'
                  }`}>
                    {file.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected file detail panel */}
        <div className="bg-white border border-zinc-200 rounded p-4 text-xs shadow-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200">
            <span className="font-mono text-zinc-900 font-bold text-[10px] truncate max-w-[200px]">{selectedFile.path}</span>
            <span className="text-[10px] font-mono text-zinc-400">{selectedFile.size}</span>
          </div>
          <p className="text-zinc-600 leading-relaxed text-[11px] mb-3">{selectedFile.description}</p>
          
          <div className="bg-zinc-50 p-2.5 rounded border border-zinc-150 font-mono text-[10px] text-zinc-800 max-h-[160px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{selectedFile.content}</pre>
          </div>
          
          {selectedFile.status === 'archive' && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 text-red-800 text-[10px] rounded flex items-center gap-2 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-red-650" />
              <span>Safety Rule triggered: Pruned from active context list to avoid leakage logs.</span>
            </div>
          )}
        </div>

      </div>

      {/* RIGHT COLUMN: CORE PLAYGROUND SANDBOX (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6">

        {/* Dynamic Query Console */}
        <div className="bg-white border border-zinc-200 rounded p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <Terminal className="text-zinc-900 w-5 h-5" />
              <h3 className="font-display font-medium text-xs text-zinc-900 font-bold uppercase tracking-tight">Evaluator Query & Reasoning Gateway</h3>
            </div>
            
            {/* Fault-tolerant switch */}
            <label className="flex items-center gap-2 cursor-pointer group text-[11px]">
              <span className="text-zinc-500 group-hover:text-zinc-850">Simulate Failover Limit (Fallback Routing)</span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={simulateFailover}
                  onChange={(e) => setSimulateFailover(e.target.checked)}
                  className="sr-only" 
                />
                <div className={`w-8 h-4 rounded-full transition-colors ${simulateFailover ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
                  <div className={`absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full transition-transform ${simulateFailover ? 'transform translate-x-4' : ''}`} />
                </div>
              </div>
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">Preset Evaluation Templates</span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQueryText(p.query);
                      handleQuery(p.query);
                    }}
                    className="px-2.5 py-1 text-[11px] rounded bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                id="query-input"
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                placeholder="Enter workspace query or pattern to retrieve with attribution logs..."
                className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 pr-12 text-xs font-mono text-zinc-900 outline-none focus:border-zinc-500 focus:bg-white"
              />
              <button
                onClick={() => handleQuery()}
                disabled={loading}
                className="absolute right-2 top-2 p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-400 text-white hover:scale-105 transition duration-150 cursor-pointer shadow-xs"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Result & Evaluation Telemetry Section */}
        <AnimatePresence mode="wait">
          {queryResult ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* PRIMARY COGNITIVE RESPONSE */}
              <div className="bg-white border border-zinc-200 rounded p-5 shadow-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                  System Context Retrieval Output
                </span>
                <div className="prose prose-zinc max-w-none text-xs text-zinc-800 leading-relaxed font-sans bg-zinc-50 p-4 rounded border border-zinc-150 max-h-[400px] overflow-y-auto">
                  <div className="markdown-body">
                    {/* Rendered markdown simply */}
                    {queryResult.responseText.split('\n').map((line, idx) => {
                      if (line.startsWith('###')) {
                        return <h4 key={idx} className="text-sm font-extrabold text-zinc-950 mt-4 mb-2 first:mt-0 font-display">{line.replace('###', '')}</h4>;
                      }
                      if (line.startsWith('-')) {
                        return <li key={idx} className="list-disc ml-4 my-1 text-zinc-700">{line.replace('-', '')}</li>;
                      }
                      return <p key={idx} className="my-1.5">{line}</p>;
                    })}
                  </div>
                </div>
              </div>

              {/* DUAL CO-COLS METRICS (Audit & Provenance) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* METRIC CARD 1: Governance Status & Compliance Report */}
                <div className="bg-white border border-zinc-200 rounded p-4 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 mb-3 border-b border-zinc-200">
                    <ShieldCheck className="text-emerald-555 w-4.5 h-4.5" />
                    <h4 className="font-display font-medium text-xs text-zinc-900">Compliance & Policy Gate</h4>
                  </div>
                  
                  <div className="space-y-3 font-mono text-[10px]">
                    <div className="flex justify-between items-center bg-zinc-50 border border-zinc-150 p-2 rounded">
                      <span className="text-zinc-500">Structure Compliance Rate:</span>
                      <span className={`font-bold ${queryResult.governanceReport.complianceScore === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {queryResult.governanceReport.complianceScore}% Passed
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] uppercase text-zinc-400 font-bold block">Enforced System Rules ({queryResult.governanceReport.appliedRulesCount})</span>
                      <div className="max-h-[120px] overflow-y-auto space-y-1">
                        {queryResult.governanceReport.passedRules.map((rule, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-zinc-700 py-0.5">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                            <span className="truncate">{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* METRIC CARD 2: Provenance & Immutable Custody Chain */}
                <div className="bg-white border border-zinc-200 rounded p-4 shadow-xs">
                  <div className="flex items-center gap-2 pb-2 mb-3 border-b border-zinc-200">
                    <Lock className="text-zinc-900 w-4.5 h-4.5" />
                    <h4 className="font-display font-medium text-xs text-zinc-900 font-bold uppercase tracking-tight">Provenance Chain of Custody</h4>
                  </div>

                  <div className="space-y-2 font-mono text-[10px]">
                    <div>
                      <span className="text-[9px] uppercase text-zinc-400 block font-bold">Integrity Proof Tag (SHA-256)</span>
                      <span className="text-zinc-800 font-bold block bg-zinc-50 p-1.5 rounded truncate text-[9px] border border-zinc-150 mt-1">
                        {queryResult.provenanceChain.signedHash}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] uppercase text-zinc-400 block font-bold">Attribution Sources Cited</span>
                      <div className="flex flex-wrap gap-1">
                        {queryResult.provenanceChain.referencedFiles.map((file, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200 text-[8px] truncate">
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 mt-1">
                      <span className="text-[9px] uppercase text-zinc-400 block font-bold">Verification Logs</span>
                      <div className="max-h-[80px] overflow-y-auto space-y-1 text-zinc-750 text-[8px]">
                        {queryResult.provenanceChain.retrievalSteps.slice(0, 3).map((step, idx) => (
                          <div key={idx} className="truncate">
                            &gt; {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* TIMEOUT ROUTER SYSTEM TELEMETRY */}
              <div className="bg-white border border-zinc-200 rounded p-3 text-[11px] font-mono flex flex-col md:flex-row justify-between items-start md:items-center gap-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${simulateFailover ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <span className="text-zinc-500 font-bold">Path Routing Resolves:</span>
                  <span className="text-zinc-900 font-bold">{queryResult.fallbackLog.pathType}</span>
                </div>
                <div className="text-zinc-500">
                  Notes: <span className="text-zinc-700 italic">{queryResult.fallbackLog.routingNotes}</span>
                </div>
                <div className="text-zinc-500">
                  Latency: <span className="text-emerald-600 font-bold">{queryResult.fallbackLog.durationMs}ms</span>
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="py-24 border border-dashed border-zinc-200 rounded bg-white text-center flex flex-col items-center justify-center shadow-xs">
              <Search className="w-12 h-12 text-zinc-350 mb-2" />
              <h4 className="font-display font-medium text-zinc-700 text-xs font-bold uppercase tracking-wider">Awaiting Cognitive Verification Transaction</h4>
              <p className="text-[11px] text-zinc-500 max-w-sm mt-1 px-4">
                Enter a custom evaluation query above, or execute a Preset Template to verify rebranding, schema validation, and audit traces.
              </p>
            </div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
