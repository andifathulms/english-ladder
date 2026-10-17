import { rungPage } from '@ladder/core/pages/rung';
import { content } from '@/course/content';

const page = rungPage(content);
export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.Page;
