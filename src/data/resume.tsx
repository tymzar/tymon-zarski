import { Icons } from "@/components/icons";
import { HomeIcon, Book } from "lucide-react";

export const DATA = {
  name: "Tymon Żarski",
  initials: "TŻ",
  nick: "tymzar",
  url: "https://tymonzar.ski",
  location: "Warsaw, Poland",
  description:
    "Software Engineer, AI Enthusiast. Passionate about building innovative solutions that drive business growth, enhance user experiences and scientific research.",
  summary:
    "Software engineer with a focus on **front-end** and **NLP** systems development. I have a solid command of **TypeScript**, **JavaScript**, **Python**, and **React**, and application of these skills in creating advanced web applications, language validation systems and microservices architectures. My work includes developing [mKanon](https://www.mbank.pl/o-nas/mkanon/) system at mBank S.A., ensuring efficiency and innovation. As a **executive board member** of the Innovative Information Technology Science Club Delta, I have developed strong leadership and teamwork abilities in both individual and collaborative projects.",
  avatarUrl: "/me.png",
  skills: [
    "Python",
    "Typescript",
    "Javascript",
    "Go",
    "Spacy",
    "React",
    "Redux",
    "Html5",
    "Css3",
    "Node.js",
    "Express",
    "Next.js",
    "Google Cloud",
    "Amazonaws",
    "Postgresql",
    "Overleaf",
    "Nginx",
    "Mui",
    "Testinglibrary",
    "Jest",
    "Shopify",
    "Docker",
    "Git",
    "Jira",
    "Github",
    "Gitlab",
    "Visual Studio Code",
    "Asana",
    "Netlify",
    "Figma",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "/blog",
      label: "Blog",
      icon: Book,
    },
  ],
  contact: {
    email: "tymon.zarski@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/tymzar/",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/tymzar/",
        icon: Icons.linkedin,

        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/tzarski/",
        icon: Icons.leetcode,

        navbar: true,
      },
      ORCID: {
        name: "ORCID",
        url: "https://orcid.org/0009-0007-1651-833X",
        icon: Icons.orcid,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:tymon.zarski@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Point 72",
      href: "https://point72.com",
      badges: ["Python"],
      location: "Warsaw, Poland",
      title: "Software Engineer II",
      logoUrl: "/p72.png",
      start: "Oct 2024",
      end: "Present",
      description:
        "At Point72, I focused on developing and optimizing pipelines, building and maintaining APIs, and utilizing AWS services to create scalable and efficient solutions. I engineered data-driven dashboards using Dash, integrating them with backend services and APIs to deliver actionable insights. My work involved designing and implementing robust data pipelines, ensuring seamless data flow and processing across various platforms, while leveraging AWS to enhance system performance and reliability. I also played a key role in API development, enabling smooth integration between services and enhancing overall system functionality.",
    },
    {
      company: "mServices",
      badges: ["React", "Python"],
      href: "https://mservices.com.pl",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/ms.png",
      start: "June 2021",
      end: "Sep 2024",
      description:
        'I engineered and implemented a Python-based NLP system for mKanon using FastAPI, Spacy, Morfeusz2, and scikit-learn for data classification and dimension reduction, while also developing a task analysis dashboard to optimize internal processes through clustering techniques. My work on the "CCL Component Library" involved adding features to key components, building large components, and integrating them with business logic. Additionally, I developed SPAs connected to API endpoints for mBank clients, resolved frontend security vulnerabilities, and introduced new DOM handling logic for mKanon. I automated visual testing for Design System components and integrated automation tools like Gmail API and GCP. Furthermore, I led technical interviews, managed project planning, and drove process improvements that enhanced team collaboration and overall efficiency.',
    },
    {
      company: "Personalized Solutions",
      href: "#",
      badges: ["Python"],
      location: "Warsaw, Poland",
      title: "Owner & AI Application Engineer",
      logoUrl: "/psln.png",
      start: "Jan 2021",
      end: "Present",
      description:
        "At Persolozized Solutions, I specialized in commerce development, front-end engineering, and the application of AI solutions across various sectors. My work involved creating responsive and scalable front-end interfaces, optimizing user experiences, and integrating advanced AI-driven features to enhance functionality and decision-making processes in commercial platforms. I played a key role in developing customized solutions tailored to diverse business needs, leveraging AI technologies to drive innovation and streamline operations. This included building efficient e-commerce systems and implementing AI models that improved business outcomes across different industries.",
    },
    {
      company: "Onwelo",
      href: "https://onwelo.com",
      badges: ["TypeScript"],
      location: "Warsaw, Poland",
      title: "Front-end Engineer Intern",
      logoUrl: "/onwelo.jpg",
      start: "July 2020",
      end: "Sep 2020",
      description:
        "Developed commercial web applications for the banking sector using Angular 11, JavaScript, and TypeScript. Enhanced office organization during the pandemic by optimizing an internal web application.",
    },
  ],
  education: [
    {
      school: "Warsaw University of Technology",
      href: "https://repo.pw.edu.pl/info/author/WUTaf2c6fafab1a44ca9b01fc682be28f9b",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      logoUrl: "/wut.png",
      start: "2020",
      end: "2024",
      publications: [
        {
          title:
            "Enhancing Privacy While Preserving Context in Text Transformations by Large Language Models",
          href: "https://doi.org/10.3390/info16010049",
          abstract:
            "Data security is a critical concern for internet users, primarily as more people rely on social networks and online tools daily. Despite the convenience, many users are unaware of the risks posed to their sensitive and personal data. This study addresses this issue by presenting a comprehensive solution to prevent personal data leakage using online tools. We developed a solution that enhances user privacy by identifying and anonymizing named entity classes representing sensitive data while maintaining the original context by swapping source entities for functional data. Our approach utilizes natural language processing methods, combining machine learning tools such as **MITIE** and **spaCy** with rule-based text analysis. We employed regular expressions and large language models to anonymize text, preserving its context for further processing or enabling restoration to the original form after transformations. The results demonstrated the effectiveness of our custom-trained models, achieving an **F1-score of 0.8292**. Additionally, the proposed algorithms successfully preserved context in approximately **93.23% of test cases**, indicating a promising solution for secure data handling in online environments.",
          authors: "Żarski, T.L. & Janicki, A.",
          date: "14/01/2025",
          publisher: "/mdpi.jpg",
          graphicalAbstractSrc: "/privacy-ga.png",
        },
      ],
    },
    {
      school: "Universitat Politècnica de València",
      href: "https://www.upv.es/",
      degree: "International Exchange - Escuela de Ingeniería Informática",
      logoUrl: "/upv.jpg",
      start: "2021",
      end: "2021",
      publications: [],
    },
  ],
  projects: [
    {
      title: "My portfolio",
      href: "https://tymon-zar.ski",
      active: true,
      description:
        "My personal portfolio website, built with **Next.js**, **NextUI**, **TailwindCSS**. It showcases my work, skills, and experience in software engineering and web development. Next addition to the website will be a **RAG** that will allow you to get to know me better.",
      technologies: ["Next.js", "NextUI", "TailwindCSS", "MDX", "GitHub"],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-4" />,
        },
      ],
      mockups: {
        mobile: "/portfolio-430x880.png",
        desktop: "/portfolio-1200x750.png",
      },
    },
    {
      title: "Edu & More Kids",
      href: "https://www.kids.eduandmore.com",
      active: true,
      description:
        "Edu & More Kids is one of the first web pages I have created. It is a website for a holiday camp for children. The website is built with **Angular**, **TypeScript**, **Material UI**.",
      technologies: ["Angular", "TypeScript", "Material UI"],
      links: [
        {
          type: "Website",
          href: "https://www.kids.eduandmore.com",
          icon: <Icons.globe className="size-4" />,
        },
      ],
      mockups: {
        mobile: "/emkids-430x880.png",
        desktop: "/emkids-1200x750.png",
      },
    },
    {
      title: "Zielono Mi",
      href: "",
      active: true,
      description:
        "Zielono Mi is a e-commerce store for a florist and funeral wreaths. The website is built with **Next.js**, **TailwindCSS**, **DecapCMS**, and **Shopify**. It is a fully **SSR** website with **SEO** optimization which in combination with **Shopify** allows for easy management of the store.",
      technologies: [
        "Next.js",
        "TailwindCSS",
        "GraphQL",
        "Netlify",
        "DecapCMS",
        "MDX",
        "Shopify",
      ],
      links: [
        {
          type: "Website",
          disabled: true,
          href: "",
          icon: <Icons.globe className="size-4" />,
        },
      ],
      mockups: {
        mobile: "/wiazankiwience-430x880.png",
        desktop: "/wiazankiwience-1200x750.png",
      },
    },
  ],
};
