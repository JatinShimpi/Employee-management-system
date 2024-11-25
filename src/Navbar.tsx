const Navbar = () => {
  return (
    <div
      className=" top-0 left-0 w-full flex justify-between items-center p-4 bg-blue-800"
      //   initial={{ opacity: 0, y: -50 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ delay: 2, type: "keyframes", duration: 1 }}
    >
      <div
        className="text-white text-3xl font-bold ml-4"
        // whileHover={{
        //   scale: 1.1, // Zoom in effect
        //   transition: { duration: 0.3 }, // Smooth transition for scaling
        // }}
      >
        <img
          src="/image.png"
          className="w-full h-10"
        ></img>
      </div>

      <ul className="flex space-x-10 mr-96">
        {["Home", "About", "Services", "Contact"].map((item, index) => (
          <li
            key={index}
            className="text-white font-custom text-lg hover:text-slate-300 transition-colors duration-300 cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
