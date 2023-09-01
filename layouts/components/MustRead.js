import Image from "next/image";
import Link from "next/link";

const MustRead = ({ src }) => {

  return (

    <div className="flex">
      {/* First Column */}
      <div className="w-1/4 p-4">
        <div className="bg-blue-200 p-4 rounded-lg">
          <h1 className="text-xl font-semibold">Column 1</h1>
          <p>This is the content of column 1.</p>
        </div>
      </div>

      {/* Second Column */}
      <div className="w-2/4 p-4">
        <div className="bg-green-200 p-4 rounded-lg">
          <h1 className="text-xl font-semibold">Column 2</h1>
          <p>This is the content of column 2.</p>
        </div>
      </div>

      {/* Third Column */}
      <div className="w-1/4 p-4">
        <div className="bg-yellow-200 p-4 rounded-lg">
          <h1 className="text-xl font-semibold">Column 3</h1>
          <p>This is the content of column 3.</p>
        </div>
      </div>
    </div>
  );

};

export default MustRead;
