// English Ladder's UI-string overrides. These carry the course's brand name and the
// English-specific copy that the generic core tables leave neutral. Merged onto the base
// tables with extendStrings in course.config.ts.
import type { StringKey } from '@ladder/core/lib/i18n';

type Overrides = Partial<Record<StringKey, string>>;

export const idOverrides: Overrides = {
  'app.name': 'English Ladder',
  'settings.importFail': 'File ini tidak bisa dibaca sebagai progres English Ladder.',
  'me.aboutHint': 'Cara kerja English Ladder dan arti A1 sampai C1',
  'settings.voiceSampleText': 'Hello! This is your English Ladder voice. Is it clear?',
  'climb.title': '{rung} · climbed',
};

export const enOverrides: Overrides = {
  'app.name': 'English Ladder',
  'settings.importFail': "This file can't be read as English Ladder progress.",
  'me.aboutHint': 'How English Ladder works and what A1 to C1 mean',
  'settings.voiceSampleText': 'Hello! This is your English Ladder voice. Is it clear?',
  'climb.title': '{rung} · climbed',
};
