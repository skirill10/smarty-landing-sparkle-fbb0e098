/* THIS FILE WAS GENERATED FOR PAYLOAD ADMIN — safe to keep as-is. */
import type { Metadata } from "next";
import config from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap";
import type { ServerFunctionClient } from "payload";
import React from "react";

export const metadata: Metadata = {
  title: "Smartytel CMS",
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
