# Graph Report - test3  (2026-11-05)

## Corpus Check
- 19 files · ~156,277 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .woff2 12, .css 3, (none) 1)

## Summary
- 122 nodes · 190 edges · 7 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- package.json
- App.tsx
- ThreeUI KiboriLandingPage Integration - Implementation Report
- compilerOptions
- BookingSection.tsx
- RoomsSection.tsx
- Project Overview

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `react` - 11 edges
3. `App()` - 11 edges
4. `Project Overview` - 9 edges
5. `BookingSection()` - 6 edges
6. `ThreeUI KiboriLandingPage Integration - Implementation Report` - 6 edges
7. `scripts` - 5 edges
8. `ROOMS` - 5 edges
9. `createBooking()` - 5 edges
10. `todayISO()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Component Integration` --references--> `KiboriLandingPage()`  [INFERRED]
  IMPLEMENTATION_REPORT.md → src/shaders/kibori-landing-page/KiboriLandingPage.tsx
- `App()` --calls--> `BookingSection()`  [EXTRACTED]
  src/App.tsx → src/components/BookingSection.tsx
- `App()` --calls--> `RoomsSection()`  [EXTRACTED]
  src/App.tsx → src/components/RoomsSection.tsx
- `ContactSection()` --calls--> `sendInquiry()`  [EXTRACTED]
  src/components/ContactSection.tsx → src/lib/bookingApi.ts
- `SearchBar()` --calls--> `todayISO()`  [EXTRACTED]
  src/components/SearchBar.tsx → src/lib/dates.ts

## Import Cycles
- None detected.

## Communities (7 total, 0 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.09
Nodes (24): browserslist, development, production, dependencies, react@^18.2.0, react-dom@^18.2.0, react-scripts@5.0.1, description (+16 more)

### Community 1 - "App.tsx"
Cohesion: 0.16
Nodes (13): react, react-dom, App(), Amenities, Amenity, ContactSection(), SearchBar(), SiteFooter() (+5 more)

### Community 2 - "ThreeUI KiboriLandingPage Integration - Implementation Report"
Cohesion: 0.11
Nodes (18): A. ThreeUI Integration, B. Hotel Booking Adaptation, Binary Asset Verification, Build and Test Status, C. ReactJS Application, Component Integration, Content Changes Applied, D. Obsidian and Graphify (+10 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+9 more)

### Community 4 - "BookingSection.tsx"
Cohesion: 0.29
Nodes (11): BookingSection(), Props, ROOMS, BookingConfirmation, BookingRequest, createBooking(), delay(), InquiryRequest (+3 more)

### Community 5 - "RoomsSection.tsx"
Cohesion: 0.27
Nodes (9): Props, RoomCard(), Props, RoomsSection(), Props, SearchCriteria, Room, ROOM_TYPE_LABELS (+1 more)

### Community 6 - "Project Overview"
Cohesion: 0.20
Nodes (9): Description, Key Objectives, Links, Primary Technology Stack, Project Context, Project Name, Project Overview, Source Reference (+1 more)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `package.json`, `BookingSection.tsx`, `RoomsSection.tsx`?**
  _High betweenness centrality (0.233) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09333333333333334 - nodes in this community are weakly interconnected._
- **Why does `KiboriLandingPage()` connect `App.tsx` to `ThreeUI KiboriLandingPage Integration - Implementation Report`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **Should `ThreeUI KiboriLandingPage Integration - Implementation Report` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `Component Integration` connect `ThreeUI KiboriLandingPage Integration - Implementation Report` to `App.tsx`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._