import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { Button as ButtonNext, Image } from "@nextui-org/react";
import {
  Button,
  ColorPicker,
  Dropdown,
  Input,
  Menu,
  Upload,
  theme,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
import ClickToCopy from "@/app/General/ClickToCopy.jsx";
import { usePathname, useRouter } from "next/navigation";
import { RWebShare } from "react-web-share";
import CategoryUploader from "@/app/[owner]/Admin/Componets/Support/CategoryUploader";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { DATABASE, STORAGE } from "../../../../../Firebase";

import {
  CollapsibleSection,
  CollapsibleSectionMain,
} from "@/app/HomePage/BookingInfo";
import { useUploader } from "@/app/Hooks/useUploader";
import { addToDoc } from "@/app/myCodes/Database";
import { getAuth } from "firebase/auth";
import { Share2 } from "lucide-react";

import {
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Oswald,
  Source_Code_Pro,
  Slabo_27px,
  Raleway,
  PT_Sans,
  Merriweather,
  Rubik,
  Poppins,
  Inter,
  Quicksand,
  Josefin_Sans,
  Bebas_Neue,
  Space_Mono,
  Syne_Mono,
} from "next/font/google";

//FONTS
const syne_Mono = Syne_Mono({
  weight: "400",
  subsets: ["latin"],
});
const space_Mono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
});
const bebas_Neue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});
const josefin_Sans = Josefin_Sans({
  weight: "400",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const open_Sans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});
const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});
const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
});
const source_Code_Pro = Source_Code_Pro({
  weight: "400",
  subsets: ["latin"],
});
const slabo_27px = Slabo_27px({
  weight: "400",
  subsets: ["latin"],
});
const raleway = Raleway({
  weight: "400",
  subsets: ["latin"],
});
const pt_Sans = PT_Sans({
  weight: "400",
  subsets: ["latin"],
});
const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});
const quicksand = Quicksand({
  weight: "400",
  subsets: ["latin"],
});
const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
});
//END FONTS

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const pageFonts = [
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Source Sans Pro",
  "Slabo 27px",
  "Raleway",
  "PT Sans",
  "Merriweather",
  "Poppins",
  "Inter",
  "Quicksand",
  "Rubik",
  "Josefin Sans",
  "Bebas Neue",
  "Space Mono",
  "Syne Mono",
];

const user = getAuth();

