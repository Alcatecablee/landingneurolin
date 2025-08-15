/**
 * NeuroLint API Client for connecting to the real 7-layer engine
 */

export interface AnalysisRequest {
  code: string;
  layers?: number[];
  filePath?: string;
  options?: {
    backup?: boolean;
    clientId?: string;
  };
}

export interface AnalysisResult {
  success: boolean;
  analysis?: {
    recommendedLayers: number[];
    detectedIssues: Array<{
      type: string;
      severity: "low" | "medium" | "high" | "critical";
      description: string;
      fixedByLayer: number;
      line?: number;
      column?: number;
      ruleId?: string;
    }>;
    confidence: number;
    processingTime: number;
    analysisId: string;
  };
  error?: string;
  details?: any;
}

export interface FixRequest {
  code: string;
  issues: Array<{
    type: string;
    severity: string;
    description: string;
    fixedByLayer: number;
    line?: number;
    column?: number;
    ruleId?: string;
  }>;
  options?: {
    backup?: boolean;
    filePath?: string;
  };
}

export interface FixResult {
  success: boolean;
  code?: string;
  originalCode?: string;
  appliedFixes?: Array<{
    type: string;
    description: string;
    layer: number;
    ruleId: string;
  }>;
  failedFixes?: Array<{
    type: string;
    description: string;
    error: string;
  }>;
  backupPath?: string;
  metadata?: {
    fixId: string;
    timestamp: string;
    processingTime: number;
    filePath?: string;
  };
  error?: string;
  details?: any;
}

export interface LayerInfo {
  id: number;
  name: string;
  description: string;
  rules: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

export interface EngineStatus {
  initialized: boolean;
  version: string;
  supportedLayers: number[];
  totalRules: number;
  stats: {
    analyses: number;
    fixes: number;
    errors: number;
    cacheHits: number;
    processingTime: number;
  };
}

class NeuroLintAPI {
  private baseUrl: string;
  private clientId: string;

