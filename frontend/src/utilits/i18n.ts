import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["uk", "en", "ru"];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../../public/locales/${locale}.json`)).default,
  };
});
