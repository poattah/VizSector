import React from 'react';
import { EconomistColors, EconomistChartStyle, EconomistTypography } from '../styles/economist-theme';

interface EconomistChartWrapperProps {
  title: string;
  subtitle?: string;
  dataSource?: string;
  children: React.ReactNode;
  economistMode?: boolean;
}

/**
 * Wraps charts with The Economist's distinctive styling:
 * - Red horizontal bar at the top
 * - Red tag/logo placeholder in top-left
 * - Clean white background
 * - Data source attribution at bottom
 * - Proper spacing and typography
 */
export const EconomistChartWrapper: React.FC<EconomistChartWrapperProps> = ({
  title,
  subtitle,
  dataSource,
  children,
  economistMode = false,
}) => {
  if (!economistMode) {
    // Render without Economist styling
    return (
      <div className="h-full flex flex-col p-6 bg-background animate-fade-in">
        <h2 className="text-2xl font-semibold mb-2 text-foreground tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>}
        <div className="flex-1">{children}</div>
        {dataSource && (
          <p className="text-xs text-muted-foreground mt-4">Source: {dataSource}</p>
        )}
      </div>
    );
  }

  // Render with Economist styling
  return (
    <div
      className="h-full flex flex-col bg-white relative"
      style={{
        fontFamily: EconomistTypography.fonts.primary,
      }}
    >
      {/* Red top bar - signature Economist element */}
      <div
        style={{
          height: `${EconomistChartStyle.topBar.height}px`,
          backgroundColor: EconomistColors.economistRed,
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Red tag (logo placeholder) */}
      <div
        style={{
          width: `${EconomistChartStyle.tag.width}px`,
          height: `${EconomistChartStyle.tag.height}px`,
          backgroundColor: EconomistColors.economistRed,
          position: 'absolute',
          top: EconomistChartStyle.topBar.height,
          left: EconomistChartStyle.spacing.left,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="40"
          height="24"
          viewBox="0 0 40 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="8" height="24" fill="white" />
          <rect x="10" y="0" width="8" height="24" fill="white" />
          <rect x="20" y="0" width="8" height="24" fill="white" />
          <rect x="30" y="0" width="8" height="24" fill="white" />
        </svg>
      </div>

      {/* Content area */}
      <div
        style={{
          paddingTop: `${EconomistChartStyle.spacing.top}px`,
          paddingRight: `${EconomistChartStyle.spacing.right}px`,
          paddingBottom: `${EconomistChartStyle.spacing.bottom}px`,
          paddingLeft: `${EconomistChartStyle.spacing.left}px`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title and subtitle */}
        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: EconomistTypography.sizes.chartTitle,
              fontWeight: EconomistTypography.weights.title,
              lineHeight: EconomistTypography.lineHeights.title,
              color: EconomistColors.grey.text,
              margin: 0,
              marginBottom: subtitle ? '8px' : '0',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: EconomistTypography.sizes.chartSubtitle,
                fontWeight: EconomistTypography.weights.subtitle,
                lineHeight: EconomistTypography.lineHeights.subtitle,
                color: EconomistColors.grey.medium,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Chart content */}
        <div style={{ flex: 1, position: 'relative' }}>{children}</div>

        {/* Data source attribution */}
        {dataSource && (
          <div
            style={{
              marginTop: '16px',
              fontSize: EconomistTypography.sizes.source,
              color: EconomistColors.grey.medium,
              opacity: EconomistChartStyle.source.opacity,
            }}
          >
            Source: {dataSource}
          </div>
        )}
      </div>
    </div>
  );
};
