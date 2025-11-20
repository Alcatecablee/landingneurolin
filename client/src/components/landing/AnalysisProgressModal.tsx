import { useEffect, useMemo } from 'react';
import { X, CheckCircle, Settings, Code, Sparkles, Target, Zap, Layers } from 'lucide-react';

interface LayerInfo {
  id: number;
  name: string;
  description: string;
  rules: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

interface AnalysisProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  layerInfo: LayerInfo[];
  animationStep: number;
  currentLayer?: number;
  processingTime?: number;
}

const ICON_MAP: Record<number, any> = {
  1: Settings,
  2: Code,
  3: Sparkles,
  4: Target,
  5: Zap,
  6: CheckCircle,
  7: Layers,
};

const COLOR_MAP: Record<number, string> = {
  1: 'text-blue-400',
  2: 'text-green-400',
  3: 'text-purple-400',
  4: 'text-orange-400',
  5: 'text-pink-400',
  6: 'text-cyan-400',
  7: 'text-indigo-400',
};

function LayerIcon({ layerId, isSpinning }: { layerId: number; isSpinning: boolean }) {
  if (isSpinning) {
    return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400" />;
  }

  const IconComponent = ICON_MAP[layerId] || Settings;
  const color = COLOR_MAP[layerId] || 'text-gray-400';

  return <IconComponent className={`w-5 h-5 ${color}`} />;
}

function LayerProgressItem({ layer, isCompleted, isCurrent }: { layer: LayerInfo; isCompleted: boolean; isCurrent: boolean }) {
  const baseClasses = "flex items-center gap-4 p-4 rounded-xl transition-all duration-500";
  const containerClasses = isCompleted 
    ? `${baseClasses} bg-green-500/10 border border-green-500/30`
    : isCurrent
    ? `${baseClasses} bg-blue-500/10 border border-blue-500/30 animate-pulse`
    : `${baseClasses} bg-gray-800/50 border border-gray-700`;

  const iconBgClasses = isCompleted 
    ? "w-10 h-10 rounded-lg flex items-center justify-center bg-green-500/20"
    : isCurrent
    ? "w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/20"
    : "w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700";

  const textClasses = isCompleted
    ? "font-semibold text-white"
    : isCurrent
    ? "font-semibold text-blue-400"
    : "font-semibold text-gray-400";

  const iconColorClasses = isCompleted ? "flex items-center justify-center text-green-400" : "flex items-center justify-center";

  const statusText = isCompleted ? "Complete" : isCurrent ? "Active" : "Pending";
  const statusColorClasses = isCompleted 
    ? "text-xs text-green-400 font-medium"
    : isCurrent
    ? "text-xs text-blue-400 font-medium"
    : "text-xs text-gray-500 font-medium";

  return (
    <div className={containerClasses}>
      <div className={iconBgClasses}>
        <div className={iconColorClasses}>
          <LayerIcon layerId={layer.id} isSpinning={isCurrent} />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className={textClasses}>
            Layer {layer.id}: {layer.name}
          </p>
          {isCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
        </div>
        <p className="text-sm text-gray-500">{layer.description}</p>
        {isCurrent && <p className="text-xs text-blue-400 mt-1 animate-pulse">Processing...</p>}
      </div>

      <div className="text-right">
        <span className={statusColorClasses}>{statusText}</span>
      </div>
    </div>
  );
}

export function AnalysisProgressModal({
  isOpen,
  onClose,
  layerInfo,
  animationStep,
  currentLayer,
  processingTime
}: AnalysisProgressModalProps) {
  if (!isOpen) return null;

  const progressPercentage = useMemo(() => Math.round((animationStep / layerInfo.length) * 100), [animationStep, layerInfo.length]);
  const progressWidth = useMemo(() => `${(animationStep / layerInfo.length) * 100}%`, [animationStep, layerInfo.length]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div 
        className="relative w-full max-w-2xl bg-gray-900/95 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="progress-modal-title"
        aria-describedby="progress-modal-description"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400" />
            </div>
            <div>
              <h3 id="progress-modal-title" className="text-xl font-bold text-white">7-Layer Engine Analysis</h3>
              <p id="progress-modal-description" className="text-sm text-gray-400">Processing your code through all layers</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: progressWidth }}
              />
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {layerInfo.map((layer, index) => (
              <LayerProgressItem
                key={layer.id}
                layer={layer}
                isCompleted={animationStep > index}
                isCurrent={animationStep === index + 1}
              />
            ))}
          </div>

          {processingTime && (
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Processing Time</span>
                <span className="text-sm font-medium text-white">{processingTime}ms</span>
              </div>
            </div>
          )}

          {currentLayer && layerInfo[currentLayer - 1] && (
            <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">Currently Processing: Layer {currentLayer}</h4>
              <p className="text-sm text-gray-300">{layerInfo[currentLayer - 1].description}</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700 bg-gray-800/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">This is a real analysis using the 7-layer engine</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live Processing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
