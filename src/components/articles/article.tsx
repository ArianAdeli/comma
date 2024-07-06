import { formatDate } from "@/lib/utils";
import { Article as ArticleType } from "@prisma/client";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { AnalyticsBadge } from "../analytics/analytics-badge";
import { Badge } from "../ui/badge";
interface Props {
  admin?: boolean;
  article: Pick<
    ArticleType,
    | "id"
    | "slug"
    | "title"
    | "createdAt"
    | "views"
    | "published"
    | "publishedAt"
  >;
}

export default async function Article({ article, admin }: Props) {
  const isPublished = article.published;
  return (
    <div className="-mx-2 flex min-h-5 max-md:h-auto relative group items-center justify-between rounded-md  p-2 text-sm transition-colors  hover:bg-gray-3 max-md:flex-col max-md:items-start">
      <Link
        href={`/articles/${admin ? article.id : article.slug}`}
        aria-label={`${article.title}`}
        className="absolute left-0 top-0 w-full h-full"
      />

      <div className="flex-1 flex gap-2 items-center max-md:flex-col max-md:items-baseline max-md:gap-1">
        <span className="block text-gray-4 w-24 group-hover:text-secondary transition-colors">
          {formatDate(article.publishedAt)}
        </span>
        <h3>
          <Balancer>{article.title}</Balancer>
        </h3>
      </div>
      {admin && (
        <div className="flex max-md:mt-2 justify-end max-md:w-full ">
          <div className="flex items-center gap-1 z-10">
            <Link
              href={`/articles?published=${isPublished ? "true" : "false"}`}
            >
              <Badge className="h-4 py-2 px-1 hover:bg-gray-2 font-normal">
                {isPublished ? "Public" : "Draft"}
              </Badge>
            </Link>
            <AnalyticsBadge
              href={`/articles/${article.id}/analytics`}
              value={article.views}
              published={article.published}
              index="views"
            />
          </div>
        </div>
      )}
    </div>
  );
}
