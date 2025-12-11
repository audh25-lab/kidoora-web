#!/usr/bin/env bash
set -e

echo "KidooraMV repo diagnose — $(date)"
ROOT=$(pwd)
echo "Root: $ROOT"
echo

# required files (case-sensitive)
files=(
  "src/App.jsx"
  "src/main.jsx"
  "src/i18n.js"
  "src/data/modulesDB.js"
  "src/api/mockApi.js"
  "src/store/userStore.js"
  "src/utils/ageEngine.js"
  "src/utils/svgAssetGenerator.js"
  "src/components/Icon.jsx"
  "src/components/NavBar.jsx"
  "src/components/AgeSelector.jsx"
  "src/components/ParentalConsent.jsx"
  "src/pages/Splash.jsx"
  "src/pages/Onboarding.jsx"
  "src/pages/HomeHub.jsx"
  "src/pages/LearningHub.jsx"
  "src/pages/ModulePage.jsx"
  "src/pages/Games.jsx"
  "src/pages/Profile.jsx"
  "src/pages/Leaderboard.jsx"
  "src/styles/app.css"
  "src/styles/learningHub.css"
  "src/styles/modulePage.css"
)

echo "Checking required files..."
missing=0
for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo " MISSING -> $f"
    missing=$((missing+1))
  else
    echo " OK -> $f"
  fi
done

if [ $missing -eq 0 ]; then
  echo
  echo "All required files found (case-sensitive)."
else
  echo
  echo "Files missing: $missing. Run the fixer script to create missing CSS files and safe placeholders."
fi

echo
echo "Checking package.json deps..."
if [ -f package.json ]; then
  jq -r '.dependencies, .devDependencies' package.json || cat package.json
else
  echo "package.json not found!"
fi

echo
echo "Checking for common import errors (styles & pages)..."
# Search for imports of styles that refer to missing files:
grep -R --line-number "import .*\\.css" src || true

echo
echo "Git status (branch + local changes):"
git rev-parse --abbrev-ref HEAD || true
git status --porcelain || true

echo
echo "Diagnosis complete."