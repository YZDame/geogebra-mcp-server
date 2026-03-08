# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2026-03-08

### Security

- Patched high-severity `minimatch` vulnerabilities by constraining transitive resolution with `overrides` (`minimatch@^9.0.7`).
- Refreshed lockfile via `npm audit fix` to pick up patched transitive packages, including `brace-expansion` versions from safe ranges.

