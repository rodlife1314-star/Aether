/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VirtualFile, GovernanceRule, TransitionConfig } from './types';

export const FORGE_FILES_DATA: VirtualFile[] = [
  {
    path: 'src/hermes/indexer.py',
    name: 'indexer.py',
    status: 'retain',
    size: '14.2 KB',
    category: 'retrieval',
    description: 'Calculates file hashes, creates text chunks, and maintains the fast local index cache of repository and workspace states.',
    content: `"""
HERMES Repository Indexer - Part of the Source-of-Truth Architecture.
(c) 2026 HERMES Governance Foundation. All rights reserved.
"""
import os
import hashlib
import json
import logging
from typing import Dict, List, Any

logger = logging.getLogger("hermes.indexer")

class RepositoryIndexer:
    def __init__(self, workspace_root: str):
        self.workspace_root = workspace_root
        self.index_db = {}
        self.signatures = {}

    def calculate_file_sha256(self, filepath: str) -> str:
        """Computes a cryptographically secure hash of the file to guarantee chain of custody."""
        sha256_hash = hashlib.sha256()
        with open(filepath, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()

    def index_all(self) -> Dict[str, Any]:
        """Indexes files omitting any unapproved draft assets."""
        logger.info(f"Scanning workspace root: {self.workspace_root}")
        for root, dirs, files in os.walk(self.workspace_root):
            # Ignore standard ignored folders
            dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', 'dist']]
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, self.workspace_root)
                file_hash = self.calculate_file_sha256(full_path)
                
                self.index_db[rel_path] = {
                    "hash": file_hash,
                    "bytes": os.path.getsize(full_path),
                    "indexed_time": "2026-05-29T16:38:00Z"
                }
        return self.index_db
`
  },
  {
    path: 'src/hermes/retriever.py',
    name: 'retriever.py',
    status: 'retain',
    size: '18.5 KB',
    category: 'retrieval',
    description: 'Finds semantic patterns and relevant chunks of code/documentation across registered workspaces and local context stores.',
    content: `"""
HERMES Retriever Module - Implements double-check workspace retrieval.
"""
import re
from typing import List, Dict, Any
from .indexer import RepositoryIndexer

class HermeticRetriever:
    def __init__(self, indexer: RepositoryIndexer):
        self.indexer = indexer
        self.active_policies = []

    def retrieve_with_attribution(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """Retrieves exact match and semantic anchors, providing complete attribution logs."""
        print(f"Executing retrieval query: {query}")
        results = []
        index = self.indexer.index_db
        
        # Simulated multi-phase high fidelity retrieval matching
        for path, meta in index.items():
            if any(keyword in path.lower() or keyword in query.lower() for keyword in ["source", "auth", "rule", "govern"]):
                results.append({
                    "path": path,
                    "score": 0.95 if "policy" in path else 0.82,
                    "sha256": meta["hash"],
                    "provenance": "Indexed Context Block"
                })
        
        return sorted(results, key=lambda x: x["score"], reverse=True)[:top_k]
`
  },
  {
    path: 'src/governance/policy_enforcer.py',
    name: 'policy_enforcer.py',
    status: 'retain',
    size: '11.8 KB',
    category: 'governance',
    description: 'Applies safety gates, license checkers, and schema validation rules on retrieved files before delivery to operators.',
    content: `"""
Governance Layer - Evaluates safety gates and compliance structures.
"""
from typing import Dict, List, Any

class PolicyEnforcer:
    def __init__(self, policy_rules: List[Dict]):
        self.rules = policy_rules

    def validate_provenance_integrity(self, file_path: str, file_hash: str) -> bool:
        """Enforces that file hash matches the trusted indexer registry."""
        # Check against local secured policy rules
        print(f"Ensuring {file_path} matches cryptographic hash {file_hash}")
        # Secure signature validation
        return len(file_hash) == 64

    def sanitize_retrieved_code(self, code: str) -> str:
        """Removes any hardcoded credentials or unverified external code parts before delivery."""
        sanitized = re.sub(r'apiKey\\s*=\\s*["\\'][^"\\']+["\\']', 'apiKey = "SECRET_ENCRYPTED"', code)
        return sanitized
`
  },
  {
    path: 'src/evidence/chain_of_custody.py',
    name: 'chain_of_custody.py',
    status: 'retain',
    size: '9.4 KB',
    category: 'evidence',
    description: 'Implements structured auditing by signing and registering every file-access step of a query into an immutable verification chain.',
    content: `"""
Evidence and Chain-of-Custody Logging.
Provides cryptographic validation traces.
"""
import time
import hashlib

class ChainOfCustodySigner:
    def __init__(self):
        self.audit_log = []

    def record_step(self, operator: str, files_accessed: list, audit_type: str) -> str:
        """Signs and registers a step in the provenance audit log."""
        timestamp = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        step_data = f"{timestamp}|{operator}|{','.join(files_accessed)}|{audit_type}"
        step_hash = hashlib.sha256(step_data.encode('utf-8')).hexdigest()
        
        self.audit_log.append({
            "timestamp": timestamp,
            "operator": operator,
            "files": files_accessed,
            "type": audit_type,
            "verification_hash": step_hash
        })
        return step_hash
`
  },
  {
    path: 'src/unsupported_debugger/mock_client.py',
    name: 'mock_client.py',
    status: 'archive',
    size: '22.0 KB',
    category: 'core',
    description: 'Old testing playpen terminal containing hardcoded mock keys, mock servers, and interactive GUI simulations.',
    content: `"""
❌ ARCHIVED: Old loose debugging sandbox. Needs to be removed to maintain clean competition compliance.
"""
import sys

def mock_oauth_connection():
    # Deprecated mock
    print("Warning: Initiating unverified connection")
    return "MOCK_TOKEN_123456"

if __name__ == '__main__':
    print("WARNING: This is a debug module and will be pruned during migration.")
`
  },
  {
    path: 'src/unsupported_debugger/play_harness.py',
    name: 'play_harness.py',
    status: 'archive',
    size: '8.1 KB',
    category: 'core',
    description: 'Temporary testing script built for rapid local prototyping without governance or attribution checks.',
    content: `"""
❌ ARCHIVED: Temporary prototyping testbed with unvalidated file-retrieval routing.
"""
def quick_test():
    # Direct unauthenticated file reads (violates Governance Layer)
    for line in open('../../config.json'):
         print(line)
`
  },
  {
    path: 'config/governance_policy.json',
    name: 'governance_policy.json',
    status: 'modify',
    size: '3.4 KB',
    category: 'config',
    description: 'Declares safety gates, permitted file types, and verification thresholds during competitive task processing.',
    content: `{
  "policy_name": "Competition Guardrail Standard v1.0",
  "provenance_required": true,
  "mfa_bypass": false,
  "max_context_bytes": 1048576,
  "safe_domains": ["github.com", "google.com", "hermes.gov"],
  "signature_verification": "mandatory"
}`
  }
];

