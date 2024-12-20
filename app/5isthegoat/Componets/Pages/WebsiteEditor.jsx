import { useState } from "react";

export default function WebsiteEditor() {
  const [siteInfo, setSiteInfo] = useState({
    name: "Website Name",
    heading: "Website Heading",
    subHeading: "Website Sub-Heading",
    bgColor: "bg-white",
    accentColor: "bg-blue-500",
    textColor1: "text-gray-800",
    textColor2: "text-gray-600",
    terms: [{ title: "", body: "" }],
  });

  const handleInputChange = (field, value) => {
    setSiteInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleTermChange = (index, field, value) => {
    const updatedTerms = [...siteInfo.terms];
    updatedTerms[index][field] = value;

    if (
      field === "body" &&
      value.trim() !== "" &&
      index === updatedTerms.length - 1
    ) {
      updatedTerms.push({ title: "", body: "" });
    }

    setSiteInfo((prev) => ({
      ...prev,
      terms: updatedTerms.filter(
        (term) => term.title.trim() !== "" || term.body.trim() !== "" || term.title === ""
      ),
    }));
  };

  return (
    <div className={`${siteInfo.bgColor} min-h-screen p-8 ${siteInfo.textColor1}`}>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className={`text-2xl font-bold ${siteInfo.textColor1}`}>Website Editor</h1>

        {/* Name Input */}
        <div>
          <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Website Name</label>
          <input
            type="text"
            value={siteInfo.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* Heading Input */}
        <div>
          <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Heading</label>
          <input
            type="text"
            value={siteInfo.heading}
            onChange={(e) => handleInputChange("heading", e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* Sub-Heading Input */}
        <div>
          <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Sub-Heading</label>
          <input
            type="text"
            value={siteInfo.subHeading}
            onChange={(e) => handleInputChange("subHeading", e.target.value)}
            className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* Colors Input */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Background Color</label>
            <input
              type="text"
              value={siteInfo.bgColor}
              onChange={(e) => handleInputChange("bgColor", e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Accent Color</label>
            <input
              type="text"
              value={siteInfo.accentColor}
              onChange={(e) => handleInputChange("accentColor", e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Text Color 1</label>
            <input
              type="text"
              value={siteInfo.textColor1}
              onChange={(e) => handleInputChange("textColor1", e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Text Color 2</label>
            <input
              type="text"
              value={siteInfo.textColor2}
              onChange={(e) => handleInputChange("textColor2", e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Terms Section */}
        <div>
          <label className={`block text-sm font-medium ${siteInfo.textColor1}`}>Terms</label>
          <div className="space-y-4">
            {siteInfo.terms.map((term, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  value={term.title}
                  onChange={(e) => handleTermChange(index, "title", e.target.value)}
                  placeholder={`Title ${index + 1}`}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
                <textarea
                  value={term.body}
                  onChange={(e) => handleTermChange(index, "body", e.target.value)}
                  placeholder={`Body ${index + 1}`}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className={`p-4 rounded-md shadow-md ${siteInfo.accentColor} text-white`}>
          <h2 className="text-lg font-bold">Preview</h2>
          <p>Website Name: {siteInfo.name}</p>
          <p>Heading: {siteInfo.heading}</p>
          <p>Sub-Heading: {siteInfo.subHeading}</p>
          <p>Terms:</p>
          <ul>
            {siteInfo.terms
              .filter((term) => term.title.trim() !== "" || term.body.trim() !== "")
              .map((term, index) => (
                <li key={index}>
                  <strong>{term.title}</strong>: {term.body}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
