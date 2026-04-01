#!/bin/sh

set -eu

PATTERN='^(site/|tests/|playwright\.config\.ts$|package\.json$|package-lock\.json$|tsconfig\.json$|\.github/workflows/ci\.yml$|\.github/workflows/full-regression\.yml$|\.husky/)'

case "${1:-}" in
	--range)
		git diff --name-only "$2" | grep -Eq "$PATTERN"
		;;
	--stdin)
		grep -Eq "$PATTERN"
		;;
	*)
		printf '%s\n' 'Usage: sh scripts/has-site-impact.sh --range <git-range> | --stdin' >&2
		exit 2
		;;
esac
