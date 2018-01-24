import {
  memoizeFunction
} from '../../Utilities';
import {
  ITheme,
  mergeStyleSets
} from '../../Styling';

export interface IKeytipClassNames {
  root: string;
  content: string;
}

export const getKeytipClassnames = memoizeFunction((theme: ITheme): IKeytipClassNames => {
  return mergeStyleSets({
    root: {
      backgroundColor: theme.palette.neutralDark
    },
    content: {
      textAlign: 'center',
      paddingLeft: 3,
      paddingRight: 3,
      backgroundColor: theme.palette.neutralDark,
      color: theme.palette.neutralLight,
      minWidth: 11,
      lineHeight: 17,
      height: 17,
      display: 'inline-block'
    }
  });
});