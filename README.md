# HROne Frontend Task - JSON Schema Builder

A dynamic, interactive web application for building JSON schemas with real-time preview and validation. Built with React and modern web development best practices.

🌐 **Live Demo**: [https://hr-one-frontend-task-beryl.vercel.app/](https://hr-one-frontend-task-beryl.vercel.app/)

## ✨ Features

### Core Functionality
- **Dynamic Field Management**: Add, edit, and remove schema fields on the fly
- **Nested Field Support**: Create complex nested object structures with unlimited depth
- **Real-time JSON Preview**: See your schema update instantly as you make changes
- **Required Field Toggles**: Mark fields as required/optional with intuitive switches
- **Responsive Design**: Seamless experience across desktop and mobile devices

### Supported Field Types
- String
- Number
- Object (with nested properties)

### Smart Defaults
The application comes pre-loaded with example fields (name, class, address) to demonstrate functionality immediately. Users can clear all fields and start fresh or build upon the examples.

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── SchemaBuilder.tsx    # Main left panel component
│   ├── JsonPreview.tsx      # Right panel JSON display
│   ├── FieldRow.tsx         # Individual field management
│   └── CustomSwitch.tsx     # Reusable toggle component
├── hooks/
│   └── useSchemaBuilder.ts  # Custom hook for state management
├── utils/
│   └── utils.ts             # Helper functions
└── types/
    └── schema.ts            # TypeScript interfaces
```

### Design Decisions

#### Custom Hook Pattern (`useSchemaBuilder`)
- Centralized all state management logic in a custom hook
- Implemented `useCallback` for performance optimization
- Clean separation between business logic and UI components
- Makes components easily testable and reusable

#### Component Separation Strategy
- **CustomSwitch**: Extracted toggle component for reusability across the app
- **FieldRow**: Modular field management with optimized callback handling
- **SchemaBuilder**: Left panel logic isolated for better maintainability
- **JsonPreview**: Right panel extracted for cleaner organization

## 🔧 Technical Implementation

### State Management
- React's built-in `useState` for local component state
- Custom hook pattern for sharing logic across components
- Immutable state updates for predictable behavior

### Utility Functions
- `generateId()`: Creates unique identifiers for fields
- `getDefaultValue()`: Returns appropriate defaults based on field type
- `buildJsonSchema()`: Converts internal state to valid JSON schema format

### Responsive Layout
- **Desktop**: Side-by-side layout with schema builder on left, JSON preview on right
- **Mobile/Tablet**: Stacked layout with schema builder on top, preview below
- Smooth transitions between layouts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd hrOne-frontend-task

# Install dependencies
npm install

# Start development server
npm start
```

### Building for Production
```bash
npm run build
```

## 🎯 Key Features Breakdown

### Dynamic Field Management
- Add new fields with different types
- Nest objects infinitely deep
- Remove fields with a single click
- Real-time interface updates without page refreshes

### Real-time Validation
The JSON preview updates instantly as users make changes, providing immediate feedback on schema structure and validity.
