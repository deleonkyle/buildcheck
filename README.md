# BuildCheck Application

## Project Description
Next.js web application for evaluating building safety scores based on structural configurations and soil parameters. Provides interactive score calculations for various building types defined in `lib/building-data.ts`.

## Installation
```bash
npm install
npm run dev
```

## Features
- 12 predefined building types with safety parameters
- Score calculation with modifiers for:
  - Vertical irregularities
  - Plan irregularities
  - Soil conditions
  - Historical code compliance

## Configuration
Building parameters are maintained in:
```typescript
lib/building-data.ts
```

## Development Server
Access the running application at:
http://localhost:3000/

## Building for Production
```bash
npm run build
npm run start
```

## Deployment
Optimized for Vercel deployment. Includes:
- Next.js static generation
- TypeScript support
- Responsive UI components

## License
MIT Licensed. See LICENSE for details.