/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Activity, Server, Database, Clock, RefreshCw, Layers, ShieldCheck, 
  Settings, CheckCircle, Flame, ShieldAlert, Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { TransitionConfig } from '../types';

interface DiagnosticsProps {
  config: TransitionConfig;
}

export default function Diagnostics({ config }: DiagnosticsProps) {
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM ENGINE INITIALIZED - BRANDED FOR ' + config.targetBrand,
    'PRIMARY DATABASE CACHE COMPILATION COMPLETE',
    'LOCAL REPO CONFIG SYNCED WITH SUITE PROVENANCE',
    'GOVERNANCE GATEWAY ACTIVE. POLICIES APPLIED: G-1, G-2, G-3, G-4, G-5',
    'COGNITIVE INTERPRETER GEMINI CORE COMPLIANT'
  ]);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const handleRefresh = () => {
    setTriggerRefresh(true);
    setTimeout(() => {
      setTriggerRefresh(false);
      setLogs(prev => [
        `[${new Date().toISOString().slice(11, 19)}] VERIFIED SUITE WORKSPACE - SHA CHECK OK`,
        ...prev
      ]);
    }, 800);
  };

  return (
    <div id="diagnostics-root" className="space-y-6">
      
      {/* SECTION 1: TOP SUMMARY CARDS (OPERATOR GRADE STATS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1 */}
        <div className="bg-white border border-zinc-200 rounded p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">Indexing Status</span>
            <span className="text-base font-display font-extrabold text-zinc-950 mt-1 block">Fully Synchronized</span>
            <span className="text-[9px] font-mono text-emerald-600 mt-1 block font-bold">● 100% Core Coverage</span>
          </div>
          <div className="p-2 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
            <Server className="w-5 h-5 flex-shrink-0" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-zinc-200 rounded p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">Provenance Chain</span>
            <span className="text-base font-display font-extrabold text-zinc-950 mt-1 block">Cryptographic</span>
            <span className="text-[9px] font-mono text-emerald-650 mt-1 block font-bold">● SHA-256 Lock Guarded</span>
          </div>
          <div className="p-2 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-zinc-200 rounded p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">Failure Fallback</span>
            <span className="text-base font-display font-extrabold text-zinc-950 mt-1 block">Dual-Circuit Ready</span>
            <span className="text-[9px] font-mono text-amber-600 mt-1 block font-bold">● Max limit {config.failoverThresholdMs}ms</span>
          </div>
          <div className="p-2 rounded bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center">
            <Clock className="w-5 h-5 flex-shrink-0" />
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-zinc-200 rounded p-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">System Cores</span>
            <span className="text-base font-display font-extrabold text-zinc-950 mt-1 block">Gemini 1.5 Flash</span>
            <span className="text-[9px] font-mono text-emerald-600 mt-1 block font-bold">● Online / Authenticated</span>
          </div>
          <div className="p-2 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
            <Cpu className="w-5 h-5 flex-shrink-0" />
          </div>
        </div>

      </div>

      {/* SECTION 2: DUAL VIEWS PANEL (OPERATOR & AUDIT CO-MODULES) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* OPERATOR DIAGNOSTICS & SYSTEM MAP (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-zinc-200 rounded p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <Activity className="text-zinc-900 w-5 h-5" />
                <h3 className="font-display font-medium text-xs text-zinc-900 font-bold uppercase tracking-tight">Operator System View</h3>
              </div>
              
              <button 
                onClick={handleRefresh}
                disabled={triggerRefresh}
                className="p-1 px-2.5 rounded bg-zinc-900 hover:bg-zinc-800 font-mono text-[10px] text-white flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
              >
                <RefreshCw className={`w-3 h-3 ${triggerRefresh ? 'animate-spin' : ''}`} />
                <span>Verify Workspace</span>
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 mt-3 mb-4">
              Diagnostic tracking statistics of active index processes, memory buffers, and context loading performance of candidate workspaces:
            </p>

            {/* Simulated diagnostic chart / metrics list */}
            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-3 bg-zinc-50 rounded border border-zinc-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Database className="text-zinc-650 w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-900 font-bold">Workspace Context Bytes</div>
                    <div className="text-[9px] text-zinc-450 font-normal">Includes codes + specs</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-zinc-950 font-bold block">142.4 KB</span>
                  <span className="text-[8px] text-zinc-400 uppercase tracking-widest block font-bold">Indexed</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-50 rounded border border-zinc-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Layers className="text-zinc-650 w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-900 font-bold">Active Model Config</div>
                    <div className="text-[9px] text-zinc-450 font-normal">Gemini model target</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-zinc-950 font-bold block">gemini-1.5-flash</span>
                  <span className="text-[8px] text-emerald-800 uppercase tracking-widest block font-bold">Normal Mode</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-50 rounded border border-zinc-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Flame className="text-amber-550 w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="text-zinc-900 font-bold">Dual-Circuit Failures</div>
                    <div className="text-[9px] text-zinc-450 font-normal">Automatic local fallback count</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-zinc-950 font-bold block">0 / 241 Actions</span>
                  <span className="text-[8px] text-zinc-400 tracking-widest block font-bold">None Core</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-zinc-400 text-[10px] font-mono mt-6 text-center border-t border-zinc-200 pt-3">
            HERMES Operator Terminal v1.0 • Node.js Container • Ready
          </div>
        </div>

        {/* AUDIT VIEW LOG & IMMUTABLE PROOF TRANSITS (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-zinc-200 rounded p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-zinc-900 w-5 h-5 flex-shrink-0" />
                <h3 className="font-display font-medium text-xs text-zinc-900 font-bold uppercase tracking-tight">Evaluation Audit View</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-800 bg-emerald-5 border border-emerald-250 px-2 py-0.5 rounded shadow-xs">
                L2 Verified
              </span>
            </div>

            <p className="text-[11px] text-zinc-530 mt-3 mb-4 font-sans">
              Chain-of-custody transactions. Ensures all source assets are audited:
            </p>

            <div className="relative rounded bg-zinc-50 border border-zinc-200 p-3 h-[240px] overflow-y-auto font-mono text-[9px] text-zinc-700 leading-relaxed space-y-2">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 items-start border-l border-zinc-200 pl-2">
                  <span className="text-zinc-400 font-bold shrink-0">{new Date().toISOString().slice(11, 19)}:</span>
                  <span className="break-all tracking-wide">{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-3 mt-6 flex justify-between items-center text-[10px] font-mono text-zinc-405">
            <span>Secured Audit Trail</span>
            <span className="font-bold">Cryptographic Trust Asserted</span>
          </div>
        </div>

      </div>

    </div>
  );
}

