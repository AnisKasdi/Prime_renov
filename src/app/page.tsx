import Navbar from "@/components/Navbar";
import FloatingDevis from "@/components/FloatingDevis";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import BookingSection, { type SlotData } from "@/components/BookingSection";
import DevisForm from "@/components/DevisForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlobalReveal from "@/components/GlobalReveal";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function Home() {
  const [projects, testimonials, rawSlots] = await Promise.all([
    prisma.project.findMany({ where: { visible: true }, orderBy: { id: 'asc' } }),
    prisma.testimonial.findMany({ orderBy: { id: 'asc' } }),
    prisma.timeSlot.findMany({
      where: { isBooked: false, date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      select: { id: true, date: true, duration: true, meetType: true, meetUrl: true },
    }),
  ]);

  const slots: SlotData[] = rawSlots.map(s => ({
    id: s.id,
    date: s.date.toISOString(),
    duration: s.duration,
    meetType: s.meetType,
    meetUrl: s.meetUrl,
  }));

  return (
    <>
      <Navbar />
      <FloatingDevis />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Services />
        <Testimonials testimonials={testimonials} />
        <BookingSection slots={slots} />
        <DevisForm />
        <Contact />
      </main>
      <Footer />
      <GlobalReveal />
    </>
  );
}
