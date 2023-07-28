"use client"
import { generateComponents } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";

import { generateReactHelpers } from "@uploadthing/react/hooks";
 
export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>(); 
 
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();