import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle, images }) => {
  // Variants for grid items (images)
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Variants for the entire grid container
  const gridVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1, // Stagger effect for grid items
      },
    },
  };

  // Variants for the title and subtitle
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 mt-12">
      <div className="max-w-md text-center">
        {/* Animated Grid */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden"
              variants={imageVariants}
              whileHover={{ scale: 1.05 }} // Slight zoom on hover
            >
              <img
                src={src}
                alt={`Person ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Title */}
        <motion.h2
          className="text-2xl font-bold mb-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h2>

        {/* Animated Subtitle */}
        <motion.p
          className="text-base-content/60"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
