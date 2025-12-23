import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, Zap, TrendingUp, CheckCircle, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { formatRupee, CurrencyDisplay } from './CurrencyDisplay';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pipelineStages = [
    { id: 'data', name: 'Raw Data', icon: Database, color: '#3b82f6' },
    { id: 'ml', name: 'ML Model', icon: Cpu, color: '#8b5cf6' },
    { id: 'genai', name: 'GenAI Context', icon: Sparkles, color: '#ef4444' }
];

const mockHistoricalData = [
    { name: '2020', price: 4500000 },
    { name: '2021', price: 4800000 },
    { name: '2022', price: 5500000 },
    { name: '2023', price: 6200000 },
    { name: '2024', price: 7100000 },
    { name: '2025', price: 8500000 },
];

export const ValuationDashboard = ({ landDetails, isPredicting }) => {
    const [activeStage, setActiveStage] = useState(0);

    // Simple dummy calculation logic
    const baseRate = landDetails.type === 'Urban' ? 5000 : 500000;
    const rawPrice = landDetails.area * baseRate;
    const distanceFactor = Math.max(0.2, (100 - landDetails.distance) / 100);
    const infraFactor = 1 + (landDetails.infra / 10);
    const mlPrice = rawPrice * distanceFactor * infraFactor;
    const finalPrice = mlPrice * 1.15; // GenAI premium

    useEffect(() => {
        if (isPredicting) {
            let stage = 0;
            const interval = setInterval(() => {
                if (stage < 2) {
                    stage++;
                    setActiveStage(stage);
                } else {
                    clearInterval(interval);
                }
            }, 1500);
            return () => clearInterval(interval);
        } else {
            setActiveStage(0);
        }
    }, [isPredicting]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Pipeline Visualization */}
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {pipelineStages.map((stage, index) => (
                    <React.Fragment key={stage.id}>
                        <div style={{ textAlign: 'center', position: 'relative', opacity: index <= activeStage ? 1 : 0.3, transition: 'opacity 0.5s' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: index === activeStage ? `${stage.color}30` : 'rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: index === activeStage ? stage.color : 'var(--text-muted)',
                                border: `2px solid ${index === activeStage ? stage.color : 'transparent'}`,
                                margin: '0 auto 0.75rem',
                                boxShadow: index === activeStage ? `0 0 20px ${stage.color}40` : 'none'
                            }}>
                                <stage.icon size={24} />
                            </div>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{stage.name}</p>
                        </div>
                        {index < pipelineStages.length - 1 && (
                            <div style={{ flex: 1, padding: '0 1rem', height: '2px', background: 'var(--card-border)', position: 'relative', top: '-12px' }}>
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: index < activeStage ? '100%' : '0%' }}
                                    style={{ height: '100%', background: pipelineStages[index].color }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>{landDetails.location}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Valuation Analysis Result</p>
                    </div>
                    <CurrencyDisplay label="ML Model Base Prediction" amount={mlPrice} />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: activeStage === 2 ? 1 : 0.5, scale: activeStage === 2 ? 1 : 0.9 }}
                    >
                        <div style={{ borderTop: '1px solid var(--card-border)', pt: '2rem', mt: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', color: '#ef4444', marginBottom: '0.5rem' }}>
                                <Sparkles size={16} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>GENAI ENHANCED</span>
                            </div>
                            <CurrencyDisplay label="Final Predicted Value" amount={finalPrice} size="large" />
                        </div>
                    </motion.div>
                </div>

                {/* Trend Visualization */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={18} color="var(--primary)" />
                        Market Value Projection
                    </h4>
                    <div style={{ width: '100%', height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockHistoricalData}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    formatter={(value) => formatRupee(value)}
                                />
                                <Area type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
