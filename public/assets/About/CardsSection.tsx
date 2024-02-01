import React from "react";
import Card from "./Aboutcard";

const members = [
  {
    name: "Mr. Anant Murthi",
    role: "Faculty Coordinator"
  },
  {
    name: "Mr. Shyam Sundar",
    role: "Faculty Coordinator"
  },
  {
    name: "Shravan Udupa K",
    role: "Kalaasangama Founder"
  },
  {
    name: "Amrutha V",
    role: "President",
  },
  {
    name: "Krishna M S",
    role: "Secretary",
  },
  {
    name: "Srikrishna",
    role: "Vice President",
  },
  {
    name: "Anwesh R Shetty",
    role: "Treasurer and Yakshagana Head",
  },
  {
    name: "Keshav Nayak",
    role: "Joint Secretary",
  },
  {
    name: "Sinchana S Bairy",
    role: "Classical Dance Head",
  },
  {
    name: "Shravya",
    role: "Classical Dance Head",
  },
  {
    name: "Shreyas Upadhyaya",
    role: "Classical Music Head",
  },
  {
    name: "Mahatee",
    role: "Classical Music Head",
  },
  {
    name: "Eshaan Rao",
    role: "Bhajan Head",
  },
  {
    name: "Shreya P V",
    role: "Bhajan Head",
  },
  {
    name: "Varun",
    role: "Yakshagana Head",
  },
  {
    name: "Sanjana Jain",
    role: "Folk Head",
  },
  {
    name: "Mayur M Shet",
    role: "Social Media and Folk Head",
  },
  {
    name: "Vaibhav",
    role: "Executive Member",
  },
  {
    name: "T M Shravan Acharya",
    role: "Executive Member",
  },
  {
    name: "Manish",
    role: "Executive Member",
  },
  {
    name: "Kishan",
    role: "Executive Member",
  },
]

const AboutCardsSection: React.FC = () => {
  return (
    <div className="flex my-8 items-center justify-center">
      <div className="flex flex-wrap gap-10 justify-center">
        {members.map((member, idx) => (
          <Card key={idx} {...member} url={`https://res.cloudinary.com/dfhg1joox/image/upload/v1699890927/yakshagavishti/assets/about/members/${member.name.replaceAll(' ', '_')}.jpg`} />
        ))}
      </div>
    </div>
  );
};

export default AboutCardsSection;