export const GOVERNANCE_RULES_DEFAULT: GovernanceRule[] = [
  {
    id: 'G-1',
    name: 'Source-of-Truth Cryptographic Lock',
    description: 'Requires all files queried to have a verified SHA-256 hash matching the indexer registry.',
    category: 'Provenance',
    severity: 'Critical',
    enabled: true
  },
  {
    id: 'G-2',
    name: 'Clear Attribution Audit Frame',
    description: 'Every retrieved chunk must cite its original file name, relative path, and byte signature.',
    category: 'Attribution',
    severity: 'Critical',
    enabled: true
  },
  {
    id: 'G-3',
    name: 'Exclusion of Unapproved Drafts',
    description: 'Prunes out testing playpens, unauthenticated logs, and unapproved playground directories from workspace search.',
    category: 'Integrity',
    severity: 'Warning',
    enabled: true
  },
  {
    id: 'G-4',
    name: 'Active Circuit Failover Gate',
    description: 'Instructs automatic switch from primary indexed retrieval to fault-tolerant sequential disk scan if response exceeds timeout.',
    category: 'Security',
    severity: 'Warning',
    enabled: true
  },
  {
    id: 'G-5',
    name: 'Immutable Chain of Custody Record',
    description: 'Appends all access records into an immutable audit stream signed with simulated SHA certification tokens.',
    category: 'Provenance',
    severity: 'Critical',
    enabled: true
  }
];

export interface BriefOutcome {
  id: number;
  title: string;
  description: string;
  badge: string;
  details: string;
  deliverablePayload?: string;
}

