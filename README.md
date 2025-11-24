# VizSector - Flourish Studio Clone

A powerful data visualization platform inspired by Flourish Studio, built with React, TypeScript, and modern web technologies.

## Features

### 📊 Multiple Chart Types (16+ Templates)
- **Bar Chart** - Compare values across categories
- **Line Chart** - Show trends over time
- **Area Chart** - Visualize cumulative totals
- **Pie Chart** - Show proportions of a whole
- **Donut Chart** - Modern pie chart variation
- **Scatter Plot** - Find correlations between variables
- **Column Chart** - Vertical bar chart
- **Stacked Bar Chart** - Compare parts of a whole across categories
- **Stacked Area Chart** - Show contribution of parts to a total over time
- **Radar Chart** - Compare multiple variables
- **Treemap** - Hierarchical data visualization
- **Radial Bar Chart** - Circular bar chart
- **Bubble Chart** - Three-dimensional data points
- **Composed Chart** - Combine multiple chart types
- **Funnel Chart** - Visualize stages in a process
- **Bar Chart Race** - Animated racing bar chart

### 📁 Data Import
- **CSV Files** - Import comma-separated values
- **JSON Files** - Import structured JSON data
- **Excel Files** - Import .xlsx and .xls spreadsheets
- **Sample Data** - Quick start with pre-generated data

### 🎨 Customization
- **Multiple Color Schemes** - Choose from beautiful pre-built palettes
- **Title Customization** - Name your visualizations
- **Legend & Grid Controls** - Toggle display options
- **Axis Configuration** - Select X and Y axis columns
- **Animation Settings** - Control animation duration and enable/disable

### 💾 Export Options
- **PNG Export** - High-quality raster images
- **SVG Export** - Scalable vector graphics
- **JSON Export** - Save data and configuration

### 🎬 Animation
- **Play/Pause Controls** - Control animation playback
- **Frame Scrubbing** - Navigate through animation frames
- **Configurable Duration** - Adjust animation speed

### 📋 Data View
- **Interactive Table** - View and browse your data
- **Column Information** - See dataset statistics
- **Responsive Design** - Works on all screen sizes

### ☁️ Cloud Features (Powered by Supabase)
- **User Authentication** - Sign in with email, Google, or GitHub
- **Save to Cloud** - Store visualizations securely in the cloud
- **Load Projects** - Access your saved visualizations from anywhere
- **Public/Private Sharing** - Control who can see your visualizations
- **Project Management** - Organize and manage all your visualizations
- **Duplicate Projects** - Quickly create copies of visualizations
- **User Profiles** - Personalize your account with name and avatar

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Supabase Setup (Optional - for Cloud Features)

To enable cloud features like authentication and saving projects:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy `.env.example` to `.env`
4. Add your Supabase credentials to `.env`:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Run the database migration (see `SUPABASE_SETUP.md` for detailed instructions)

**Note:** The app works perfectly without Supabase for local-only use. Cloud features are entirely optional!

### Quick Start

1. **Import Data**
   - Click "Import Data" to upload CSV, JSON, or Excel files
   - Or click "Load Sample Data" to try it out immediately

2. **Choose a Template**
   - Select from 8+ chart templates in the sidebar
   - Each template is optimized for different data types

3. **Customize**
   - Use the Properties panel to adjust colors, titles, and settings
   - Toggle between Visualization and Data views

4. **Animate (Optional)**
   - Enable animations in the Properties panel
   - Use the animation controls to play, pause, or scrub

5. **Export**
   - Export your visualization as PNG, SVG, or JSON
   - Share or embed in your projects

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Recharts** - Chart rendering
- **D3.js** - Data visualization utilities
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **PapaParse** - CSV parsing
- **XLSX** - Excel file support
- **Lucide React** - Icons

## Project Structure

```
VizSector/
├── src/
│   ├── components/        # React components
│   │   ├── AnimationController.tsx
│   │   ├── ChartRenderer.tsx
│   │   ├── DataTable.tsx
│   │   ├── PropertiesPanel.tsx
│   │   └── Sidebar.tsx
│   ├── store/            # State management
│   │   └── useStore.ts
│   ├── templates/        # Chart templates
│   │   └── index.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── utils/           # Utilities
│   │   ├── dataImport.ts
│   │   └── export.ts
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── package.json
└── README.md
```

## Features Comparison with Flourish Studio

| Feature | VizSector | Flourish Studio |
|---------|-----------|-----------------|
| Multiple Chart Types | ✅ | ✅ |
| Data Import (CSV/JSON/Excel) | ✅ | ✅ |
| Interactive Customization | ✅ | ✅ |
| Animation Controls | ✅ | ✅ |
| Export (PNG/SVG/JSON) | ✅ | ✅ |
| Template System | ✅ | ✅ |
| Real-time Preview | ✅ | ✅ |
| Cloud Storage | ❌ | ✅ |
| Team Collaboration | ❌ | ✅ |
| Advanced Maps | 🚧 | ✅ |

## Roadmap

- [ ] Bar Chart Race animation implementation
- [ ] Advanced map visualizations
- [ ] More chart types (Gantt, Sankey, Network)
- [ ] Cloud storage integration
- [ ] Collaborative editing
- [ ] Custom color picker
- [ ] Advanced data transformations
- [ ] Template marketplace

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- Inspired by [Flourish Studio](https://flourish.studio/)
- Built with modern web technologies
- Charts powered by Recharts and D3.js
