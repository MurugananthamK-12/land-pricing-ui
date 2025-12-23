import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Loader2, Sparkles, Building2, Trees } from 'lucide-react';
import { LandInputs } from './components/LandInputs';
import { ValuationDashboard } from './components/ValuationDashboard';
import './App.css';

function App() {
    const [landDetails, setLandDetails] = useState({
        location: 'Chennai Suburban',
        type: 'Urban',
        area: 1200,
        distance: 5,
        infra: 7,
        soil: 5,
        nitrogen: 45,
        phosphorus: 30,
        potassium: 25
    });

    const [isPredicting, setIsPredicting] = useState(false);

    const handlePredict = () => {
        setIsPredicting(true);
        // Simulation reset
        setTimeout(() => {
            // Logic handled in ValuationDashboard
        }, 4500);
    };

    return (
        <div className="container" style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '3rem' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.5rem 1.25rem', borderRadius: '2rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}
                >
                    <Sparkles size={18} color="var(--primary)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--primary)' }}>GENAI PRICING ENGINE</span>
                </motion.div>

                <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Real Estate Valuation AI
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Smart Land Assessment for Urban & Rural Development
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
                        <Map size={24} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.25rem' }}>Land Features</h3>
                    </div>

                    <LandInputs details={landDetails} setDetails={setLandDetails} />

                    <button
                        className="glow-button"
                        style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
                        onClick={handlePredict}
                        disabled={isPredicting}
                    >
                        {isPredicting ? (
                            <>
                                <Loader2 className="spin" size={20} />
                                Analysing Assets...
                            </>
                        ) : (
                            'Calculate Valuation'
                        )}
                    </button>

                    <div className="glass-card" style={{ padding: '1.5rem', fontSize: '0.85rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>Current Context</h4>
                        <ul style={{ listStyle: 'none', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {landDetails.type === 'Urban' ? <Building2 size={14} /> : <Trees size={14} />}
                                Property Type: {landDetails.type}
                            </li>
                            <li>• Indian Market Volatility: Low</li>
                            <li>• GenAI Sentiment: Positive (Infrastructure Expansion)</li>
                        </ul>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <ValuationDashboard landDetails={landDetails} isPredicting={isPredicting} />
                </div>
            </div>
        </div>
    );
}

export default App;
