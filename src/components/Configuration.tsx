/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sliders, Shield, Key, Sparkles, HelpCircle, Save, Download, RefreshCw } from 'lucide-react';
import { TransitionConfig, GovernanceRule } from '../types';

interface ConfigurationProps {
  config: TransitionConfig;
  onChangeConfig: (newConfig: TransitionConfig) => void;
  activeRules: GovernanceRule[];
  onToggleRule: (ruleId: string) => void;
}

export default function Configuration({ config, onChangeConfig, activeRules, onToggleRule }: ConfigurationProps) {

  const handleTextChange = (key: keyof TransitionConfig, value: string | number) => {
    onChangeConfig({
      ...config,
      [key]: value
    });
  };

  const handleDownloadSpec = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ config, rules: activeRules.filter(r => r.enabled) }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${config.targetBrand.toLowerCase()}-audit-specification.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="configuration-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: BRANDING & FAILOVER CONFIGS (5 columns) */}
      <div className="lg:col-span-5 bg-slate-900/65 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Sliders className="text-emerald-400 w-5 h-5" />
            <h3 className="font-display font-medium text-sm text-white">Rebranding Configurator</h3>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            Configure metadata parameters and branding transitions. Changes here will immediately propagate across the evaluation outputs and prompts:
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Source Brand Identifier</label>
              <input 
                type="text" 
                value={config.sourceBrand} 
                onChange={(e) => handleTextChange('sourceBrand', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-slate-300 focus:border-emerald-500/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Target Brand (Competition Identity)</label>
              <input 
                type="text" 
                value={config.targetBrand} 
                onChange={(e) => handleTextChange('targetBrand', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-slate-300 focus:border-emerald-500/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Target Tagline</label>
              <input 
                type="text" 
                value={config.targetTagline} 
                onChange={(e) => handleTextChange('targetTagline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-slate-300 focus:border-emerald-500/50 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Failover Cutoff</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={config.failoverThresholdMs} 
                    onChange={(e) => handleTextChange('failoverThresholdMs', parseInt(e.target.value) || 100)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 pr-8 font-mono text-slate-300 focus:border-emerald-500/50 outline-none"
                  />
                  <span className="absolute right-2.5 top-2.5 text-[9px] font-mono text-slate-500">ms</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">Retention Strategy</label>
                <select
                  value={config.retentionProfile}
                  onChange={(e) => handleTextChange('retentionProfile', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-slate-300 focus:border-emerald-500/50 outline-none"
                >
                  <option value="Minimalist">Minimalist</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Comprehensive">Comprehensive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-850 pt-3 mt-6">
          <button
            onClick={handleDownloadSpec}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-semibold rounded transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Specification Spec
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE GOVERNANCE RULES TOGGLER (7 columns) */}
      <div className="lg:col-span-7 bg-slate-900/65 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 mb-4">
          <Shield className="text-emerald-400 w-5 h-5" />
          <h3 className="font-display font-medium text-sm text-white">Active Security Gates & Policy Rules</h3>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed font-sans mb-4">
          Enable or disable compliance layers and safety checks below. This governance hierarchy acts as an absolute validator, scoring workspace retrieval operations before final code releases:
        </p>

        <div className="space-y-2.5">
          {activeRules.map((rule) => (
            <div 
              key={rule.id}
              className={`p-3 rounded-lg border transition-colors flex items-start gap-3 justify-between ${
                rule.enabled 
                  ? 'bg-slate-950/80 border-slate-800' 
                  : 'bg-slate-950/20 border-slate-900 text-slate-500'
              }`}
            >
              <div className="flex gap-2 text-xs">
                <input 
                  type="checkbox" 
                  checked={rule.enabled}
                  onChange={() => onToggleRule(rule.id)}
                  className="mt-1 cursor-pointer accent-emerald-500" 
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${rule.enabled ? 'text-white' : 'text-slate-500'}`}>{rule.name}</span>
                    <span className={`text-[8px] font-mono px-1 rounded uppercase border ${
                      rule.severity === 'Critical' 
                        ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                        : rule.severity === 'Warning'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                    }`}>
                      {rule.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{rule.description}</p>
                </div>
              </div>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                {rule.category}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