const WebsiteEditor = ({ SITEINFO }) => {
  const [loading, setLoading] = useState(false);

  const [siteInfo, setSiteInfo] = useState(
    SITEINFO || {
      name: "",
      heading: "",
      subHeading: "",
      portfolio: [],
      colors: {
        background: "#ffffff",
        accent: "#000000",
        text: "#333333",
        text2: "#333333",
        text3: "#333333",
      },
      terms: [{ title: "", body: [""] }],
      categories: [{ name: "", image: null }],
      logo: null,
      depositFee: 25,
      apointmentInterveral: 30,
    }
  );

  const pageFont =
    siteInfo?.font == "Roboto"
      ? roboto
      : siteInfo?.font == "Open Sans"
        ? open_Sans
        : siteInfo?.font == "Lato"
          ? lato
          : siteInfo?.font == "Montserrat"
            ? montserrat
            : siteInfo?.font == "Oswald"
              ? oswald
              : siteInfo?.font == "Source Code Pro"
                ? source_Code_Pro
                : siteInfo?.font == "Slabo 27px"
                  ? slabo_27px
                  : siteInfo?.font == "Raleway"
                    ? raleway
                    : siteInfo?.font == "PT Sans"
                      ? pt_Sans
                      : siteInfo?.font == "Merriweather"
                        ? merriweather
                        : siteInfo?.font == "Poppins"
                          ? poppins
                          : siteInfo?.font == "Inter"
                            ? inter
                            : siteInfo?.font == "Quicksand"
                              ? quicksand
                              : siteInfo?.font == "Rubik"
                                ? rubik
                                : siteInfo?.font == "Josefin Sans"
                                  ? josefin_Sans
                                  : siteInfo?.font == "Bebas Neue"
                                    ? bebas_Neue
                                    : siteInfo?.font == "Space Mono"
                                      ? space_Mono
                                      : siteInfo?.font == "Syne Mono"
                                        ? syne_Mono
                                        : roboto;

  //check for changes and set saved to false if a change is made
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(false);
  }, [siteInfo]);

  useEffect(() => {
    setSiteInfo(SITEINFO);
  }, [SITEINFO]);

  const pathname = usePathname();
  const pageOwnerUserName = pathname.replace("/Admin", "").replace("/", "");

  const menu = (
    <Menu
      onClick={(e) => {
        setSiteInfo({ ...siteInfo, font: e.key });
      }}
    >
      {pageFonts.map((font) => (
        <Menu.Item key={font}>{font}</Menu.Item>
      ))}
    </Menu>
  );

  //submitt button
  const submit = async () => {
    const portfolioUrl = await handleUploadToFirebase(
      siteInfo.portfolio,
      setLoading
    );
    const imageLogo =
      typeof siteInfo?.logo == "string"
        ? siteInfo?.logo
        : await useUploader(siteInfo?.logo, `${user?.currentUser.uid}/Logo`);
    let imageCategories = [];
    for (let index = 0; index < siteInfo.categories.length; index++) {
      const file = siteInfo.categories[index].image;
      const url =
        typeof file == "string"
          ? file
          : await useUploader(file, "OwnerName/Categories");
      imageCategories.push({
        name: siteInfo.categories[index].name,
        image: url,
      });
    }

    setSiteInfo(() => {
      return { ...siteInfo, categories: imageCategories, logo: imageLogo };
    });

    await addToDoc("Owners", user?.currentUser.uid, {
      siteInfo: {
        ...siteInfo,
        categories: imageCategories,
        logo: imageLogo,
        portfolio: portfolioUrl,
      },
    });
    setSaved(true);
    return "";
  };

  //generate colors for colorPicker
  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });

  const handleInputChange = (field, value) => {
    setSiteInfo({ ...siteInfo, [field]: value });
  };

  const handleColorChange = (colorField, color) => {
    setSiteInfo({
      ...siteInfo,
      colors: { ...siteInfo?.colors, [colorField]: color.toHexString() },
    });
  };

  const handleTermChange = (termIndex, bodyIndex, value) => {
    const updatedTerms = [...siteInfo.terms];
    updatedTerms[termIndex].body[bodyIndex] = value;
    setSiteInfo({ ...siteInfo, terms: updatedTerms });
  };

  const handleTitleChange = (termIndex, value) => {
    const updatedTerms = [...siteInfo.terms];
    updatedTerms[termIndex].title = value;
    setSiteInfo({ ...siteInfo, terms: updatedTerms });
  };

  const addBodyToTerm = (termIndex) => {
    const updatedTerms = [...siteInfo.terms];
    updatedTerms[termIndex].body.push("");
    setSiteInfo({ ...siteInfo, terms: updatedTerms });
  };

  const removeBodyFromTerm = (termIndex, bodyIndex) => {
    const updatedTerms = [...siteInfo.terms];
    if (updatedTerms[termIndex].body.length > 1) {
      updatedTerms[termIndex].body.splice(bodyIndex, 1);
      setSiteInfo({ ...siteInfo, terms: updatedTerms });
    }
  };

  const addTerm = () => {
    setSiteInfo({
      ...siteInfo,
      terms: [...siteInfo.terms, { title: "", body: [""] }],
    });
  };

  const removeTerm = (termIndex) => {
    const updatedTerms = [...siteInfo.terms];
    updatedTerms.splice(termIndex, 1);
    setSiteInfo({ ...siteInfo, terms: updatedTerms });
  };

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...siteInfo.categories];
    updatedCategories[index][field] = value;
    setSiteInfo({ ...siteInfo, categories: updatedCategories });
  };

  const handleLogoUpload = async ({ file }) => {
    setSiteInfo({ ...siteInfo, logo: file });
  };

  const addCategory = () => {
    setSiteInfo({
      ...siteInfo,
      categories: [...siteInfo.categories, { name: "", image: null }],
    });
  };

  const removeCategory = (index) => {
    const updatedCategories = siteInfo.categories.filter((_, i) => i !== index);
    setSiteInfo({ ...siteInfo, categories: updatedCategories });
  };

  const handleUploadToFirebase = async (portfolio, setLoading) => {
    setLoading(true);
    const portUrl = [];
    try {
      const uploadPromises = portfolio.map(async (category) => {
        const imageUrls = await Promise.all(
          category.images.map(async (file) => {
            if (typeof file == "string") return file;
            const storageRef = ref(STORAGE, `categories/${file.name}`);
            const uploadTask = uploadBytesResumable(
              storageRef,
              file.originFileObj
            );
            await new Promise((resolve, reject) => {
              uploadTask.on("state_changed", null, reject, async () => {
                resolve();
              });
            });
            return getDownloadURL(storageRef);
          })
        );

        const categoryData = {
          name: category.name,
          images: imageUrls,
        };
        portUrl.push(categoryData);
        // await addDoc(collection(DATABASE, 'categories'), categoryData);
      });

      await Promise.all(uploadPromises);
      setSiteInfo({ ...siteInfo, portfolio: portUrl });
    } catch (error) {
      console.error("Error uploading categories:", error);
    } finally {
      setLoading(false);
    }

    return portUrl;
  };

  const previewStyle = {
    backgroundColor: siteInfo?.colors.background,
    color: siteInfo?.colors.text,
    borderColor: siteInfo?.colors.accent,
  };

  return (
    <div className="h-full w-full md:w-[60%]  m-auto border p-4 overflow-hidden overflow-y-scroll hidescroll ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Website Settings</h1>
        <p className="mt-2 text-gray-600">
          Customize your booking website's appearance and functionality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Logo
                </label>
                <ImgCrop rotate>
                  <Upload
                    name="logo"
                    listType="picture"
                    defaultFileList={[
                      {
                        uid: "1",
                        name: "logo",
                        status: "done",
                        url: siteInfo?.logo,
                      },
                    ]}
                    maxCount={1}
                    onChange={handleLogoUpload}
                    beforeUpload={(file) => {
                      handleLogoUpload(file);
                      return false;
                    }}
                  >
                    <Button className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                      Upload Logo
                    </Button>
                  </Upload>
                </ImgCrop>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Name
                </label>
                <Input
                  className="w-full"
                  placeholder="Enter your website name"
                  value={siteInfo?.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Booking Settings */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Booking Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deposit Amount
                </label>
                <Input
                  placeholder="Enter deposit fee"
                  value={siteInfo?.depositFee}
                  onChange={(e) =>
                    handleInputChange("depositFee", e.target.value)
                  }
                  prefix="$"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Settings
                </label>
                <div className="space-y-3">
                  <Input
                    placeholder="Duration (minutes)"
                    value={siteInfo?.apointmentInterveral}
                    onChange={(e) =>
                      handleInputChange("apointmentInterveral", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Break time (minutes)"
                    value={siteInfo?.apointmentRestTime}
                    onChange={(e) =>
                      handleInputChange("apointmentRestTime", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Theme Settings */}
          <section className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Theme Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heading */}
              <div>
                <h1 className="font-bold">Site Heading</h1>
                <Input
                  placeholder="Heading"
                  value={siteInfo?.heading}
                  onChange={(e) => handleInputChange("heading", e.target.value)}
                  style={{ marginBottom: "10px" }}
                />

                {/* Sub-heading */}
                <Input
                  placeholder="Sub-heading"
                  value={siteInfo?.subHeading}
                  onChange={(e) =>
                    handleInputChange("subHeading", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Colors
                </h3>
                <div className="space-y-3">
                  <ColorPicker
                    className="w-full"
                    presets={presets}
                    showText={(color) => <span>Background Color</span>}
                    value={siteInfo?.colors.background}
                    onChange={(color) => handleColorChange("background", color)}
                  />
                  <ColorPicker
                    className="w-full"
                    presets={presets}
                    showText={(color) => <span>Accent Color</span>}
                    value={siteInfo?.colors.accent}
                    onChange={(color) => handleColorChange("accent", color)}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Typography
                </h3>
                <div className="space-y-3">
                  <Dropdown overlay={menu}>
                    <Button className="w-full">
                      {siteInfo?.font || "Select Font Family"}
                    </Button>
                  </Dropdown>
                  <ColorPicker
                    className="w-full"
                    presets={presets}
                    showText={(color) => <span>Text Color</span>}
                    value={siteInfo?.colors.text}
                    onChange={(color) => handleColorChange("text", color)}
                  />
                  <ColorPicker
                    className="w-full"
                    presets={presets}
                    showText={(color) => <span>Text Color</span>}
                    value={siteInfo?.colors.text2}
                    onChange={(color) => handleColorChange("text2", color)}
                  />
                  <ColorPicker
                    className="w-full"
                    presets={presets}
                    showText={(color) => <span>Text Color</span>}
                    value={siteInfo?.colors.text3}
                    onChange={(color) => handleColorChange("text3", color)}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-4">
          {/* Share Section */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Share Your Website
              </h3>
              <RWebShare
                data={{
                  text: `/${pageOwnerUserName}/Booking`,
                  url: `https://booxy.vercel.app/${pageOwnerUserName}/Booking`,
                  title: "Website Link",
                }}
              >
                <Button
                  icon={<Share2 className="w-4 h-4" />}
                  className="flex items-center gap-2"
                >
                  Share
                </Button>
              </RWebShare>
            </div>
            <p className="mt-2 text-sm text-gray-600 w-1/2 md:w-auto">
              Your website is available at:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded ">
                booxy.vercel.app/{pageOwnerUserName}/Booking
              </code>
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Live Preview
            </h2>
            <div
              className={`${pageFont.className} border rounded-lg overflow-hidden`}
            >
              <div
                className="p-6 space-y-4"
                style={{ backgroundColor: siteInfo?.colors.background }}
              >
                {siteInfo?.logo && (
                  <div className="flex justify-center">
                    <Image
                      className="h-20 w-20 rounded-full bg-black"
                      src={siteInfo?.logo}
                      alt="Website Logo"
                    />
                  </div>
                )}
                <h2
                  className="text-2xl font-bold text-center"
                  style={{ color: siteInfo?.colors.accent }}
                >
                  {siteInfo?.heading || "Your Website Heading"}
                </h2>
                <p
                  className="text-center"
                  style={{ color: siteInfo?.colors.text }}
                >
                  {siteInfo?.subHeading ||
                    "Your website subheading will appear here"}
                </p>

                <CollapsibleSectionMain title={"Read Terms"}>
                  <CollapsibleSection title="Deposit">
                    <ul className="space-y-4">
                      <li style={{ color: siteInfo?.colors.text }}>
                        $20 deposit is required to book, and it is
                        non-refundable.
                      </li>
                    </ul>
                  </CollapsibleSection>
                </CollapsibleSectionMain>

                <div className="mt-8">
                  <ButtonNext
                    style={{
                      color: siteInfo?.colors.text2,
                      backgroundColor: siteInfo?.colors.accent,
                    }}
                    className="w-full py-3 rounded-lg font-bold text-center"
                  >
                    Book Now
                  </ButtonNext>
                </div>
              </div>
            </div>
          </div>

          <Button
            loading={loading}
            color="primary"
            className="w-full col bg-blue-500 text-white my-10 h-10 fixed md:relative left-0 bottom-0 z-50"
            onClick={submit}
          >
            SAVE
          </Button>
        </div>

        <div>
          {/* Terms */}
          <div style={{ marginBottom: "20px" }}>
            <h3 className="font-bold">Terms & Conditions</h3>
            <p className=" font-light text-xs">Tell customers your rules.</p>
            {(siteInfo?.terms || []).map((term, termIndex) => (
              <div
                key={termIndex}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <Input
                  placeholder="Term Title ex. Cancellation Policy"
                  value={term.title}
                  onChange={(e) => handleTitleChange(termIndex, e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                {(term?.body || []).map((body, bodyIndex) => (
                  <div key={bodyIndex} style={{ marginBottom: "10px" }}>
                    <Input.TextArea
                      placeholder={`Term Body ex. No refunds after 24 hours`}
                      value={body}
                      onChange={(e) =>
                        handleTermChange(termIndex, bodyIndex, e.target.value)
                      }
                      rows={4}
                    />
                    <Button
                      onClick={() => removeBodyFromTerm(termIndex, bodyIndex)}
                      danger
                      style={{ marginTop: "5px" }}
                    >
                      Remove Body
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => addBodyToTerm(termIndex)}
                  type="dashed"
                  style={{ marginTop: "10px" }}
                >
                  Add Body
                </Button>
                <Button
                  onClick={() => removeTerm(termIndex)}
                  danger
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                  Remove Term
                </Button>
              </div>
            ))}
            <Button onClick={addTerm} type="dashed">
              Add Term
            </Button>
          </div>

          {/* Categories */}
          <div
            className="border-dashed border-2 p-2"
            style={{ marginBottom: "20px" }}
          >
            <h3 className="font-bold text-lg">Categories</h3>
            <p clcssName=" font-extralight text-xs">of servics you offer.</p>
            <div className="">
              {SITEINFO?.categories.map((category, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <Input
                    placeholder="Category Name"
                    value={category.name}
                    onChange={(e) =>
                      handleCategoryChange(index, "name", e.target.value)
                    }
                    style={{ marginBottom: "5px" }}
                  />
                  {console.log(category)}
                  <ImgCrop rotate>
                    <Upload
                      listType="picture"
                      defaultFileList={[
                        {
                          uid: `-${index}`,
                          name: "image",
                          status: "done",
                          url: category.image,
                        },
                      ]}
                      maxCount={1}
                      beforeUpload={(file) => {
                        handleCategoryChange(index, "image", file);
                        return false;
                      }}
                    >
                      <Button>Upload Selection Image</Button>
                    </Upload>
                  </ImgCrop>
                  <Button onClick={() => removeCategory(index)} danger>
                    Remove Category
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addCategory} type="dashed">
              Add Category
            </Button>
          </div>

          <CategoryUploader
            siteInfo={siteInfo}
            handleUploadToFirebase={handleUploadToFirebase}
            setSiteInfo={setSiteInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsiteEditor;
