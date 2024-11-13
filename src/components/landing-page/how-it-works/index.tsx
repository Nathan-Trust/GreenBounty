const items = [
  {
    number: "01",
    title: "Order your test",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint maxime itaque aperiam ducimus sunt velit quaerat eaque adipisci impedit minus cumque repellat corporis modi.",
  },
  {
    number: "02",
    title: "Collect sample",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint maxime itaque aperiam ducimus sunt velit quaerat eaque adipisci impedit minus cumque repellat corporis modi.",
  },
  {
    number: "03",
    title: "Get results",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint maxime itaque aperiam ducimus sunt velit quaerat eaque adipisci impedit minus cumque repellat corporis modi.",
  },
];

const HowItWorks = () => {
  return (
    <div className="screen-max-width px-4 py-5 md:py-16 gap-4">
      <div className="w-fit">
        <p>HOW DOES GREENBOUNTY WORK ?</p>
        <p className="text-xl font-semibold">How It Works</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
        {items.map((item, index) => (
          <div key={index}>
            <div className="bg-primary/5 h-44"></div>
            <div className="relative  mt-4 p-4">
              <p
                className="absolute text-[6rem] font-bold text-primary/10 z-10 -top-8 left-0"
                style={{ WebkitTextStroke: "2px transparent" }}
              >
                {item.number}
              </p>
              <p className="text-md mt-5 z-20 font-medium relative">
                {item.title}
              </p>
              <p className="text-sm z-20 relative text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
