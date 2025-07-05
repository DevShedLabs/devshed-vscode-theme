// extension.ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Combined Theme Adjuster
    const themeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    themeItem.text = '🎨 Theme';
    themeItem.tooltip = 'Adjust Theme Settings';
    themeItem.command = 'myTheme.adjustTheme';
    themeItem.show();
    context.subscriptions.push(themeItem);

    // Helper function to merge color customizations
    async function updateColorCustomizations(newColors: Record<string, any>) {
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
        if (!brightness) return;

        const shade = await vscode.window.showQuickPick(shadeOptions, { 
            placeHolder: 'Select theme shade',
            title: 'Theme Adjustment (2/3): Shade'
        });
        if (!shade) return;

        const font = await vscode.window.showQuickPick(fontOptions, { 
            placeHolder: 'Select font brightness',
            title: 'Theme Adjustment (3/3): Font'
        });
        if (!font) return;

        // Define color mappings
        const brightnessLevels: Record<string, any> = {
            Dark: { "editor.background": "#101A24", "editor.foreground": "#B2D0F7" },
            Normal: { "editor.background": "#16222A", "editor.foreground": "#EAF6FF" },
            Bright: { "editor.background": "#EAF6FF", "editor.foreground": "#101A24" }
        };

        const shadeLevels: Record<string, any> = {
            Blueish: { "sideBar.background": "#16222A", "panel.background": "#101A24" },
            Charcoal: { "sideBar.background": "#23272E", "panel.background": "#23272E" },
            Classic: { "sideBar.background": "#252526", "panel.background": "#1e1e1e" }
        };

        const fontLevels: Record<string, any> = {
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