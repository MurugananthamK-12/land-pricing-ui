import React from 'react';
import { MapPin, Maximize, Navigation, Droplets, Zap } from 'lucide-react';

const LandInput = ({ label, icon: Icon, value, onChange, min, max, unit }) => (
    <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Icon size={16} />
                {label}
            </label>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{value} {unit}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
        />
    </div>
);

export const LandInputs = ({ details, setDetails }) => {
    return (
        <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    <MapPin size={16} />
                    Location Name
                </label>
                <input
                    type="text"
                    value={details.location}
                    onChange={(e) => setDetails({ ...details, location: e.target.value })}
                    placeholder="e.g. Chennai, Urban Centre"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--card-border)',
                        color: 'white',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '0.75rem' }}>
                {['Urban', 'Rural'].map(type => (
                    <button
                        key={type}
                        onClick={() => setDetails({ ...details, type })}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: details.type === type ? 'var(--primary)' : 'transparent',
                            color: details.type === type ? 'white' : 'var(--text-muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {type} Land
                    </button>
                ))}
            </div>

            <LandInput
                label="Land Area"
                icon={Maximize}
                value={details.area}
                unit={details.type === 'Urban' ? 'SqFt' : 'Acres'}
                min={details.type === 'Urban' ? 500 : 1}
                max={details.type === 'Urban' ? 10000 : 50}
                onChange={(val) => setDetails({ ...details, area: val })}
            />

            <LandInput
                label="Distance from City Center"
                icon={Navigation}
                value={details.distance}
                unit="km"
                min={0}
                max={100}
                onChange={(val) => setDetails({ ...details, distance: val })}
            />

            <LandInput
                label="Infrastructure Rating"
                icon={Zap}
                value={details.infra}
                unit="/ 10"
                min={1}
                max={10}
                onChange={(val) => setDetails({ ...details, infra: val })}
            />

            {details.type === 'Rural' && (
                <LandInput
                    label="Soil Quality Index"
                    icon={Droplets}
                    value={details.soil}
                    unit="/ 10"
                    min={1}
                    max={10}
                    onChange={(val) => setDetails({ ...details, soil: val })}
                />
            )}
        </div>
    );
};
