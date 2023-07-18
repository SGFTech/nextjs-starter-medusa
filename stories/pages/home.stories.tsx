import Home from "../../src/app/[locale]/(main)/page";
import * as NextImage from "next/image";
const OriginalNextImage = NextImage.default as any;

export const  props = {
  configurable: true,
  value: (prop: JSX.IntrinsicAttributes) => <OriginalNextImage {...prop} unoptimized />
}
export default {
  title: "Pages/Home",
  component: Home,
};

export const HomePage = () => <Home />
