import React, { useState, useRef, useEffect } from 'react';

const ALL_CUISINES = [
  'All',
  'African',
  'American',
  'Asian',
  'Brazilian',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Ethiopian',
  'French',
  'German',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Spanish',
  'Thai',
  'Turkish',
  'Vietnamese',
  'Other'
];

export const SearchableCuisineSelect = ({ value, onChange, includeAllOption = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  const cuisinesList = includeAllOption ? ALL_CUISINES : ALL_CUISINES.filter((c) => c !== 'All');

  const filteredCuisines = cuisinesList.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      {/* TRIGGER DISPLAY BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.6rem 0.75rem',
          borderRadius: '6px',
          border: '1px solid #D1D5DB',
          backgroundColor: '#FFFFFF',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#111827',
          boxSizing: 'border-box'
        }}
      >
        <span>{value || (includeAllOption ? 'All Cuisines' : 'Select Cuisine')}</span>
        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>▼</span>
      </button>

      {/* DROPDOWN MENU WITH SEARCH BAR */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.25rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #D1D5DB',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 50,
            maxHeight: '220px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* SEARCH INPUT BAR */}
          <div style={{ padding: '0.5rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
            <input
              type="text"
              placeholder="Type to filter cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '0.4rem 0.6rem',
                borderRadius: '4px',
                border: '1px solid #D1D5DB',
                fontSize: '0.85rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* CUISINE OPTIONS LIST */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filteredCuisines.length === 0 ? (
              <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#9CA3AF' }}>
                No cuisine matching "{searchTerm}"
              </div>
            ) : (
              filteredCuisines.map((c) => (
                <div
                  key={c}
                  onClick={() => {
                    onChange(c);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    backgroundColor: value === c ? '#E0F2FE' : 'transparent',
                    color: value === c ? '#0369A1' : '#374151',
                    fontWeight: value === c ? 'bold' : 'normal'
                  }}
                  onMouseEnter={(e) => {
                    if (value !== c) e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }}
                  onMouseLeave={(e) => {
                    if (value !== c) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {c === 'All' ? 'All Cuisines' : c}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};