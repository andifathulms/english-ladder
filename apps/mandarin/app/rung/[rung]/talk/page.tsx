import { talkPage } from '@ladder/core/pages/talk';
import { content } from '@/course/content';

const page = talkPage(content);
export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
