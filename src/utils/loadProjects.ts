import type { Project } from "../types/Project";

const modules = import.meta.glob("../project/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
})

const images = import.meta.glob("../assets/images/*", {
    eager: true,
    import: "default"
}) as Record<string, string>;

export function loadProjects(): Project[] {
    const projects: Project[] = [];

    for (const path in modules) {

        const raw = modules[path] as string;

        const slug = path.split("/").pop()?.replace(".md", "") || "";

        const titleMatch = raw.match(/title:\s*(.*)/);
        const dateMatch = raw.match(/date:\s*(.*)/);
        const descMatch = raw.match(/description:\s*(.*)/);
        const tagsMatch = raw.match(/tags:\s*(.*)/);
        const imageMatch = raw.match(/image:\s*(.*)/);
        const imagePath = imageMatch?.[1]?.trim() || "";

        const resolvedImage = images[`../assets/images/${imagePath.split("/").pop()}`] || "";


        const content = raw.split("---").slice(2).join("---");

        projects.push({
            slug,
            image: resolvedImage,
            title: titleMatch?.[1] || "",
            date: dateMatch?.[1] || "",
            description: descMatch?.[1] || "",
            tags: tagsMatch?.[1]?.split(",").map(t => t.trim()) || [],
            content
        })
    }

    projects.sort((a, b) => new Date (b.date).getTime() - new Date(a.date).getTime());

    return projects;
}