import { useEffect } from 'react';
import { setMetaProperty, setMetaTag } from '../utils/meta';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}

export const getTitle = (title: string) => {
  return `${title} | Thái Ất Kim Hoa`;
};

export const useMeta = ({
  title,
  description,
  keywords,
  ogImage = '/icon_app.svg',
  ogUrl,
  ogTitle,
  ogDescription,
}: MetaProps) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Thái Ất Kim Hoa`;
    } else {
      document.title = 'Thái Ất Kim Hoa';
    }

    if (description) {
      setMetaTag('description', description);
    }

    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    if (ogImage) {
      setMetaProperty('og:image', ogImage);
    }

    if (ogUrl) {
      setMetaProperty('og:url', ogUrl);
    }

    if (ogTitle) {
      setMetaProperty('og:title', ogTitle);
    }

    if (ogDescription) {
      setMetaProperty('og:description', ogDescription);
    }
  }, [title, description, keywords, ogImage, ogUrl, ogTitle, ogDescription]);
};
