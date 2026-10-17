import { lessonPage } from '@ladder/core/pages/lesson';
import { content } from '@/course/content';

const page = lessonPage(content);
export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
