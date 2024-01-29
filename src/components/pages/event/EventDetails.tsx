import React from "react";
import styles from "./EventDetails.module.css";
import draftToHtml from "draftjs-to-html";
function EventDetails({ details }: { details: string }) {
  const data = JSON.parse(details as string);
  const markup = draftToHtml(data);

  return (
    <section
      className={`${styles.markup} w-full event-description`}
      dangerouslySetInnerHTML={{ __html: markup }}></section>
  );
}

export default EventDetails;
