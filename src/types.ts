/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualFile {
  path: string;
  name: string;
  status: 'retain' | 'archive' | 'modify';
  size: string;
  category: 'core' | 'retrieval' | 'governance' | 'evidence' | 'test' | 'config';
  description: string;
  content: string;
}

export interface GovernanceRule {
  id: string;
  name: string;
  description: string;
  category: 'Provenance' | 'Integrity' | 'Attribution' | 'Security';
  severity: 'Critical' | 'Warning' | 'Info';
  enabled: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  query: string;
  filesAccessed: string[];
  governanceScore: number;
  status: 'COMPLIANT' | 'NON-COMPLIANT' | 'FALLBACK';
  hash: string;
  pathway: string;
}

export interface TransitionConfig {
  sourceBrand: string;
  targetBrand: string;
  targetTagline: string;
  governanceLevel: 'Strictest' | 'Balanced' | 'Relaxed';
  retentionProfile: 'Minimalist' | 'Balanced' | 'Comprehensive';
  failoverThresholdMs: number;
}

export interface QueryResult {
  responseText: string;
  governanceReport: {
    appliedRulesCount: number;
    violationsCount: number;
    passedRules: string[];
    violations: string[];
    complianceScore: number;
  };
  provenanceChain: {
    retrievalSteps: string[];
    signedHash: string;
    referencedFiles: string[];
    chainOfCustodySignatures: string[];
  };
  fallbackLog: {
    pathType: 'Primary (Index)' | 'Fallback (Direct Scan)' | 'Secondary Cache';
    routingNotes: string;
    durationMs: number;
  };
}
