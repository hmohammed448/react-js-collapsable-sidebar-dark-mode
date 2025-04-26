
const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to Your App
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        A modern web application built with React, TypeScript, and Tailwind CSS.
        Featuring dark mode, responsive design, and smooth animations.
      </p>
      <div className="flex gap-4">
        <a href="#" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Get Started
        </a>
        <a href="#" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Home;

