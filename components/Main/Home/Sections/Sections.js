import React, { useEffect } from "react";

import Card from "@/components/UI/Card/Card";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sections({ page, data, section, ...props }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/home/[section]/[postId]");
  }, []);

  const handler = (id, index) => {
    router.push(
      {
        pathname: `/home/${section}/${id}`,
        query: { page: page }
      },
      `/home/${section}/${id}`
    );
  };
  return (
    <>
      {data.map((doc, index) => {
        return (
          <Card
            index={index}
            page={page}
            section={section}
            key={index}
            handler={handler}
            title={doc.title}
            id={doc.postId}
            description={doc.description}
            tech={doc.techArr}
          />
        );
      })}
    </>
  );
}