export const getBriefOutcomes = (config: TransitionConfig): BriefOutcome[] => [
  {
    id: 1,
    title: "1. Recommended Repository Structure",
    description: "Production and clean modular directory architecture for the competition repository.",
    badge: "Structure",
    details: "Establishes structured, verifiable directories separating retrieval context, policy rules, and system tracking elements.",
    deliverablePayload: `├── .env.example
├── .gitignore
├── metadata.json
├── package.json
├── README.md              # Brand new high-grade operator readme
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types.ts          # Central source-of-truth types
│   ├── data.ts
│   ├── components/       # Component modularity
│   │   ├── Dashboard.tsx
│   │   ├── Playground.tsx
│   │   ├── Diagnostics.tsx
│   │   └── Configuration.tsx
│   ├── hermes/           # ${config.targetBrand} Core Retrieval Library
│   │   ├── indexer.ts    # Secure cryptographic indexer
│   │   ├── retriever.ts  # Context locator with attribution
│   │   └── fallback.ts   # Fault-tolerant dual-circuit router
│   ├── governance/       # Governance Layers
│   │   ├── enforcer.ts   # Policy rule validator
│   │   └── rules.ts      # Active system gates
│   └── evidence/         # Immutable audit logging
│       └── custody.ts    # SHA-256 chain of custody registry`
  },
  {
    id: 2,
    title: "2. Files and Modules to Retain",
    description: "Critical architectural utilities that will form the operational backbone of the competition system.",
    badge: "Retain",
    details: "Retains and upgrades all HERMES framework capabilities including verification signing and semantic caching.",
    deliverablePayload: `- Core Indexer (\`src/hermes/indexer.py\`): Maintain complete integrity audits.
- Retrieval Engine (\`src/hermes/retriever.py\`): Upgraded to support parallel attribution tracking.
- Policy Gate (\`src/governance/policy_enforcer.py\`): Tightened to enforce absolute secure attributes.
- Chain-of-Custody Recorder (\`src/evidence/chain_of_custody.py\`): Hardened using SHA-256 proof-logging.
- Rule definitions and standard environment configs.`
  },
  {
    id: 3,
    title: "3. Files and Modules to Archive / Remove",
    description: "Removes unnecessary debugging clutter, unsecure helpers, and boilerplate playgrounds.",
    badge: "Archive",
    details: "Cleanses target workspace of testbed mock files to guarantee pristine code coverage and compliance audits.",
    deliverablePayload: `- Debugging Sandboxes (\`src/unsupported_debugger/mock_client.py\`): Truncated to avoid testing leakages.
- Direct-Access play harnesses (\`src/unsupported_debugger/play_harness.py\`): Pruned for policy violation (unauthenticated direct reads).
- Local hardcoded credential samples.
- Verbose console logger wrappers from development.`
  },
  {
    id: 4,
    title: "4. Rebranding Strategy (${config.sourceBrand} ──> ${config.targetBrand})",
    description: "Aligns the transition from internal prototype naming into an official, elite competition brand.",
    badge: "Rebrand",
    details: "Migrates naming prefixes, signatures, UI headers, and prompt instruction logs from raw FORGE components into HERMES' elite competition counterpart.",
    deliverablePayload: `- **Nomenclature**: Transition all identifiers from FORGE (experimental framework) to '${config.targetBrand}' (${config.targetTagline}).
- **Verification Signature**: Set code banner headers to "SPDX-License-Identifier: Apache-2.0 -- Powered by ${config.targetBrand}".
- **Log Level Header**: Console output headers updated to require "[${config.targetBrand}-CORE-RETRIEVAL]" identifiers.
- **Rule Engine**: Standardize on "${config.targetBrand}-Audit-Rules" with high-trust defaults.`
  },
  {
    id: 5,
    title: "5. Competition-ready metadata.json",
    description: "Clean deployment configuration representing correct app metadata and capabilities.",
    badge: "Metadata",
    details: "Guarantees proper permissions and lists the Gemini API capability securely on the standard AI Studio context definitions.",
    deliverablePayload: `{
  "name": "${config.targetBrand} Retrieval Control",
  "description": "${config.targetBrand} - Audited and governed code and workbook retrieval engine built with robust chain-of-custody tracking.",
  "requestFramePermissions": [],
  "majorCapabilities": [
    "MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"
  ]
}`
  },
  {
    id: 6,
    title: "6. Competition-ready README Structure",
    description: "The ultimate documentation outline for evaluation committees, with explicit system design details.",
    badge: "README",
    details: "High-grade architectural overview covering absolute source of truth, dual failover pathways, and verification proofs.",
    deliverablePayload: `# 🌌 ${config.targetBrand} - Evaluative Governed Retrieval Control

${config.targetBrand} is an operator-grade workspace context and code ingestion engine. Unlike traditional generative bots, it executes strict algorithmic indexing, security-compliant policy gating, and immutable provenance auditing for high-stakes competition evaluation.

## 🛠️ Key Capabilities
1. **Source-of-Truth Lock**: Computes SHA-256 tags for every project document.
2. **Repository-Aware Retrieval**: Dual context matching over registered source workspaces.
3. **Governance Pipeline**: Validates incoming file items against pre-compiled policy structures.
4. **Audit and Verification**: Signs retrieve pathways onto a reliable verification chain.
5. **Fault-Tolerant Circuit**: High sensitivity fallback routine scanning local storages sequentially.

## 🚀 Speed Start
\`\`\`bash
# Configure API keys
cp .env.example .env

# Run full development center
npm install
npm run dev
\`\`\`

## 🛡️ Compliance & Licensing
- **License**: Apache License 2.0
- **Chain Signature Mode**: ${config.governanceLevel}
- **Retention Strategy**: ${config.retentionProfile}`
  },
  {
    id: 7,
    title: "7. Dataset Ingestion Strategy",
    description: "Pristine ingestion flow for cataloging system information and external raw document structures.",
    badge: "Ingestion",
    details: "Defines deterministic chunk boundaries and cryptographically signs every dataset item during intake.",
    deliverablePayload: `1. **Ingest Gate**: Accepts raw codebanks and markdown documents.
2. **Standardization Formatter**: Truncates trailing white spaces and formats file lines as standardized UTF-8 elements.
3. **Chunk Boundary Splitting**: Uses precise 200-line modular bounds with a 20-line overlap, preserving logical brace formatting.
4. **Attribution Tags**: Automatically attaches original Repository Location URLs and File Hashes to each individual data chunk.`
  },
  {
    id: 8,
    title: "8. Source-of-Truth Hierarchy",
    description: "Establishing absolute priority rankings of different source stores to resolve semantic conflicts.",
    badge: "Hierarchy",
    details: "Prioritizes raw verifiable local files over compiled indexes to ensure that stale cached data never violates system decisions.",
    deliverablePayload: `- **Priority-L1 (Primary Codebase)**: Local active files on disk inside verified Workspace Paths. (Root Source of Truth)
- **Priority-L2 (Cached Register List)**: Index register hashes updated on automated workspace scan.
- **Priority-L3 (Policy Configuration)**: Static policy YAML files.
- **Priority-L4 (Generative Context)**: Summaries and outlines generated dynamically by auxiliary LLMs.`
  },
  {
    id: 9,
    title: "9. Governance Hierarchy",
    description: "Priority mapping of security rules, attribution guidelines, and verification rules.",
    badge: "Security",
    details: "Forces critical validation gates to execute prior to soft analysis checkpoints.",
    deliverablePayload: `- **Priority 1**: Cryptographic Hash Check (G-1) - Block execution if file has been modified outside the index. (Blocker)
- **Priority 2**: Chain of Custody Registry (G-5) - Fail request if transaction cannot be appended to the SHA proof log.
- **Priority 3**: Clear Source Attribution (G-2) - Highlight warnings if original author is unverified.
- **Priority 4**: Exclusion of unapproved draft nodes (G-3) - Strip unverified development modules.`
  },
  {
    id: 10,
    title: "10. First-pass Roadmap (Clone ──> Release Candidate)",
    description: "Phased agile planning leading up to the final validated competition submission.",
    badge: "Roadmap",
    details: "Strict, actionable sequence establishing verification gates at every transition milestone.",
    deliverablePayload: `- **Phase 1: Source Isolation**: Run cleanup tools. Purge unapproved prototype scripts from active repository states. (Days 1-2)
- **Phase 2: Core Upgrading**: Recompile current indexers, retrievers, and chain-of-custody builders for ${config.targetBrand}. (Days 3-5)
- **Phase 3: Governance Hardening**: Bind policy gates into active compile triggers. Activate automated warning rules. (Days 6-8)
- **Phase 4: Diagnostics Integration**: Connect visual operator controls and validation charts. (Days 9-10)
- **Phase 5: Release Verification & Testing**: Run 48-hour continuous simulation tests. Hand over release candidate v1.0. (Days 11-12)`
  }
];
