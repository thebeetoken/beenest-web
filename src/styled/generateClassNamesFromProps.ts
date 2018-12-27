interface Props {
  readonly [key: string]: string;
}

export const generateClassNamesFromProps = (props: Props): string => {
  const classNames: string = props.defaultClassName || '';

  const otherClassNames = Object.keys(props)
    .filter((key: string) => key !== 'defaultClassName')
    .filter((key: string) => typeof props[key] === 'string' && props[key].length !== 0)
    .map((key: string): string => `${props[key]} `)
    .join('');

  return `${classNames} ${otherClassNames.trim()}`;
};
