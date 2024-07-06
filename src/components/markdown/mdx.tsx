import { cn } from "@/lib/utils";
import "@/styles/prose.css";
import type {
  MDXComponents,
  MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Image from "next/image";
import remarkGfm from "remark-gfm";

const mdxRemoteOptions: MDXRemoteOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

const mdxComponents: MDXComponents = {
  img: async (props) => {
    return (
      <Image
        src={props.src as string}
        alt={props.alt as string}
        width={0}
        height={0}
        sizes="100vw"
        className="w-max max-md:w-full"
        priority
      />
    );
  },
  a: (props) => {
    return (
      <a target="_blank" {...props}>
        {props.children}
      </a>
    );
  },
};

export default async function MDX({
  source,
  className,
}: {
  source: any;
  className?: string;
}) {
  return (
    <div className={cn("prose dark:prose-invert", className)}>
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={mdxRemoteOptions}
      />
    </div>
  );
}
