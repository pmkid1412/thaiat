import esbuild from 'esbuild';
import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

async function build() {
    console.log("🚀 Starting Build Process...");

    const distDir = './dist';
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir);
    }

    // 1. Bundle with esbuild (ESM -> CJS for pkg compatibility)
    console.log("📦 Bundling with esbuild...");
    try {
        await esbuild.build({
            entryPoints: ['server_engine.js'], // Changed to server_engine.js
            bundle: true,
            platform: 'node',
            target: 'node18', // Target a recent Node version
            outfile: 'dist/server_bundle.js',
            format: 'cjs', // Convert to CommonJS for pkg
            external: ['pkg', 'javascript-obfuscator', 'esbuild'], // Exclude build tools
        });
        console.log("✅ Bundling complete: dist/server_bundle.js");
    } catch (e) {
        console.error("❌ Bundling failed:", e);
        process.exit(1);
    }

    // 2. Obfuscate
    console.log("🔒 Obfuscating code...");
    try {
        const code = fs.readFileSync('dist/server_bundle.js', 'utf8');
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: false, // Disabled to reduce size
            deadCodeInjection: false,     // Disabled to reduce size
            debugProtection: false,
            debugProtectionInterval: 0,
            disableConsoleOutput: false,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: false,          // Disabled to avoid string size limits
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayEncoding: [],      // Reduced encoding
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 1,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 2,
            stringArrayWrappersType: 'variable',
            stringArrayThreshold: 0.75,
            target: 'node',
            unicodeEscapeSequence: false
        });

        fs.writeFileSync('dist/server_bundle.obfuscated.js', obfuscationResult.getObfuscatedCode());
        console.log("✅ Obfuscation complete: dist/server_bundle.obfuscated.js");
    } catch (e) {
        console.error("❌ Obfuscation failed:", e);
        process.exit(1);
    }

    // 3. Package with pkg
    console.log("📦 Packaging into binary...");
    try {
        // We use the 'pkg' command line tool via exec
        // Targets: node18-macos-x64 (adjust based on user's machine or desired targets)
        // Since user is on Mac, we target macos.
        // We can also add win and linux targets.
        const targets = 'node18-macos-x64,node18-win-x64,node18-linux-x64';
        const outputPath = 'bin/tuvi-api-engine'; // Renamed binary

        // Ensure bin directory exists
        if (!fs.existsSync('bin')) {
            fs.mkdirSync('bin');
        }

        // Run pkg
        // We pass the obfuscated file
        await execPromise(`npx pkg dist/server_bundle.obfuscated.js --targets ${targets} --output ${outputPath}`);
        console.log(`✅ Packaging complete. Executables in bin/`);
    } catch (e) {
        console.error("❌ Packaging failed:", e);
        // Print stdout/stderr if available
        if (e.stdout) console.log(e.stdout);
        if (e.stderr) console.error(e.stderr);
        process.exit(1);
    }

    console.log("🎉 Build finished successfully!");
}

build();
