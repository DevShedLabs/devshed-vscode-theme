# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and compile automatically
- `npm run package` - Package the extension for distribution using vsce
- `npm run publish` - Publish the extension to the marketplace

## Architecture

This is a VSCode theme extension with custom commands for theme adjustment. The project has two main components:

1. **Theme Definition** (`themes/DevShed VSCode Theme-color-theme.json`): JSON file containing the complete color palette based on DevShed's blue-grey aesthetic with colors like `#0b1621`, `#101A24`, `#EAF6FF`, and `#B2D0F7`.

2. **Extension Code** (`extension.ts`): TypeScript file that provides interactive theme adjustment commands via status bar items:
   - Brightness adjustment (Dark/Normal/Bright)
   - Shade adjustment (Blueish/Charcoal/Classic)  
   - Font brightness adjustment (Dim/Normal/Bright)

The extension modifies VSCode's `workbench.colorCustomizations` setting to apply theme variants dynamically.

## Build Process

- TypeScript compiles to `out/extension.js` (main entry point)
- Uses standard VSCode extension structure with `package.json` manifest
- Packaged as `.vsix` file for distribution