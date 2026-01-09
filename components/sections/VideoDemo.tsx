import React, { useState, useEffect } from 'react';
import { FadeIn } from '../ui/FadeIn';
import { Play, Loader2, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { GoogleGenAI } from "@google/genai";

export const VideoDemo: React.FC = () => {
  const { t } = useLanguage();
  const [hasKey, setHasKey] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      const has = await aistudio.hasSelectedApiKey();
      setHasKey(has);
    }
  };

  const handleConnect = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      await aistudio.openSelectKey();
      await checkApiKey();
    }
  };

  const generateVideo = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setStatus(t.videoDemo.status.initializing);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatus(t.videoDemo.status.generating);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      setStatus(t.videoDemo.status.downloading);

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!response.ok) throw new Error('Failed to download video');
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus(t.videoDemo.status.success);
      } else {
        throw new Error("No video URI returned");
      }

    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("API Key invalid or expired. Please reconnect.");
      } else {
        setError(t.videoDemo.status.error);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePresetClick = (preset: string) => {
    setPrompt(preset);
  };

  return (
    <section id="ai-lab" className="py-24 bg-stone-100 dark:bg-stone-900/50 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm mb-6">
            <Sparkles size={14} className="text-purple-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Experimental
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 dark:text-stone-100 mb-4 transition-colors">
            {t.videoDemo.heading}
          </h2>
          <p className="max-w-2xl mx-auto text-stone-600 dark:text-stone-400 font-light text-lg">
            {t.videoDemo.subheading}
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <FadeIn delay={0.2} className="bg-white dark:bg-stone-950 rounded-2xl shadow-xl shadow-stone-200/50 dark:shadow-stone-900/50 border border-stone-200 dark:border-stone-800 overflow-hidden">
            <div className="aspect-video bg-stone-900 relative flex items-center justify-center overflow-hidden">
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="animate-spin text-white/50" size={48} strokeWidth={1} />
                      <p className="text-stone-300 font-light animate-pulse">{status}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-stone-600 dark:text-stone-400">
                       <div className="w-16 h-16 rounded-full bg-stone-800 flex items-center justify-center mb-2">
                          <Play className="ml-1 text-stone-500" size={32} />
                       </div>
                       <p className="text-sm font-light uppercase tracking-widest opacity-60">Preview Area</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-8">
              {!hasKey ? (
                <div className="text-center py-6">
                  <Lock className="mx-auto mb-4 text-stone-400" size={32} />
                  <p className="text-stone-600 dark:text-stone-300 mb-6 font-light">{t.videoDemo.note}</p>
                  <button
                    onClick={handleConnect}
                    className="px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
                  >
                    {t.videoDemo.connectBtn}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-stone-400 font-medium ml-1">Prompt</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t.videoDemo.placeholder}
                        disabled={isGenerating}
                        className="flex-1 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors"
                      />
                      <button
                        onClick={generateVideo}
                        disabled={!prompt || isGenerating}
                        className="px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-sm font-medium tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {isGenerating ? <Loader2 className="animate-spin" size={20}/> : t.videoDemo.generateBtn}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                     <p className="text-xs text-stone-400 mb-3 ml-1">Presets</p>
                     <div className="flex flex-wrap gap-2">
                       {t.videoDemo.presets.map((preset: string, idx: number) => (
                         <button
                           key={idx}
                           onClick={() => handlePresetClick(preset)}
                           disabled={isGenerating}
                           className="text-xs px-3 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-md transition-colors text-left"
                         >
                           {preset.length > 50 ? preset.substring(0, 50) + '...' : preset}
                         </button>
                       ))}
                     </div>
                  </div>
                </div>
              )}
            </div>

          </FadeIn>
        </div>
      </div>
    </section>
  );
};
