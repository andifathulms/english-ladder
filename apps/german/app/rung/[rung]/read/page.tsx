import { readPage } from '@ladder/core/pages/read';
import { content } from '@/course/content';

const page = readPage(content);
export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
