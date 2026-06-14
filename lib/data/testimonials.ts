export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Their targeted campaigns reached exactly the right audience. We saw a 150% increase in student enrollment — numbers we hadn't thought possible.",
    name: "Anand Jaiswal",
    role: "Director",
    company: "Mentors Eduserv",
    metric: "+150% enrollment",
  },
  {
    quote:
      "100M+ views and a complete redefinition of how Motion shows up online — within a single month. That's not marketing, that's momentum.",
    name: "Nitin Vijay",
    role: "Founder & CEO",
    company: "Motion Education",
    metric: "100M+ views in 1 month",
  },
  {
    quote:
      "The video production quality and creative concepts are consistently exceptional. They create content that genuinely resonates with our audience.",
    name: "Priya Patel",
    role: "Brand Manager",
    company: "Amazon MiniTV",
    metric: "Premium content at scale",
  },
  {
    quote:
      "Our social media went from quiet to a genuine hub for music fans. They transformed how our community connects with us.",
    name: "Founder",
    role: "Founder",
    company: "Sikh Music",
    metric: "Community transformed",
  },
];
