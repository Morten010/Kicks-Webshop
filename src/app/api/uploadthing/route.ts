import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { POST, GET } = createNextRouteHandler({
    router: ourFileRouter
})