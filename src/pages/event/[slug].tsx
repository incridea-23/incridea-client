import {
  Event,
  EventByIdDocument,
  PublishedEventsSlugDocument,
} from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
import { type } from "os";
import { FC } from "react";

function event(props: Event) {
  console.log(props);
  return <div>event</div>;
}

export default event;

// ISR
export async function getStaticProps({ params }: { params: Params }) {
  const { data: event } = await client.query({
    query: EventByIdDocument,
    variables: {
      id: params.slug.split("-").pop() as string,
    },
  });
  return {
    props: {
      event: event.eventById,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const { data: events } = await client.query({
    query: PublishedEventsSlugDocument,
  });
  const paths = events.publishedEvents.map((event) => ({
    params: {
      slug: `${event.name.toLocaleLowerCase().split(" ").join("-")}-${
        event.id
      }`,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

type Params = {
  slug: string;
};
