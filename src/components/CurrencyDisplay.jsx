import React from 'react';

export const formatRupee = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

export const CurrencyDisplay = ({ amount, label, size = 'medium' }) => {
    const fontSize = size === 'large' ? '3rem' : '1.5rem';
    const color = size === 'large' ? 'var(--primary)' : 'var(--text-main)';

    return (
        <div style={{ textAlign: 'center' }}>
            {label && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</p>}
            <h2 style={{ fontSize, color, fontWeight: 800, letterSpacing: '-0.02em' }}>
                {formatRupee(amount)}
            </h2>
        </div>
    );
};
