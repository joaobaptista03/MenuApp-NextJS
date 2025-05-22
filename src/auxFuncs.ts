export const themedClassName = (baseClass: string, theme: string, styles: { readonly [key: string]: string; }) => {
    if (theme === 'light') {
      return styles[baseClass];
    }

    return styles[baseClass] + " " + styles[`darkMode${baseClass.charAt(0).toUpperCase()}${baseClass.slice(1)}`];
  };