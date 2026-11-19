import { useEffect } from "react";

/** Sets the document title and meta description / social tags per page (SEO). */
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const set = (selector, value) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };
    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    set('meta[name="twitter:title"]', title);
    set('meta[name="twitter:description"]', description);
  }, [title, description]);
}
