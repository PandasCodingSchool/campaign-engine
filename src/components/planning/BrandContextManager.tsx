import React, { useState } from 'react';
import { 
  Database, 
  Users, 
  BrainCircuit, 
  ShieldAlert, 
  Plus, 
  Sparkles, 
  Volume2, 
  Check, 
  Globe 
} from 'lucide-react';
import { BrandContext } from '../../types/campaign';
import { brandStoreService } from '../../services/brandStoreService';

interface BrandContextManagerProps {
  brand: BrandContext;
  onBrandUpdated: (brand: BrandContext) => void;
}

export const BrandContextManager: React.FC<BrandContextManagerProps> = ({
  brand,
  onBrandUpdated
}) => {
  const [newLearning, setNewLearning] = useState('');
  const [newTone, setNewTone] = useState('');
  const [newProhibited, setNewProhibited] = useState('');

  const handleAddTone = async () => {
    if (!newTone.trim()) return;
    const updated = await brandStoreService.updateBrandContext({
      toneOfVoice: [...brand.toneOfVoice, newTone.trim()]
    });
    onBrandUpdated(updated);
    setNewTone('');
  };

  const handleAddProhibited = async () => {
    if (!newProhibited.trim()) return;
    const updated = await brandStoreService.updateBrandContext({
      prohibitedTerms: [...brand.prohibitedTerms, newProhibited.trim()]
    });
    onBrandUpdated(updated);
    setNewProhibited('');
  };

  const handleAddLearning = async () => {
    if (!newLearning.trim()) return;
    const updated = await brandStoreService.addPastLearning(newLearning.trim());
    onBrandUpdated(updated);
    setNewLearning('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card p-6 border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-indigo flex items-center gap-1">
              <Database className="h-3 w-3" /> Strategic Context Store (Express REST API Connected)
            </span>
            <span className="badge badge-emerald flex items-center gap-1">
              <BrainCircuit className="h-3 w-3" /> {brand.vectorEmbeddingsCount} Embeddings Indexed
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
            {brand.name}
            <a href={brand.website} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 font-normal hover:underline flex items-center gap-1">
              <Globe className="h-3 w-3" /> {brand.website}
            </a>
          </h2>
          <p className="text-sm text-slate-400 mt-1">{brand.tagline}</p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
          <div className="text-center px-3 border-r border-slate-800">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Personas</p>
            <p className="text-xl font-bold text-white">{brand.targetPersonas.length}</p>
          </div>
          <div className="text-center px-3 border-r border-slate-800">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Tone Rules</p>
            <p className="text-xl font-bold text-white">{brand.toneOfVoice.length}</p>
          </div>
          <div className="text-center px-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider">Learnings Memory</p>
            <p className="text-xl font-bold text-white">{brand.pastLearnings.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tone of Voice & Brand Rules */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-indigo-400" /> Tone of Voice Rules
            </h3>
          </div>

          <div className="space-y-2">
            {brand.toneOfVoice.map((rule, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add new tone rule..."
              value={newTone}
              onChange={(e) => setNewTone(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button onClick={handleAddTone} className="btn-secondary btn-sm">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Prohibited Terms */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-400" /> Prohibited Terms / Buzzwords
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {brand.prohibitedTerms.map((term, idx) => (
                <span key={idx} className="badge badge-rose text-[10px]">
                  {term}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Prohibit term..."
                value={newProhibited}
                onChange={(e) => setNewProhibited(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button onClick={handleAddProhibited} className="btn-secondary btn-sm">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Target Audience Personas */}
        <div className="glass-card p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" /> Target Personas
            </h3>
            <span className="text-xs text-slate-400">Indexed for Vector Prompt Generator</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.targetPersonas.map((persona) => (
              <div key={persona.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                    <p className="text-xs text-indigo-400">{persona.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {persona.preferredChannels.map((ch) => (
                      <span key={ch} className="badge badge-indigo text-[9px]">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Key Pain Points</p>
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                    {persona.painPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Strategic Goals</p>
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                    {persona.goals.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Past Campaign Memory */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" /> AI Vector Memory & Campaign Learnings
              </h4>
              <span className="text-[10px] text-emerald-400 font-medium">Auto-synthesized from past campaigns</span>
            </div>

            <div className="space-y-2 mb-3">
              {brand.pastLearnings.map((learning, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-200 flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{learning}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Feed new empirical campaign learning into AI Memory..."
                value={newLearning}
                onChange={(e) => setNewLearning(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button onClick={handleAddLearning} className="btn-primary btn-sm">
                <Plus className="h-3.5 w-3.5" /> Index Memory
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
