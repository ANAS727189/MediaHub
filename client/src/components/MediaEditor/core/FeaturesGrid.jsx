import { useState } from 'react';
import { ToggleTheme } from '../../../context/UserContext';
import FeatureCard from '../core/FeatureCard';
import { ALL_TOOLS, IMAGE_TOOLS, VIDEO_TOOLS, CONVERSION_TOOLS } from '../constants/toolsConfig';
import { Filter } from 'lucide-react';

const FeaturesGrid = ({ onFeatureClick }) => {
    const { darkMode } = ToggleTheme();
    const [activeFilter, setActiveFilter] = useState('all');

    const getFilteredTools = () => {
        switch (activeFilter) {
        case 'image':
            return IMAGE_TOOLS;
        case 'video':
            return VIDEO_TOOLS;
        case 'conversion':
            return CONVERSION_TOOLS;
        default:
            return ALL_TOOLS;
        }
    };

    const filterOptions = [
        { id: 'all', label: 'All Tools', count: ALL_TOOLS.length },
        { id: 'image', label: 'Image', count: IMAGE_TOOLS.length },
        { id: 'video', label: 'Video', count: VIDEO_TOOLS.length },
        { id: 'conversion', label: 'Convert', count: CONVERSION_TOOLS.length }
    ];

    return (
        <div>
        {/* Filter Bar */}
        <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-violet-600" />
                <h3 className="text-lg font-semibold">Filter Tools</h3>
            </div>
            <span className="text-sm text-gray-500">
                {getFilteredTools().length} tools available
            </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
                <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === option.id
                    ? 'bg-violet-600 text-white'
                    : darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                {option.label} ({option.count})
                </button>
            ))}
            </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {getFilteredTools().map((feature, index) => (
            <FeatureCard
                key={`${feature.id}-${index}`}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                category={feature.category}
                onClick={() => onFeatureClick(feature.id)}
            />
            ))}
        </div>

        {/* Category Info */}
        {activeFilter !== 'all' && (
            <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="text-sm text-gray-500">
                {activeFilter === 'image' && (
                <p>Image tools help you resize, crop, enhance, and transform your photos with professional-grade features.</p>
                )}
                {activeFilter === 'video' && (
                <p>Video tools provide comprehensive video editing capabilities including trimming, effects, and audio processing.</p>
                )}
                {activeFilter === 'conversion' && (
                <p>Conversion tools enable you to transform your media between different formats and file types.</p>
                )}
            </div>
            </div>
        )}
        </div>
    );
};

export default FeaturesGrid;
