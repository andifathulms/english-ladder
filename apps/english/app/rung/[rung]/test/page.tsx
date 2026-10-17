import { testPage } from '@ladder/core/pages/test';
import { content } from '@/course/content';

const page = testPage(content);
export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
