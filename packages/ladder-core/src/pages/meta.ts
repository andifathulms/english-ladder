import type { Content } from '@ladder/core/lib/content/load';
import type { Title } from '@ladder/core/lib/types';

/** Page titles: the target-language title, else (ui-first courses) the Indonesian one. */
export const titleText = (content: Content, t: Title) =>
  content.model.meta?.title === 'id' ? t.id : (t.target ?? t.id);
