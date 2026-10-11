import React from 'react';
import { Star, CheckCircle, Flag, ArrowRight, Trophy } from 'lucide-react';

export interface ClientReview {
  id: string;
  name: string;
  carNumber: string;
  division: string;
  track: string;
  review: string;
  rating: number;
  season: string;
  gradient: string;
  accentColor: string;
  carBadge: string;
}

interface Client3DCardProps {
  client: ClientReview;
  onSelectTrack?: (track: string) => void;
}

export const Client3DCard: React.FC<Client3DCardProps> = ({ client }) => {
  return (
    <div className="uiverse-parent group select-none">
      <div
        className="uiverse-card"
        style={{
          background: client.gradient,
        }}
      >
        {/* Layer 1: Concentric 3D Expanding Circles with Car Number in Center */}
        <div className="uiverse-logo">
          <span className="circle circle1" />
          <span className="circle circle2" />
          <span className="circle circle3" />
          <span className="circle circle4" />
          <span
            className="circle circle5 text-white font-mono font-black"
            style={{ backgroundColor: client.accentColor }}
          >
            {client.carBadge}
          </span>
        </div>

        {/* Layer 2: 3D Frosted Glass Overlay */}
        <div className="uiverse-glass">
          {/* Top Tag */}
          <div className="absolute top-4 left-6 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-theme-muted">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: client.accentColor }}
            />
            <span className="truncate max-w-[150px]">{client.division}</span>
          </div>
        </div>

        {/* Layer 3: Text Content Elevated in 3D Space */}
        <div className="uiverse-content">
          <div className="flex items-center gap-1 text-amber-500 mb-1">
            {[...Array(client.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="ml-1 text-[11px] font-mono font-bold text-theme-muted">
              5.0
            </span>
          </div>

          <span
            className="title text-theme-primary group-hover:text-theme-accent transition-colors"
          >
            {client.name}
          </span>

          <span className="text text-theme-secondary line-clamp-4 leading-relaxed">
            "{client.review}"
          </span>
        </div>

        {/* Layer 4: 3D Bottom Actions and Badges */}
        <div className="uiverse-bottom">
          <div className="social-buttons-container">
            {/* Badge 1: Verified */}
            <button
              className="social-button text-emerald-600 hover:text-white"
              title="Verified Central PA Racer"
              type="button"
            >
              <CheckCircle className="w-4 h-4 fill-emerald-100 dark:fill-emerald-950" />
            </button>

            {/* Badge 2: Track Affiliation */}
            <button
              className="social-button text-blue-600 hover:text-white"
              title={client.track}
              type="button"
            >
              <Flag className="w-3.5 h-3.5" />
            </button>

            {/* Badge 3: Podium Trophy */}
            <button
              className="social-button text-amber-500 hover:text-white"
              title="Feature Race Podium Finisher"
              type="button"
            >
              <Trophy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="view-more">
            <span
              className="view-more-button text-xs font-mono font-extrabold"
              style={{ color: client.accentColor }}
            >
              {client.track.split(' ')[0]}
            </span>
            <ArrowRight
              className="w-3.5 h-3.5"
              style={{ color: client.accentColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
