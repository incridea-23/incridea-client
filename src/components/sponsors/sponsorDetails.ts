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
        "desc": "",
        "websiteURL": "https://www.reliancecentro.store/",
        "imageURL": "/sponsors/centro.jpg"
    },
    {
        "name": "Zeus Fitness Club",
        "tier": "Official Fitness Partners",
        "desc": "",
        "websiteURL": "https://www.zeusfitnessclub.com/",
        "imageURL": "/sponsors/zeus.jpg"
    }


]

export default sponsors;
export type { Sponsor };
