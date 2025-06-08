# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Setup and Development:**

```bash
yarn install
yarn build:prebuild  # Required first - builds search index, icons, etc.
yarn dev             # Start development server
yarn dev:ssl         # Development server with HTTPS
```

**Testing and Quality:**

```bash
yarn test            # Jest unit tests
yarn e2e            # Playwright end-to-end tests
yarn e2e:ui         # Playwright with UI
yarn eslint         # Lint TypeScript/React code
yarn stylelint      # Lint styled-components
yarn prettier       # Format code
```

**Build and Deploy:**

```bash
yarn build          # Production build (static export)
yarn serve          # Serve built application
```

## Architecture Overview

daedalOS is a **web-based desktop environment** built with Next.js that simulates a complete operating system in the browser.

### Core Architecture Pattern

**Process-Based Application Model:**

- Each "app" is a managed process with unique ID, window properties, and lifecycle
- Apps register in `/contexts/process/directory.ts` with configuration (size, libraries, file extensions)
- Dynamic imports enable code splitting and lazy loading

**Context-Driven State Management:**

- `FileSystemProvider` - Virtual file system using BrowserFS with IndexedDB persistence
- `ProcessProvider` - Manages running applications and window states
- `SessionProvider` - User preferences, themes, and session data
- `ViewportProvider` - Screen dimensions and responsive behavior
- `MenuProvider` - Context menu system

**Component Hierarchy:**

```
Desktop (main container)
├── FileManager (renders desktop files/shortcuts)
├── Taskbar (start menu, running apps, clock, AI assistant)
└── AppsLoader (manages active application windows)
    └── Windows (individual app containers with titlebar/controls)
```

### Key Architectural Concepts

**Virtual File System:**

- Windows-like file system with folders, shortcuts, file associations
- ZIP/ISO mounting support for emulators and complex applications
- File operations handled through BrowserFS abstraction

**App Integration Pattern:**

- Each app follows `/components/apps/AppName/` structure
- `index.tsx` (main component), `StyledAppName.ts` (styling), `config.ts` (app properties)
- External dependencies loaded from `/public/Program Files/AppName/`
- Apps can specify required libraries, supported file extensions, window behavior

**Styling System:**

- Themed styled-components with consistent design tokens in `/styles/defaultTheme/`
- Framer Motion integration for animations and transitions
- Responsive design patterns using viewport context

### Component Organization Rules

**Apps Directory (`/components/apps/`):**

- Self-contained application components (30+ desktop applications)
- Each app exports default component, config object, and optional hooks
- Apps should handle their own loading states and error boundaries

**System Directory (`/components/system/`):**

- Core OS components: Desktop, Taskbar, Windows, Dialogs, File Management
- Shared UI patterns used across the desktop environment
- Should not contain app-specific logic

**Process Registration:**

- Add new apps to `/contexts/process/directory.ts`
- Specify supported file extensions, default window size, required libraries
- Use consistent naming convention matching component directory

### File System Conventions

**Public Assets:**

- App dependencies in `/public/Program Files/AppName/`
- System resources in `/public/System/`
- User data persisted in browser IndexedDB

**Import Patterns:**

- Use dynamic imports for apps: `() => import("components/apps/AppName")`
- Context imports from `/contexts/`
- Utilities from `/utils/`
- Hooks from `/hooks/`

### Testing Approach

**Unit Tests (Jest):**

- Focus on utility functions and custom hooks
- Located in `__tests__/` directories
- Test file pattern: `*.spec.ts`

**E2E Tests (Playwright):**

- Test complete user workflows across the desktop environment
- Located in `/e2e/` directory
- Test major app functionality and system interactions
