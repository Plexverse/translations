<img width="4096" height="843" alt="Github Repository Header" src="https://github.com/user-attachments/assets/f1f7dd9d-e989-4bc7-885d-90ab7ecac2df" />

</br>
</br>
Translation files for the Plexverse server. This repository contains all translation keys and their localized strings for multiple languages. We welcome anyone to contribute to translating the server, create a pull request with any changes you'd like to make!
</br>
</br>

> [!NOTE]
> Translations can take up to 24 hours to propagate to in-game servers after being merged.

## Contributors

[![Contributors](https://contributors-img.web.app/image?repo=Plexverse/translations&columns=8&anon=1)](https://github.com/Plexverse/translations/graphs/contributors)

## Supported Languages

- **English** (`en`) - Base language, source of truth
- **French** (`fr`)
- **Spanish** (`es`)
- **Russian** (`ru`)
- **Pirate** (`pir`)

If you'd like another language supported, please reach out to our team on discord. We're happy to onboard new languages!

## Structure

The repository is organized by language, with each language having its own directory:

```
translations/
├── english/          # Base English translations (source of truth)
│   ├── Admin_en.json
│   ├── Badges_en.json
│   ├── Death_en.json
│   ├── Game_en.json
│   ├── Kits_en.json
│   ├── Lobby_en.json
│   ├── Queue_en.json
│   ├── Settings_en.json
│   └── Stats_en.json
├── french/           # French translations
│   ├── Badges_fr.json
│   └── ...
├── spanish/          # Spanish translations
│   ├── Badges_es.json
│   └── ...
├── russian/          # Russian translations
│   ├── Badges_ru.json
│   └── ...
├── pirate/           # Pirate translations
│   ├── Badges_pir.json
│   └── ...
└── .scripts/         # Validation scripts
    └── validate-translations.js
```

## Translation Files

Each translation file is a JSON file containing key-value pairs. Keys can be nested objects for organization:

```json
{
  "simple-key": "Simple translation",
  "nested-key": {
    "name": "Nested name",
    "description": "Nested description"
  }
}
```

### Special Formatting

Translation strings support:
- **Color codes**: Use `§` followed by a color code (e.g., `§a` for green, `§c` for red)
- **Placeholders**: Use `%%variable%%` for dynamic content (e.g., `%%player%%`, `%%time%%`)
- **Special characters**: Unicode characters and emojis are supported

## Adding or Editing Translations

### Adding a New Translation Key

1. Add the key to the appropriate English file in `english/`
2. Add the same key to all other language files
3. For new languages, copy the English content as a starting point

### Editing Existing Translations

1. Edit the translation in the appropriate language file
2. Ensure the key structure matches the English version
3. Maintain the same JSON structure and formatting

### Important Notes

- **English is the source of truth**: All keys must exist in English files
- **All languages must have all keys**: The validation system ensures this
- **Keep placeholder variables**: Maintain `%%variable%%` placeholders in all languages
- **Preserve formatting codes**: Keep `§` color codes and special characters
- **Do not translate game names**: Game names, mode names, and other proper nouns should remain in their original form
- **Do not translate variable names**: Variable names in placeholders (e.g., `%%player%%`, `%%time%%`) should not be translated

## Validation

### Automatic Validation

A GitHub Action automatically validates translations on every pull request:

- Checks that all English keys exist in all other languages
- Runs separate validation checks for each changed language
- Only validates languages that were modified (or all languages if English changed)
- Fails the PR if any keys are missing

### Running Validation Locally

You can validate translations locally using the Node.js script:

```bash
# Validate a specific language
node .scripts/validate-translations.js french

# Validate multiple languages
node .scripts/validate-translations.js french spanish
```

The script will:
- ✓ Report success if all keys are present
- ✗ Report missing keys if any are found
- Exit with code 1 if validation fails

## Code Review Process

### CODEOWNERS

Each language folder has a `CODEOWNERS` file that automatically requests review from the appropriate proofreader team:

- `english/` → `@proofreader-english`
- `french/` → `@proofreader-french`
- `spanish/` → `@proofreader-spanish`
- `russian/` → `@proofreader-russian`
- `pirate/` → `@proofreader-pirate`

When you modify files in a language folder, the corresponding proofreader team will be automatically requested as a reviewer. Feel free to ask people from this team to review if you don't get a response on github within a few days.

### Pull Request Requirements

1. **All translation keys must be present**: The validation check must pass
2. **Proofreader approval**: The appropriate language proofreader must approve
3. **No missing keys**: All English keys must exist in all other languages

## File Naming Convention

Translation files follow this naming pattern:
- `{Category}_{language_code}.json`
- Examples:
  - `Game_en.json` (English)
  - `Game_fr.json` (French)
  - `Game_es.json` (Spanish)
  - `Game_ru.json` (Russian)
  - `Game_pir.json` (Pirate)

## Translation Categories

- **Admin**: Admin-related messages and error notifications
- **Badges**: Badge names and descriptions
- **Death**: Death-related messages
- **Game**: In-game messages and UI text
- **Kits**: Kit names and descriptions
- **Lobby**: Lobby interface text
- **Queue**: Queue and matchmaking messages
- **Settings**: Settings menu text
- **Stats**: Statistics display text

## Contributing

1. Fork the repository
2. Create a branch for your changes
3. Make your translation edits
4. Run validation locally to ensure all keys are present
5. Commit and push your changes
6. Create a pull request
7. Wait for validation to pass and proofreader approval

## Troubleshooting

### Validation Fails

If validation fails, check:
- All English keys exist in the language you're editing
- File names match the pattern `{Category}_{language_code}.json`
- JSON syntax is valid (no trailing commas, proper quotes)
- Nested keys use dot notation (e.g., `parent.child`)

### Missing Keys

If you see missing keys in validation:
1. Check the English file for the key structure
2. Add the missing key to the language file
3. Maintain the same structure (nested objects, etc.)

## Scripts

### validate-translations.js

Validates that all English translation keys exist in specified language files.

**Usage:**
```bash
node .scripts/validate-translations.js <language1> [language2] ...
```

**Example:**
```bash
node .scripts/validate-translations.js french spanish
```

**Exit Codes:**
- `0`: All keys present
- `1`: Missing keys found
