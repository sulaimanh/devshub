import React from "react";
import { db } from "@/utils/auth/firebase";
import { usePaginatedQuery } from "react-query";

export const getPosts = async (_, section, page, lastVisible, isBackwards) => {
  const amountPerPage = 5;

  if (!lastVisible) {
    const first = db
      .collection(section)
      .orderBy("createdAt", "desc")
      .limit(amountPerPage + 1);

    try {
      const documentSnapshots = await first.get();
      const totalDocs = documentSnapshots.size;

      const len = documentSnapshots.docs.length - 1;
      const last = documentSnapshots.docs[len];
      const start = documentSnapshots.docs[0];

      const docs = documentSnapshots.docs
        .filter((_, index) => index !== amountPerPage)
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

      const data = {
        docs: docs,
        lastVisible: last,
        firstVisible: start,
        disabledPage: totalDocs === amountPerPage + 1 ? false : page
      };

      return data;
    } catch (err) {
      return err;
    }
  } else {
    let first = null;

    if (!isBackwards) {
      first = db
        .collection(section)
        .orderBy("createdAt", "desc")
        .startAt(lastVisible)
        .limit(amountPerPage + 1);
    } else {
      first = db
        .collection(section)
        .orderBy("createdAt", "desc")
        .endAt(lastVisible)
        .limitToLast(amountPerPage + 1);
    }

    try {
      const documentSnapshots = await first.get();
      const totalDocs = documentSnapshots.size;

      const len = documentSnapshots.docs.length - 1;
      const last = documentSnapshots.docs[len];
      const start = documentSnapshots.docs[0];

      const docs = documentSnapshots.docs
        .filter((_, index) => index !== amountPerPage)
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

      const data = {
        docs: docs,
        lastVisible: last,
        firstVisible: start,
        disabledPage: totalDocs === amountPerPage + 1 ? false : page
      };

      return data;
    } catch (err) {
      return err;
    }
  }
};

export default function usePosts(section, lastVisible, page, isBackwards) {
  return usePaginatedQuery(
    ["posts", section, page],
    React.useCallback((posts, section, page) =>
      getPosts(posts, section, page, lastVisible, isBackwards)
    )
  );
}
