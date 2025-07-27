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

// Button types
export type BaseButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'yellow'
  | 'ghost'
  | 'subtle'
  | 'white-outline';

export type ButtonVariant = BaseButtonVariant | 'light-subtle' | 'link';
export type LinkButtonVariant = BaseButtonVariant;
export type ButtonSize = ThemeSize;

// Gradient types
export type ThemeGradientDirection = 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
export type ThemeGradient = `from-${ThemeColor}-${ThemeShade} to-${ThemeColor}-${ThemeShade}`;

// Container-specific types
export type ContainerWidth = 
  | 'max-w-screen-sm'
  | 'max-w-screen-md'
  | 'max-w-screen-lg'
  | 'max-w-screen-xl'
  | 'max-w-screen-2xl'
  | 'max-w-3xl'
  | 'max-w-4xl'
  | 'max-w-5xl'
  | 'max-w-6xl'
  | 'max-w-7xl'
  | 'max-w-full'
  | 'max-w-none';

export type ContainerPadding =
  | 'px-0'
  | 'px-2'
  | 'px-4'
  | 'px-6'
  | 'px-8'
  | 'sm:px-0'
  | 'sm:px-2'
  | 'sm:px-4'
  | 'sm:px-6'
  | 'sm:px-8'
  | 'md:px-0'
  | 'md:px-2'
  | 'md:px-4'
  | 'md:px-6'
  | 'md:px-8'
  | 'lg:px-0'
  | 'lg:px-2'
  | 'lg:px-4'
  | 'lg:px-6'
  | 'lg:px-8';

// Spacing types
export type ThemeSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Size types
export type ThemeSize = 'sm' | 'md' | 'lg';
export type ThemeTextSize = 'sm' | 'base' | 'lg' | 'xl';

// Aspect ratio types
export type ThemeAspectRatio = 'square' | 'video' | '16/9' | '4/3' | '1/1';

// Input types
export type InputVariant = 'default' | 'newsletter';