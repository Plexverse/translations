## Description

<!-- Please provide a brief description of your translation changes -->

## Language(s) Modified

<!-- Check all that apply -->
- [ ] English
- [ ] French
- [ ] Spanish
- [ ] Russian
- [ ] Pirate

## Type of Changes

<!-- Check all that apply -->
- [ ] Added new translation keys
- [ ] Edited existing translations
- [ ] Fixed typos or grammar
- [ ] Other (please describe)

## Checklist

Please ensure all of the following are true:

### Translation Rules
- [ ] **English is the source of truth**: All new keys have been added to English files first
- [ ] **All languages have all keys**: If adding new keys, they exist in all language files
- [ ] **Placeholder variables preserved**: All `%%variable%%` placeholders are kept exactly as they appear (e.g., `%%player%%`, `%%time%%`)
- [ ] **Formatting codes preserved**: All `§` color codes and special characters are maintained
- [ ] **Game names not translated**: Game names, mode names, and other proper nouns remain in their original form
- [ ] **Variable names not translated**: Variable names in placeholders are not translated (e.g., `%%player%%` stays as `%%player%%`, not translated)

### Validation
- [ ] **Validation passes**: The automatic validation check must pass
- [ ] **Validated locally** (optional but recommended): Ran `node .scripts/validate-translations.js <language>` locally
- [ ] **JSON syntax valid**: No trailing commas, proper quotes, valid JSON structure
- [ ] **Key structure matches**: Nested keys match the English version structure

### Code Review
- [ ] **Proofreader approval**: Waiting for approval from the appropriate language proofreader team
- [ ] **No missing keys**: All English keys exist in all modified language files

## Additional Notes

<!-- Add any additional context, questions, or notes about your changes here -->

