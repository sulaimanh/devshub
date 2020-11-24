import {
  headingTertiary as HeadingTertiary,
  paragraph as Paragraph
} from "../Text/Text";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./MiniCard.module.scss";

const MiniCard = ({
  data,
  isUserProfile,
  section,
  goToPostHandler,
  deletePostHandler,
  ...props
}) => {
  const desc = (
    <Paragraph className='medium'>
      {data.description.substring(0, 250)}
      {data.description.length > 250 ? (
        <React.Fragment>
          ...{" "}
          <span className={styles[`card--description__seemore`]}>see more</span>
        </React.Fragment>
      ) : null}
    </Paragraph>
  );
  return (
    <div className={styles.card}>
      <div className={styles[`card--heading`]}>
        <div
          onClick={() => goToPostHandler(section, data.postId)}
          className={styles[`card--heading__title`]}
        >
          <HeadingTertiary>{data.title}</HeadingTertiary>
        </div>
        {isUserProfile ? (
          <div
            onClick={() => deletePostHandler(section, data.postId)}
            className={styles[`card--heading__delete`]}
          >
            <FontAwesomeIcon
              icon={faTrash}
              size='2x'
              className={styles[`card--heading__delete--trash`]}
            />
          </div>
        ) : null}
      </div>
      <div
        onClick={() => goToPostHandler(section, data.postId)}
        className={styles[`card--description`]}
      >
        {desc}
      </div>
    </div>
  );
};

export default MiniCard;
