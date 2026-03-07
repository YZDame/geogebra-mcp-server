# GeoGebra MCP Tool

A GeoGebra MCP server for geometric construction, function plotting, and file export (including `.ggb`).

Chinese documentation: [README.zh-CN.md](README.zh-CN.md)

## What This Project Is

- This is an **MCP server**, not a chat app.
- Natural-language understanding is handled by clients such as Claude/Codex.
- This project executes GeoGebra tool calls and exports output files.

## Quick Start

### 1. Install and Build

```bash
npm install
npm run build
```

### 2. Run Server

```bash
node dist/cli.js
```

Or:

```bash
npx @gebrai/gebrai
# or after global install
gebrai
```

### 3. Connect as MCP

Claude Desktop example:

```json
{
  "mcpServers": {
    "geogebra": {
      "command": "node",
      "args": ["/absolute/path/to/gebrai/dist/cli.js"]
    }
  }
}
```

## Typical Flow (Natural Language -> .ggb)

1. Describe a geometry problem in Claude/Codex.
2. The client calls MCP tools to build the construction.
3. Call `geogebra_export_ggb` to write `output/*.ggb`.

Recommended fast path:

- `geogebra_clear_construction`
- `geogebra_eval_commands`
- `geogebra_export_ggb`

## CLI Options

```bash
node dist/cli.js --help
node dist/cli.js --version
node dist/cli.js --log-level debug
```

## Project Structure

```text
src/          # core implementation
tests/        # tests
package.json  # scripts and dependencies
tsconfig.json # TypeScript config
jest.config.js
```

## Notes

- This project can export `.ggb` directly.
- After source changes, run `npm run build` so clients use the updated logic.
