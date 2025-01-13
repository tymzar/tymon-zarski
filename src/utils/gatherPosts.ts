import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostData = {
  id: string;
  title: string;
  date: Date;
  project?: string;
  part?: number;
  coverImage: string;
  keywords: string;
  description: string;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData(maxPosts?: number): Array<PostData> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    matterResult.data.date = new Date(matterResult.data.date);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  }) as Array<PostData>;
  // Sort posts by date
  return allPostsData
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    })
    .slice(0, maxPosts);
}

export function getPostBySlug(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  matterResult.data.date = new Date(matterResult.data.date);

  const postData = {
    id: slug,
    content: matterResult.content,
    ...matterResult.data,
  } as PostData;

  return postData;
}
