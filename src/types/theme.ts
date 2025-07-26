export type ThemeColor = 
  | 'white'
  | 'black'
  | 'gray'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'green'
  | 'blue';

export type ThemeShade = 
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type ThemeTextColor = `text-${ThemeColor}${`-${ThemeShade}` | ''}`;
export type ThemeBgColor = `bg-${ThemeColor}${`-${ThemeShade}` | ''}`;

export type ThemeOpacity = 
  | '0'
  | '5'
  | '10'
  | '15'
  | '20'
  | '25'
  | '30'
  | '35'
  | '40'
  | '45'
  | '50'
  | '55'
  | '60'
  | '65'
  | '70'
  | '75'
  | '80'
  | '85'
  | '90'
  | '95'
  | '100';

export type ThemeBgOpacity = `bg-opacity-${ThemeOpacity}`;

export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'yellow'
  | 'ghost'
  | 'subtle'
  | 'white-outline'
  | 'light-subtle'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg'; 