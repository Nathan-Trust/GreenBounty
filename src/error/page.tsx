import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  return (
    <div className="flex items-center justify-center flex-col gap-2 h-screen  bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500">
        404 | Not Found
      </h1>
      <i>{error?.statusText ?? error?.message}</i>
    </div>
  );
}