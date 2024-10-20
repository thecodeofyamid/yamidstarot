import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Coffee, Instagram, Twitter } from 'lucide-react';

const tarotistInfo = {
  name: "Yamid Tarot",
  description: "Soy un tarotista joven con un enfoque moderno e intuitivo. Mi misión es ayudarte a descubrir tu camino y potencial interno a través de las cartas del tarot.",
  specialties: ["Lecturas personalizadas", "Tarot para desarrollo personal", "Sesiones online"],
};

const saveContactToFile = (contact: any) => {
  const contacts = [contact];
  const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contact.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact = { name, email, message };
    saveContactToFile(contact);
    setName("");
    setEmail("");
    setMessage("");
    alert("Gracias por contactarme. Tu información ha sido guardada.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://c1.wallpaperflare.com/preview/572/30/566/tarot-cards-fortune-symbol.jpg')",
          y: backgroundY,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      <div className="relative z-20">
        <header className="p-4 sm:p-6 flex justify-between items-center flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold w-full sm:w-auto mb-4 sm:mb-0 text-center sm:text-left">{tarotistInfo.name}</h1>
          <nav className="flex space-x-4 w-full sm:w-auto justify-center sm:justify-end">
            <a href="#about" className="hover:text-purple-300">Sobre mí</a>
            <a href="#services" className="hover:text-purple-300">Servicios</a>
            <a href="#contact" className="hover:text-purple-300">Contacto</a>
          </nav>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col justify-center items-center text-center sm:text-left sm:items-start"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-center sm:text-left">Descubre tu camino</h2>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl text-center sm:text-left">{tarotistInfo.description}</p>
            <motion.a 
              href="https://wa.me/573124673850?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20lectura%20de%20tarot." 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full w-full sm:w-max"
            >
              Reserva tu lectura
            </motion.a>
          </motion.section>

          <motion.section 
            id="services"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-8">Mis servicios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {tarotistInfo.specialties.map((specialty, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white bg-opacity-10 p-6 rounded-lg"
                >
                  <Star className="h-8 w-8 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{specialty}</h3>
                  <p>{
                    specialty === "Lecturas personalizadas" ? "Ofrezco lecturas de tarot completamente adaptadas a tus necesidades personales, enfocándome en las preguntas o inquietudes que más te importan." :
                    specialty === "Tarot para desarrollo personal" ? "Estas sesiones están diseñadas para ayudarte a encontrar un crecimiento interno y comprender mejor tus potenciales y bloqueos personales." :
                    specialty === "Sesiones online" ? "Accede a una lectura de tarot desde la comodidad de tu hogar, a través de una videollamada que te permitirá conectarte y explorar tu camino sin importar donde estés." :
                    "En Colombia, el tarot no es solo una herramienta de adivinación, sino una guía para descubrir el potencial interno de cada persona. Las sesiones buscan brindar claridad y acompañamiento en momentos de incertidumbre."
                  }</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold mb-8">Contáctame</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto sm:mx-0">
              <input 
                type="text" 
                placeholder="Nombre" 
                className="w-full mb-4 p-2 rounded bg-white bg-opacity-20" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full mb-4 p-2 rounded bg-white bg-opacity-20" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea 
                placeholder="Mensaje" 
                rows={4} 
                className="w-full mb-4 p-2 rounded bg-white bg-opacity-20" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                type="submit"
              >
                Enviar
              </motion.button>
            </form>
          </motion.section>
        </main>

        <footer className="bg-black bg-opacity-50 py-6">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 {tarotistInfo.name}. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-purple-300"><Coffee className="h-6 w-6" /></a>
              <a href="#" className="hover:text-purple-300"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="hover:text-purple-300"><Twitter className="h-6 w-6" /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
