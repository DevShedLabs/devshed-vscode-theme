"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
// extension.ts
const vscode = __importStar(require("vscode"));
function activate(context) {
    // Combined Theme Adjuster
    const themeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    themeItem.text = '🎨 Theme';
    themeItem.tooltip = 'Adjust Theme Settings';
    themeItem.command = 'myTheme.adjustTheme';
    themeItem.show();
    context.subscriptions.push(themeItem);
    // Helper function to merge color customizations
    async function updateColorCustomizations(newColors) {
        const config = vscode.workspace.getConfiguration();
        const existingColors = config.get('workbench.colorCustomizations') || {};
        const mergedColors = { ...existingColors, ...newColors };
        await config.update('workbench.colorCustomizations', mergedColors, vscode.ConfigurationTarget.Global);
    }
    // Combined Theme Adjustment Command
    context.subscriptions.push(vscode.commands.registerCommand('myTheme.adjustTheme', async () => {
        const brightnessOptions = ['Dark', 'Normal', 'Bright'];
        const shadeOptions = ['Blueish', 'Charcoal', 'Classic'];
        const fontOptions = ['Dim', 'Normal', 'Bright'];
        const brightness = await vscode.window.showQuickPick(brightnessOptions, {
            placeHolder: 'Select brightness level',
            title: 'Theme Adjustment (1/3): Brightness'
        });
        if (!brightness)
            return;
        const shade = await vscode.window.showQuickPick(shadeOptions, {
            placeHolder: 'Select theme shade',
            title: 'Theme Adjustment (2/3): Shade'
        });
        if (!shade)
            return;
        const font = await vscode.window.showQuickPick(fontOptions, {
            placeHolder: 'Select font brightness',
            title: 'Theme Adjustment (3/3): Font'
        });
        if (!font)
            return;
        // Define color mappings
        const brightnessLevels = {
            Dark: { "editor.background": "#101A24", "editor.foreground": "#B2D0F7" },
            Normal: { "editor.background": "#16222A", "editor.foreground": "#EAF6FF" },
            Bright: { "editor.background": "#EAF6FF", "editor.foreground": "#101A24" }
        };
        const shadeLevels = {
            Blueish: { "sideBar.background": "#16222A", "panel.background": "#101A24" },
            Charcoal: { "sideBar.background": "#23272E", "panel.background": "#23272E" },
            Classic: { "sideBar.background": "#252526", "panel.background": "#1e1e1e" }
        };
        const fontLevels = {
            Dim: { "editorLineNumber.foreground": "#3C4A5A" },
            Normal: { "editorLineNumber.foreground": "#7CA7D9" },
            Bright: { "editorLineNumber.foreground": "#B2D0F7" }
        };
        // Merge all settings
        const combinedSettings = {
            ...brightnessLevels[brightness],
            ...shadeLevels[shade],
            ...fontLevels[font]
        };
        await updateColorCustomizations(combinedSettings);
        vscode.window.showInformationMessage(`Theme updated: ${brightness} brightness, ${shade} shade, ${font} font`);
    }));
}
//# sourceMappingURL=extension.js.map