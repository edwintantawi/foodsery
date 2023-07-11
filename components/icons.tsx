import {
  ArrowLeftIcon,
  BookIcon,
  BookOpenIcon,
  CakeSliceIcon,
  CalendarIcon,
  GithubIcon,
  LeafIcon,
  LightbulbIcon,
  LucideProps,
  MapIcon,
  PackageOpenIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';

export const Icons = {
  Brand: ({
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    ...props
  }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={size}
      height={size}
      stroke={color}
      strokeWidth={
        absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth
      }
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6.63925 20.9998H16.8184M11.7288 20.9998C14.1585 20.9998 16.4887 20.0346 18.2067 18.3165C19.9248 16.5985 20.89 14.2683 20.89 11.8386H2.56763C2.56764 14.2683 3.53283 16.5985 5.25089 18.3165C6.96894 20.0346 9.29912 20.9998 11.7288 20.9998Z" />
      <path d="M11.0976 11.8384C10.4811 11.8442 9.88522 11.6166 9.4295 11.2014C8.97381 10.7862 8.69193 10.214 8.64037 9.59972C8.5889 8.98536 8.77156 8.37426 9.15173 7.88892C9.53198 7.40363 10.0816 7.08001 10.6905 6.98296C10.6175 6.66031 10.6109 6.3262 10.6709 6.0009C10.731 5.6756 10.8565 5.36588 11.0398 5.09053C11.2231 4.81518 11.4605 4.57994 11.7374 4.39906C12.0144 4.21818 12.3252 4.09544 12.651 4.03828C13.0866 3.96187 13.5348 4.0051 13.9478 4.16338C14.1286 3.87874 14.3664 3.63461 14.6462 3.44638C14.9259 3.25814 15.2417 3.12987 15.5735 3.06965C15.9053 3.0094 16.2459 3.01849 16.574 3.09636C16.9021 3.17423 17.2106 3.31918 17.4799 3.5221C17.9497 3.15302 18.5386 2.96892 19.135 3.00461C19.7314 3.0403 20.2941 3.29332 20.7165 3.7158C21.139 4.13829 21.392 4.70094 21.4277 5.29736C21.4634 5.89377 21.2793 6.48259 20.9102 6.95244C21.1401 7.25776 21.2951 7.61272 21.3628 7.98882C21.465 8.55621 21.3631 9.14143 21.0754 9.641C20.7877 10.1406 20.3326 10.5223 19.7905 10.7187C19.8834 11.0851 19.8939 11.4675 19.8211 11.8384M12.7466 11.8384L16.8182 7.76677" />
      <path d="M10.6091 7.0032C10.0507 6.40802 9.32605 5.99484 8.52947 5.81751C7.73289 5.64018 6.90136 5.70692 6.14327 6.00904C5.38516 6.31118 4.73565 6.83469 4.27939 7.51133C3.82318 8.18798 3.58138 8.98637 3.5855 9.80245C3.5855 10.5455 3.7891 11.2377 4.13519 11.8383" />
    </svg>
  ),
  Search: SearchIcon,
  Cancel: XIcon,
  LightBulb: LightbulbIcon,
  Calendar: CalendarIcon,
  Leaf: LeafIcon,
  Dessert: CakeSliceIcon,
  BookOpen: BookOpenIcon,
  Ingredient: BookIcon,
  Instruction: MapIcon,
  NotFound: PackageOpenIcon,
  Back: ArrowLeftIcon,
  Github: GithubIcon,
};
