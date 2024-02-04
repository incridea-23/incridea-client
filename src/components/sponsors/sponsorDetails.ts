type Sponsor = {
    name: string,
    tier?: string,
    desc?: string,
    websiteURL: string,
    imageURL: string,
}

const sponsors: Sponsor[] = [
    {
        "name": "Centro",
        "tier": "Official Fashion Partners",
        "desc": "--------",
        "websiteURL": "https://google.com",
        "imageURL": "/assets/jpeg/download.jpeg"
    },
    {
        "name": "Zeus Fitness Club",
        "tier": "Official Fitness Partners",
        "desc": "--------",
        "websiteURL": "https://google.com",
        "imageURL": "/assets/jpeg/download.jpeg"
    }


]

export default sponsors;
export type { Sponsor };
