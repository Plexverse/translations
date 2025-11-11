#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Recursively extracts all keys from a JSON object, including nested keys
 * @param {Object} obj - The JSON object
 * @param {string} prefix - The prefix for nested keys (e.g., "parent.child")
 * @returns {Set<string>} - Set of all keys
 */
function extractKeys(obj, prefix = '') {
  const keys = new Set();
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively extract keys from nested objects
      const nestedKeys = extractKeys(value, fullKey);
      nestedKeys.forEach(k => keys.add(k));
    } else {
      // Add the key itself
      keys.add(fullKey);
    }
  }
  
  return keys;
}

/**
 * Loads all translation keys from English files
 * @param {string} englishDir - Path to the english directory
 * @returns {Map<string, Set<string>>} - Map of filename to set of keys
 */
function loadEnglishKeys(englishDir) {
  const englishKeys = new Map();
  
  if (!fs.existsSync(englishDir)) {
    console.error(`Error: English directory not found: ${englishDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(englishDir).filter(f => f.endsWith('_en.json'));
  
  for (const file of files) {
    const filePath = path.join(englishDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const json = JSON.parse(content);
      const keys = extractKeys(json);
      englishKeys.set(file, keys);
    } catch (error) {
      console.error(`Error reading ${filePath}: ${error.message}`);
      process.exit(1);
    }
  }
  
  return englishKeys;
}

/**
 * Extracts language code from files in a language directory
 * @param {string} langDir - Path to the language directory
 * @returns {string|null} - Language code (e.g., "fr") or null if not found
 */
function extractLanguageCode(langDir) {
  if (!fs.existsSync(langDir)) {
    return null;
  }
  
  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.json'));
  if (files.length === 0) {
    return null;
  }
  
  // Extract language code from first file (e.g., "Game_fr.json" -> "fr")
  const firstFile = files[0];
  const match = firstFile.match(/_([a-z]{2})\.json$/i);
  return match ? match[1] : null;
}

/**
 * Validates a language folder against English keys
 * @param {string} langDir - Path to the language directory
 * @param {string} langName - Name of the language (for display)
 * @param {Map<string, Set<string>>} englishKeys - Map of filename to set of keys
 * @returns {boolean} - Returns true if all keys are present, false otherwise
 */
function validateLanguage(langDir, langName, englishKeys) {
  let allValid = true;
  const missingKeys = new Map();
  
  // Extract language code from files in the directory
  const langCode = extractLanguageCode(langDir);
  if (!langCode) {
    console.error(`Error: Could not determine language code for ${langName}`);
    return false;
  }
  
  for (const [filename, expectedKeys] of englishKeys.entries()) {
    // Convert filename from _en.json to _[langCode].json
    const langFilename = filename.replace('_en.json', `_${langCode}.json`);
    const filePath = path.join(langDir, langFilename);
    
    let actualKeys = new Set();
    
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(content);
        actualKeys = extractKeys(json);
      } catch (error) {
        console.error(`Error reading ${filePath}: ${error.message}`);
        allValid = false;
        continue;
      }
    } else {
      // File doesn't exist - all keys are missing
      console.error(`Warning: ${langFilename} does not exist in ${langName} folder`);
    }
    
    // Find missing keys
    const missing = new Set();
    for (const key of expectedKeys) {
      if (!actualKeys.has(key)) {
        missing.add(key);
      }
    }
    
    if (missing.size > 0) {
      missingKeys.set(langFilename, missing);
      allValid = false;
    }
  }
  
  // Print results
  if (allValid) {
    console.log(`✓ ${langName}: All translation keys are present`);
  } else {
    console.error(`✗ ${langName}: Missing translation keys:`);
    for (const [filename, missing] of missingKeys.entries()) {
      console.error(`  ${filename}:`);
      for (const key of missing) {
        console.error(`    - ${key}`);
      }
    }
  }
  
  return allValid;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('Usage: node validate-translations.js <language1> [language2] ...');
    console.error('Example: node validate-translations.js fr');
    process.exit(1);
  }
  
  const languages = args;
  const rootDir = path.join(__dirname, '..');
  const englishDir = path.join(rootDir, 'english');
  
  // Load all English keys
  const englishKeys = loadEnglishKeys(englishDir);
  
  if (englishKeys.size === 0) {
    console.error('Error: No English translation files found');
    process.exit(1);
  }
  
  console.log(`Found ${englishKeys.size} English translation file(s)`);
  
  // Validate each specified language
  let allValid = true;
  for (const lang of languages) {
    const langDir = path.join(rootDir, lang);
    
    if (!fs.existsSync(langDir)) {
      console.error(`Error: Language directory not found: ${langDir}`);
      allValid = false;
      continue;
    }
    
    const isValid = validateLanguage(langDir, lang, englishKeys);
    if (!isValid) {
      allValid = false;
    }
  }
  
  // Exit with appropriate code
  process.exit(allValid ? 0 : 1);
}

main();

