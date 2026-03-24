import { Button } from "@/components/ui/button";

export default function AboutUs() {
    return (
      <div className="py-30">
        {/* dot heading */}
            <div>
            <span className="bg-cyan-400"></span>
                <p>01 -- ABOUT</p>
        </div>
        {/* content */}
        <div>
          <h1 className="text-4xl font-medium text-center w-350 mx-auto">
            We’re a real estate agency that helps people find homes that match
            <span className="text-gray-500">
              {" "}
              their lifestyle and investments that grow their future.
            </span>
          </h1>
        </div>
        {/* stat */}
        <div className="flex justify-between items-center w-350 mx-auto mt-16">
          <div>
            <h1 className="text-8xl">120+</h1>
            <p>Years of Combined Experience</p>
          </div>
          <div>
            <Button className="px-6 py-5 cursor-pointer rounded-md">More About Us</Button>
          </div>
          <div>
            <h1 className="text-8xl">350+</h1>
            <p className="text-end">Properties Sold</p>
          </div>
        </div>
      </div>
    );
}