  constructor() {
    // Use the actual API endpoint from your web-app
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://app.neurolint.dev/api';
    this.clientId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Analyze code using the real 7-layer engine
   */
  async analyzeCode(request: AnalysisRequest): Promise<AnalysisResult> {
    try {
      const response = await fetch(`${this.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-ID': this.clientId,
        },
        body: JSON.stringify({
          code: request.code,
          layers: request.layers || [1, 2, 3, 4, 5, 6, 7],
          filePath: request.filePath || 'demo.tsx',
          options: {
            backup: false,
            clientId: this.clientId,
            ...request.options
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Transform the result to match our expected format
      return this.transformAnalysisResult(result);

    } catch (error) {
      console.error('Analysis failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error
      };
    }
  }

  /**
   * Fix code using the real 7-layer engine
   */
  async fixCode(request: FixRequest): Promise<FixResult> {
    try {
      const response = await fetch(`${this.baseUrl}/fix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-ID': this.clientId,
        },
        body: JSON.stringify({
          code: request.code,
          issues: request.issues,
          options: {
            backup: false,
            filePath: request.options?.filePath || 'demo.tsx',
            ...request.options
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Transform the result to match our expected format
      return this.transformFixResult(result);

    } catch (error) {
      console.error('Fix failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error
      };
    }
  }

  /**
   * Get engine status and layer information
   */
  async getEngineStatus(): Promise<EngineStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/status`, {
        method: 'GET',
        headers: {
          'X-Client-ID': this.clientId,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Failed to get engine status:', error);
      // Return fallback status
      return {
        initialized: true,
        version: '1.2.1',
        supportedLayers: [1, 2, 3, 4, 5, 6, 7],
        totalRules: 45,
        stats: {
          analyses: 0,
          fixes: 0,
          errors: 0,
          cacheHits: 0,
          processingTime: 0
        }
      };
    }
  }

  /**
   * Get layer information
   */
  async getLayerInfo(): Promise<LayerInfo[]> {
    try {
      const response = await fetch(`${this.baseUrl}/layers`, {
        method: 'GET',
        headers: {
          'X-Client-ID': this.clientId,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Failed to get layer info:', error);
      // Return fallback layer info
      return [
        {
          id: 1,
          name: "Configuration Modernization",
          description: "TypeScript, Next.js, and package.json updates",
          rules: [
            { id: "tsconfig-target", name: "TypeScript Target", description: "Update TypeScript target to ES2022" },
            { id: "tsconfig-strict-mode", name: "Strict Mode", description: "Enable TypeScript strict mode" },
            { id: "nextjs-config", name: "Next.js Config", description: "Modernize Next.js configuration" }
          ]
        },
        {
          id: 2,
          name: "Content Standardization",
          description: "Pattern fixes, entity cleanup, and syntax modernization",
          rules: [
            { id: "var-to-const", name: "Var to Const", description: "Convert var to const/let" },
            { id: "html-entities", name: "HTML Entities", description: "Fix HTML entity encoding" },
            { id: "console-cleanup", name: "Console Cleanup", description: "Remove console statements" }
          ]
        },
        {
          id: 3,
          name: "Component Intelligence",
          description: "React component modernization with accessibility and TypeScript",
          rules: [
            { id: "add-aria-labels", name: "ARIA Labels", description: "Add accessibility labels" },
            { id: "typescript-interfaces", name: "TypeScript Interfaces", description: "Add TypeScript interfaces" },
            { id: "component-props-validation", name: "Props Validation", description: "Add props validation" }
          ]
        },
        {
          id: 4,
          name: "SSR/Hydration Safety",
          description: "Client-server consistency and hydration error prevention",
          rules: [
            { id: "use-client-directive", name: "Use Client Directive", description: "Add 'use client' directive" },
            { id: "safe-client-apis", name: "Safe Client APIs", description: "Add SSR guards for client APIs" },
            { id: "hydration-safety", name: "Hydration Safety", description: "Fix hydration mismatches" }
          ]
        },
        {
          id: 5,
          name: "Next.js App Router Optimization",
          description: "App Router migration and optimization",
          rules: [
            { id: "router-imports", name: "Router Imports", description: "Update router imports" },
            { id: "metadata-exports", name: "Metadata Exports", description: "Add metadata exports" },
            { id: "app-router-patterns", name: "App Router Patterns", description: "Apply App Router patterns" }
          ]
        },
        {
          id: 6,
          name: "Testing & Validation",
          description: "Automated test generation and testing library updates",
          rules: [
            { id: "generate-component-tests", name: "Component Tests", description: "Generate component tests" },
            { id: "update-testing-library", name: "Testing Library", description: "Update testing library" },
            { id: "test-coverage", name: "Test Coverage", description: "Add test coverage" }
          ]
        },
        {
          id: 7,
          name: "Adaptive Pattern Learning",
          description: "Machine learning-based pattern detection and custom rules",
          rules: [
            { id: "adaptive-patterns", name: "Adaptive Patterns", description: "Detect custom patterns" },
            { id: "team-conventions", name: "Team Conventions", description: "Apply team conventions" },
            { id: "custom-patterns", name: "Custom Patterns", description: "Apply custom patterns" }
          ]
        }
      ];
    }
  }

  /**
   * Transform analysis result to match expected format
   */
  private transformAnalysisResult(result: any): AnalysisResult {
    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Analysis failed',
        details: result.details
      };
    }

    // Transform issues to match our expected format
    const transformedIssues = (result.issues || []).map((issue: any) => ({
      type: issue.type || issue.ruleId || 'unknown',
      severity: this.mapSeverity(issue.severity || issue.level || 'medium'),
      description: issue.description || issue.message || 'Issue detected',
      fixedByLayer: issue.layer || issue.fixedByLayer || 1,
      line: issue.line,
      column: issue.column,
      ruleId: issue.ruleId || issue.type
    }));

    return {
      success: true,
      analysis: {
        recommendedLayers: result.recommendedLayers || [1, 2, 3, 4, 5],
        detectedIssues: transformedIssues,
        confidence: result.confidence || 0.85,
        processingTime: result.processingTime || 0,
        analysisId: result.analysisId || `analysis-${Date.now()}`
      }
    };
  }

  /**
   * Transform fix result to match expected format
   */
  private transformFixResult(result: any): FixResult {
    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Fix failed',
        details: result.details
      };
    }

    return {
      success: true,
      code: result.code,
      originalCode: result.originalCode,
      appliedFixes: (result.appliedFixes || []).map((fix: any) => ({
        type: fix.type || fix.ruleId,
        description: fix.description || fix.message,
        layer: fix.layer || fix.fixedByLayer || 1,
        ruleId: fix.ruleId || fix.type
      })),
      failedFixes: (result.failedFixes || []).map((fix: any) => ({
        type: fix.type || fix.ruleId,
        description: fix.description || fix.message,
        error: fix.error || 'Fix failed'
      })),
      backupPath: result.backupPath,
      metadata: result.metadata
    };
  }

  /**
   * Map severity levels
   */
  private mapSeverity(severity: string): "low" | "medium" | "high" | "critical" {
    const severityMap: Record<string, "low" | "medium" | "high" | "critical"> = {
      'error': 'high',
      'warning': 'medium',
      'info': 'low',
      'critical': 'critical',
      'high': 'high',
      'medium': 'medium',
      'low': 'low'
    };

    return severityMap[severity.toLowerCase()] || 'medium';
  }
}

// Export singleton instance
export const neurolintAPI = new NeuroLintAPI(); 