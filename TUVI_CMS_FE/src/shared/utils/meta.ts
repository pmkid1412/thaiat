export const setMetaTag = (name: string, content: string) => {
  let metaTag = document.querySelector(`meta[name="${name}"]`);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', name);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};

export const setMetaProperty = (property: string, content: string) => {
  let metaTag = document.querySelector(`meta[property="${property}"]`);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('property', property);
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};
