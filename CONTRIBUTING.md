# Contributing to SentinelRecon

Thank you for your interest in contributing to SentinelRecon! This document provides guidelines to help you get started.

## Code of Conduct

By participating, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): implement jwt authentication
fix(scanner): resolve port parsing error
docs(readme): improve api documentation
ci(actions): add docker build workflow
```

## Development Setup

### Prerequisites

- Python 3.13+
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
# Clone and setup
git clone https://github.com/cybersecurity-sentinel/sentinelrecon.git
cd sentinelrecon

# Backend
cd backend
python -m venv venv
pip install -r requirements-dev.txt

# Frontend
cd ../frontend
npm install
```

## Code Style

### Python

```bash
ruff check .
black .
mypy .
pytest
```

### TypeScript

```bash
npm run lint
npm run format
npm run test
```

## Pull Request Process

1. Ensure all CI checks pass
2. Update documentation for new features
3. Add tests for new functionality
4. Follow the PR template
5. Request review from maintainers

## Questions?

Open an issue with the `question` label.