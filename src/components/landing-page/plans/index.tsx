const Plans = () => {
  return (
    <div className="screen-max-width px-4 py-5 md:py-16 md:pb-8 gap-4">
      <div className="w-fit">
        <p>HOW DOES GREENBOUNTY WORK ?</p>
        <p className="text-xl font-semibold">How It Works</p>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-8">
        {/* Standard Basket */}
        <div className="flex flex-col h-auto w-[280px] bg-primary text-white p-6 rounded-lg border duration-300 ease-in-out">
          <p className="text-xl font-semibold text-center text-white">
            Standard Basket
          </p>
          <p className="font-medium text-center text-4xl mt-16">$0</p>
          <ul className="mt-16 space-y-4 text-smflex-grow">
            <li>Plastics, Nylons and Papers</li>
            <li>Earn Ecocoins for each bounty</li>
            <li>Weekly Pickups</li>
          </ul>
        </div>

        {/* Premium Basket */}
        <div className="flex flex-col h-auto w-[280px]  bg-primary text-white p-6 rounded-lg border duration-300 ease-in-out">
          <p className="text-xl font-semibold text-center">
            Premium Basket
          </p>
          <p className="font-medium text-center text-4xl mt-16 ">
            $20
          </p>
          <ul className="mt-16 space-y-4 text-smflex-grow">
            <li>Materials like metals, Irons</li>
            <li>Earn Double Eco-coins</li>
            <li>Pickups upon request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Plans;
