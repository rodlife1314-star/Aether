/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TransitionConfig, GovernanceRule } from './types';
import { GOVERNANCE_RULES_DEFAULT } from './data';
import Dashboard from './components/Dashboard';
import Playground from './components/Playground';
import Diagnostics from './components/Diagnostics';
import Configuration from './components/Configuration';
import { 
  Compass, Terminal, Shield, Settings, Activity, Clock, 
  HelpCircle, ExternalLink, Moon, Sparkles, Layers 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'brief' | 'sandbox' | 'diagnostics' | 'settings'>('brief');
  const [systemTime, setSystemTime] = useState<string>('2026-05-29T16:37:57Z');

  // Unified global configuration
  const [config, setConfig] = useState<TransitionConfig>({
    sourceBrand: 'FORGE',
    targetBrand: 'AETHER',
    targetTagline: 'Audited Evidence and Trustworthy Hybrid Evaluation Engine',
    governanceLevel: 'Strictest',
    retentionProfile: 'Balanced',
    failoverThresholdMs: 120
  });

  const [activeRules, setActiveRules] = useState<GovernanceRule[]>(GOVERNANCE_RULES_DEFAULT);

  // Dynamic ticking clock matching user environment baseline
  useEffect(() => {
    let now = new Date('2026-05-29T16:37:57Z');
    const intervalRef = setInterval(() => {
      now.setSeconds(now.getSeconds() + 1);
      setSystemTime(now.toISOString().replaceAll('T', ' ').slice(0, 19) + ' UTC');
    }, 1000);
    return () => clearInterval(intervalRef);
  }, []);

  const handleToggleRule = (ruleId: string) => {
    setActiveRules(prev => prev.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div id="application-container" className="min-h-screen bg-[#F4F4F5] text-[#18181B] flex flex-col justify-between font-sans selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* 1. MASTER UPPER BAR */}
      <header id="app-header" className="border-b border-zinc-200/80 bg-white sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="p-2.5 bg-zinc-900 border border-zinc-950 text-white rounded shadow">
                <Layers className="w-5 h-5 flex-shrink-0" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-display font-extrabold tracking-tight text-zinc-950 uppercase sm:text-lg">
                  {config.targetBrand} RETRIEVAL CONTROL
                </h1>
                <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 uppercase tracking-widest hidden sm:inline">
                  Release Candidate v1.0
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {config.targetTagline} • Source-of-Truth Console
              </p>
            </div>
          </div>

          {/* Audit telemetry clock */}
          <div className="flex items-center gap-4 font-mono text-[11px] self-end md:self-auto">
            <div className="text-right hidden sm:block">
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider">Provenance Reference Clock</div>
              <div className="text-zinc-700 flex items-center justify-end gap-1.5 mt-0.5 font-bold">
                <Clock className="w-3.5 h-3.5 text-zinc-800" />
                <span>{systemTime}</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded p-1.5 px-3 flex items-center gap-2 shadow-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="text-[10px] uppercase font-bold text-zinc-700">HERMES ACTIVE</div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. DYNAMIC WORKSPACE ROUTING BAR */}
      <nav id="app-nav" className="bg-white border-b border-zinc-200/60 px-6 py-2 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto select-none pl-1">
          
          <button
            id="tab-btn-brief"
            onClick={() => setActiveTab('brief')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'brief'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Transition Brief</span>
          </button>

          <button
            id="tab-btn-sandbox"
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'sandbox'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Auditing Sandbox</span>
          </button>

          <button
            id="tab-btn-diagnostics"
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'diagnostics'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Operator & Audit Views</span>
          </button>

          <button
            id="tab-btn-settings"
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Governance Settings</span>
          </button>

        </div>
      </nav>

      {/* 3. CORE MULTIPLEX CONTEXT DISPLAY */}
      <main id="app-main-content" className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 overflow-hidden">
        
        {/* Animated Slide In transitions for screen layout swaps */}
        <AnimatePresence mode="wait">
          {activeTab === 'brief' && (
            <motion.div
              key="brief-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Dashboard 
                config={config} 
                onNavigateToSandbox={() => setActiveTab('sandbox')} 
              />
            </motion.div>
          )}

          {activeTab === 'sandbox' && (
            <motion.div
              key="sandbox-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Playground 
                config={config} 
                activeRules={activeRules} 
              />
            </motion.div>
          )}

          {activeTab === 'diagnostics' && (
            <motion.div
              key="diagnostics-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Diagnostics 
                config={config} 
              />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <Configuration 
                config={config}
                onChangeConfig={setConfig}
                activeRules={activeRules}
                onToggleRule={handleToggleRule}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* 4. VERIFIABLE SECURE FOOTER (No tech larping, clean literal info) */}
      <footer id="app-footer" className="border-t border-zinc-200 bg-white p-4 shrink-0 text-center font-sans text-[10px] text-zinc-400 font-bold uppercase tracking-[0.15em]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>{config.targetBrand} • Evaluator-Grade Compliance Portal</span>
          <span className="text-zinc-500">
            Current Workspace Checked: forge-system.git • License Apache 2.0
          </span>
        </div>
      </footer>

    </div>
  );
}
