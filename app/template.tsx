import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rewind Supply | Thrift Fashion Store",
  description:
    "Discover unique thrift fashion, pre-loved clothing and affordable styles at Rewind Supply.",
};

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}