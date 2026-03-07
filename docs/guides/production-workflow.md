# Production Workflow (Natural Language -> .ggb)

This guide is the shortest stable path for generating `.ggb` files from natural language through MCP.

## 1) What Is Required vs Optional

Required for runtime:
- `dist/` (built output)
- `src/` (source when developing)
- `package.json`
- `node_modules/` (after install)

Optional (safe to keep, not required at runtime):
- `docs/`
- `tests/`
- `examples/`
- `GEB-*-SUMMARY.md` and other design notes
- local generated files in `output/`

For npm publishing, this project already limits package content via `files` in `package.json`.

## 2) Why Local Fork and npm Can Differ

If your local fork has new features (for example `.ggb` export improvements), it can be ahead of the published npm version.

- Published npm version: what users install with `npm i -g @gebrai/gebrai`
- Local fork version: your current git checkout + local build

So yes: after changing code, you must rebuild before Codex/Claude uses the new behavior.

## 3) Build and Run (Local Fork)

```bash
npm install
npm run build
node dist/cli.js --version
```

Then point MCP client config to your local build:

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

## 4) Fastest MCP Flow to Produce `.ggb`

Use this 3-step tool sequence:

1. `geogebra_clear_construction`
2. `geogebra_eval_commands` with a full command list
3. `geogebra_export_ggb` with `outputPath`

Example:

```json
{
  "name": "geogebra_eval_commands",
  "arguments": {
    "commands": [
      "A=(0,0)",
      "B=(6,0)",
      "C=(2,4)",
      "poly=Polygon(A,B,C)"
    ],
    "stopOnError": true
  }
}
```

```json
{
  "name": "geogebra_export_ggb",
  "arguments": {
    "outputPath": "output/demo.ggb",
    "autoZoom": true,
    "zoomPadding": 0.2,
    "minRange": 2
  }
}
```

The server now auto-creates parent folders for exports.

## 5) Production Recommendations

- Keep one branch for release (`main`) and one for experiment (`feature/*`).
- Bump version before publishing so clients can tell builds apart.
- Run at least:
  - `npm run build`
  - key unit tests for export and tool invocation
- Keep generated outputs out of git (`output/` is ignored).
