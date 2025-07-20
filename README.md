# HROne_Frontend_task
Frontend task for HROne
JSON Schema Builder
A dynamic, interactive web application for building JSON schemas with real-time preview and validation. Built with React and modern web development best practices.

Dynamic Field Management: Add, edit, and remove schema fields on the fly
Nested Field Support: Create complex nested object structures
Real-time JSON Preview: See your schema update instantly as you make changes
Required Field Toggles: Mark fields as required/optional with intuitive switches
Responsive Design: Seamless experience across desktop and mobile devices

Field Types Supported

String
Number



Architecture
Component Structure
src/
├── components/
│   ├── SchemaBuilder.tsx     # Main left panel component
│   ├── JsonPreview.tsx       # Right panel JSON display
│   ├── FieldRow.tsx          # Individual field management
│   └── CustomSwitch.tsx      # Reusable toggle component
├── hooks/
│   └── useSchemaBuilder.ts   # Custom hook for state management
├── utils/
│   └── utils.ts              # Helper functions
└── types/
    └── schema.ts             # TypeScript interfaces
Design Decisions
Custom Hook Pattern (useSchemaBuilder)

Centralized all state management logic in a custom hook
Implemented useCallback for performance optimization
Clean separation between business logic and UI components
Makes the component easily testable and reusable

Component Separation Strategy

CustomSwitch: Extracted toggle component for reusability across the app
FieldRow: Modular field management with optimized callback handling
SchemaBuilder: Left panel logic isolated for better maintainability
JsonPreview: Right panel extracted for cleaner organization


Technical Implementation
State Management

Used React's built-in useState for local component state
Custom hook pattern for sharing logic across components
Immutable state updates for predictable behavior

Utility Functions

generateId(): Creates unique identifiers for fields
getDefaultValue(): Returns appropriate defaults based on field type
buildJsonSchema(): Converts internal state to valid JSON schema format

Key Features Breakdown
Dynamic Field Management
Users can add new fields with different types, nest objects infinitely deep, and remove fields with a single click. The interface updates in real-time without page refreshes.
Smart Defaults
The application comes pre-loaded with common fields (name, class, address) to demonstrate functionality immediately. Users can clear all fields and start fresh or build upon the examples.
Responsive Layout

Desktop: Side-by-side layout with schema builder on left, JSON preview on right
Mobile/Tablet: Stacked layout with schema builder on top, preview below
Smooth transitions between layouts

Real-time Validation
The JSON preview updates instantly as users make changes, providing immediate feedback on schema structure and validity.
Getting Started
Prerequisites

Node.js (v14 or higher)
npm or yarn

Installation
bash# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm start
Building for Production
bashnpm run build
🧪 Development Approach
Problem-Solving Process

Initial Challenge: Managing complex nested state while maintaining performance
Solution: Implemented custom hook pattern with optimized callbacks
Iteration: Refactored from monolithic component to modular architecture
Optimization: Added performance optimizations and proper TypeScript typing

Code Quality Standards

Consistent naming conventions throughout the codebase
Comprehensive error handling for edge cases
Accessible HTML with semantic markup
Clean, self-documenting code with strategic comments

Testing Considerations
The modular architecture makes unit testing straightforward:

Custom hook can be tested independently
UI components are pure and easily testable
Utility functions are isolated and deterministic


Accessibility

Proper semantic HTML structure
Keyboard navigation support
Screen reader friendly labels
High contrast color scheme

 Future Enhancements
Potential areas for expansion:

Import/Export functionality for schemas
Schema validation against sample data
Advanced field types (dates, enums, etc.)
Collaborative editing features
Schema versioning and history

Built with attention to real-world development practices and scalability considerations.
Visit the site https://hr-one-frontend-task-beryl.vercel.app/
Deployed Using vercel