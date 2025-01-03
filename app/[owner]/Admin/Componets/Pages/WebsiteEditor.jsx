import { generate, green, presetPalettes, red } from '@ant-design/colors';
import { Button as ButtonNext, Image } from '@nextui-org/react';
import { Button, ColorPicker, Dropdown, Input, Menu, Upload, theme } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import ClickToCopy from '@/app/General/ClickToCopy.jsx'
import { usePathname, useRouter } from "next/navigation"
import { RWebShare } from "react-web-share";
import CategoryUploader from '@/app/[owner]/Admin/Componets/Support/CategoryUploader';      

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {  collection, addDoc } from 'firebase/firestore';
import { DATABASE, STORAGE,  } from '../../../../../Firebase';


import { CollapsibleSection, CollapsibleSectionMain } from '@/app/HomePage/BookingInfo';
import { useUploader } from '@/app/Hooks/useUploader';
import { addToDoc } from '@/app/myCodes/Database';
import { getAuth } from 'firebase/auth';
import { Share2 } from 'lucide-react';

import { Roboto, Open_Sans, Lato, Montserrat, Oswald, Source_Code_Pro, Slabo_27px, Raleway, PT_Sans, Merriweather, Rubik, Poppins, Inter,Quicksand, Josefin_Sans, Bebas_Neue, Space_Mono, Syne_Mono  } from "next/font/google"




//FONTS 
const syne_Mono = Syne_Mono({
  weight: '400',
  subsets: ['latin'],
})
const space_Mono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
})
const bebas_Neue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
})
const josefin_Sans = Josefin_Sans({
  weight: '400',
  subsets: ['latin'],
})
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
const open_Sans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
})
const lato = Lato({
  weight: '400',
  subsets: ['latin'],
})
const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
})
const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
})
const source_Code_Pro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
})
const slabo_27px = Slabo_27px({
  weight: '400',
  subsets: ['latin'],
})
const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
})
const pt_Sans = PT_Sans({
  weight: '400',
  subsets: ['latin'],
})
const merriweather = Merriweather({
  weight: '400',
  subsets: ['latin'],
})
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})
const inter = Inter({
  weight: '400',
  subsets: ['latin'],
})
const quicksand = Quicksand({
  weight: '400',
  subsets: ['latin'],
})
const rubik = Rubik({
  weight: '400',
  subsets: ['latin'],
})
//END FONTS


 

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const pageFonts = [
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Oswald',
    'Source Sans Pro',
    'Slabo 27px',
    'Raleway',
    'PT Sans',
    'Merriweather',
    'Poppins',
    'Inter',
    'Quicksand',
    'Rubik',
    'Josefin Sans',
    'Bebas Neue',
    'Space Mono',
    'Syne Mono',
  ];



const user = getAuth()





const WebsiteEditor = ({SITEINFO}) => {
  const [loading, setLoading] = useState(false)

  const [siteInfo, setSiteInfo] = useState(SITEINFO ||{
    name: '',
    heading: '',
    subHeading: '',
    portfolio:[],
    colors: {
      background: '#ffffff',
      accent: '#000000',
      text: '#333333',
      text2: '#333333',
      text3: '#333333',
    },
    terms: [{ title: '', body: [''] }],
    categories: [{ name: '', image: null }],
    logo: null,
    depositFee: 25,
    apointmentInterveral: 30
  });


  const pageFont = siteInfo?.font == 'Roboto' ? roboto :
  siteInfo?.font == 'Open Sans' ? open_Sans :
  siteInfo?.font == 'Lato' ? lato : 
  siteInfo?.font == 'Montserrat' ? montserrat : 
  siteInfo?.font == 'Oswald' ? oswald : 
  siteInfo?.font == 'Source Code Pro' ? source_Code_Pro : 
  siteInfo?.font == 'Slabo 27px' ? slabo_27px : 
  siteInfo?.font == 'Raleway' ? raleway : 
  siteInfo?.font == 'PT Sans' ? pt_Sans : 
  siteInfo?.font == 'Merriweather' ? merriweather :
  siteInfo?.font == 'Poppins' ? poppins :
  siteInfo?.font == 'Inter' ? inter :
  siteInfo?.font == 'Quicksand' ? quicksand :
  siteInfo?.font == 'Rubik' ? rubik :
  siteInfo?.font == 'Josefin Sans' ? josefin_Sans :
  siteInfo?.font == 'Bebas Neue' ? bebas_Neue :
  siteInfo?.font == 'Space Mono' ? space_Mono :
  siteInfo?.font == 'Syne Mono' ? syne_Mono : roboto
  

  //check for changes and set saved to false if a change is made
  const [saved, setSaved] = useState(false)
  useEffect(() => {setSaved(false)}, [siteInfo])

  useEffect(() => {
    setSiteInfo(SITEINFO)
  }, [SITEINFO])
  

const pathname = usePathname()
const pageOwnerUserName = pathname.replace('/Admin','').replace('/','')


console.log(siteInfo)

const menu = (
  <Menu onClick={(e) => { setSiteInfo({ ...siteInfo, font: e.key })}}>
    {pageFonts.map((font) => (
      <Menu.Item key={font}>
        {font}
      </Menu.Item>
    ))}
  </Menu>
);

  
//submitt button
const submit = async () =>{
const portfolioUrl = await handleUploadToFirebase(siteInfo.portfolio, setLoading)
  const imageLogo = (typeof( siteInfo?.logo) == 'string') ? siteInfo?.logo  : await useUploader(siteInfo?.logo, `${user?.currentUser.uid}/Logo`)
  let imageCategories = []
  for (let index = 0; index < siteInfo.categories.length; index++) {
          const file = siteInfo.categories[index].image;
          const url = typeof(file) == 'string'? file : await useUploader(file, 'OwnerName/Categories')
          imageCategories.push({name: siteInfo.categories[index].name,image:url})
      }

  setSiteInfo(()=>{return({...siteInfo, categories:imageCategories, logo: imageLogo})})
  
 
  await addToDoc('Owners', user?.currentUser.uid, {siteInfo:{...siteInfo, categories:imageCategories, logo: imageLogo, portfolio:portfolioUrl}})
  setSaved(true)
  return('')
}


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
    updatedTerms[termIndex].body.push('');
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
      terms: [...siteInfo.terms, { title: '', body: [''] }],
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

  const handleLogoUpload = async ( {file} ) => {
      setSiteInfo({ ...siteInfo, logo: file});
    
  };

  const addCategory = () => {
    setSiteInfo({
      ...siteInfo,
      categories: [...siteInfo.categories, { name: '', image: null }],
    });
  };

  const removeCategory = (index) => {
    const updatedCategories = siteInfo.categories.filter((_, i) => i !== index);
    setSiteInfo({ ...siteInfo, categories: updatedCategories });
  };


  const handleUploadToFirebase = async (portfolio, setLoading) => {
    setLoading(true);
    const portUrl = []
    try {
      const uploadPromises = portfolio.map(async (category) => {
        const imageUrls = await Promise.all(
          category.images.map(async (file) => {
            if (typeof(file) == 'string') return file
            const storageRef = ref(STORAGE, `categories/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
            await new Promise((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                null,
                reject,
                async () => {
                  resolve();
                }
              );
            });
            return getDownloadURL(storageRef);
          })
        );

        const categoryData = {
          name: category.name,
          images: imageUrls,
        };
        portUrl.push(categoryData)
       // await addDoc(collection(DATABASE, 'categories'), categoryData);
      });

      await Promise.all(uploadPromises);
      setSiteInfo({ ...siteInfo, portfolio: portUrl });
    } catch (error) {
      console.error('Error uploading categories:', error);
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
    <div className='h-full w-full md:w-[60%]  m-auto border p-4 overflow-hidden overflow-y-scroll hidescroll ' >
     
     <div className='center-col gap-2'>
       {/* Logo Upload */}
       <ImgCrop rotate>
        <Upload
          name="logo"
          listType="picture"
          defaultFileList={
            [{
              uid: '1',
              name: 'logo',
              status: 'done',
              url: siteInfo?.logo,
            },]
          }
          maxCount={1}
          onChange={handleLogoUpload}
          beforeUpload={(file) => {
            handleLogoUpload(file );
            return false;
          }}
        >
          <Button>Upload Site Logo</Button>
        </Upload>
      </ImgCrop>

      {/* Website Name */}
      <Input
        placeholder="Website Name"
        value={siteInfo?.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <div className='border border-dashed my-4 p-2'>
        <lable>Booking Deposit</lable>
        <Input
        placeholder="Deposit Fee"
        value={siteInfo?.depositFee}
        onChange={(e) => handleInputChange('depositFee', e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      </div>
      
      <div className='border border-dashed md:w-1/3 w-3/4 my-4 p-2'>
        <lable>appointment Interval</lable>
        <Input
        placeholder="Appointments every X minutes"
        value={siteInfo?.apointmentInterveral}
        onChange={(e) => handleInputChange('apointmentInterveral', e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <lable>Time in between</lable>
        <Input
        placeholder="minutes between appointments"
        value={siteInfo?.apointmentRestTime}
        onChange={(e) => handleInputChange('apointmentRestTime', e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      </div>
      
      

      {/* Heading */}
     <div>
     <h1 className='font-bold'>Site Heading</h1>
      <Input
        placeholder="Heading"
        value={siteInfo?.heading}
        onChange={(e) => handleInputChange('heading', e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      {/* Sub-heading */}
      <Input
        placeholder="Sub-heading"
        value={siteInfo?.subHeading}
        onChange={(e) => handleInputChange('subHeading', e.target.value)}
        style={{ marginBottom: '10px' }}
      />
     </div>
     </div>



{/* Terms */}
<div style={{ marginBottom: '20px' }}>
        <h3 className="font-bold">Terms & Conditions</h3>
        {((siteInfo?.terms || [])).map((term, termIndex) => (
          <div key={termIndex} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <Input
              placeholder="Term Title ex. Cancellation Policy"
              value={term.title}
              onChange={(e) => handleTitleChange(termIndex, e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            {(term?.body || []).map((body, bodyIndex) => (
              <div key={bodyIndex} style={{ marginBottom: '10px' }}>
                <Input.TextArea
                  placeholder={`Body ${bodyIndex + 1}`}
                  value={body}
                  onChange={(e) => handleTermChange(termIndex, bodyIndex, e.target.value)}
                  rows={4}
                />
                <Button
                  onClick={() => removeBodyFromTerm(termIndex, bodyIndex)}
                  danger
                  style={{ marginTop: '5px' }}
                >
                  Remove Body
                </Button>
              </div>
            ))}
            <Button onClick={() => addBodyToTerm(termIndex)} type="dashed" style={{ marginTop: '10px' }}>
              Add Body
            </Button>
            <Button onClick={() => removeTerm(termIndex)} danger style={{ marginTop: '10px', marginLeft: '10px' }}>
              Remove Term
            </Button>
          </div>
        ))}
        <Button onClick={addTerm} type="dashed">
          Add Term
        </Button>
      </div>

      {/* Categories */}
      <div className='border-dashed border-2 p-2' style={{ marginBottom: '20px' }}>
        <h3 className='font-bold text-lg'>Categories</h3>
        <div className=''>
        {siteInfo?.categories.map((category, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Input
              placeholder="Category Name"
              value={category.name}
              onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
              style={{ marginBottom: '5px' }}
            />
            <ImgCrop rotate>
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={(file) => {
                  handleCategoryChange(index, 'image', file);
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

      <CategoryUploader siteInfo={siteInfo} handleUploadToFirebase={handleUploadToFirebase}  setSiteInfo={setSiteInfo}/>

      
         {/* Color Pickers */}
          <h3 className='font-bold text-3xl text-center'>Theme</h3>
          <div className='m-auto p-1 center-col overflow-x-scroll hidescroll' style={{ marginBottom: '20px' }}>
            <div className='grid grid-cols-1   md:w-[80%] m-auto'>
              <div className='m-auto'>
                <ColorPicker className='w-40 justify-start' presets={presets} showText={(color)=>(<div>Background Color</div>)} value={siteInfo?.colors.background} onChange={(color) => handleColorChange('background', color)} />
              </div>
              <div className='m-auto'>
                <ColorPicker className='w-40 justify-start' presets={presets} showText={(color)=>(<div>Accent Color</div>)} value={siteInfo?.colors.accent} onChange={(color) => handleColorChange('accent', color)} />
              </div>
              <div className='p-1 m-auto center-col border w-40'>
                <div className='text-center'>Text Color</div>
                <div className='w-full flex flex-col justify-star items-start'>
                <ColorPicker showText={(color)=>(<div>Text Main</div>)} className=' w-32 justify-start' presets={presets}  value={siteInfo?.colors.text} onChange={(color) => handleColorChange('text', color)} />
                <ColorPicker showText={(color)=>(<div>Text Accent</div>)} className='w-32 justify-start'  presets={presets}  value={siteInfo?.colors.text2} onChange={(color) => handleColorChange('text2', color)} />
                <ColorPicker showText={(color)=>(<div>Text Etc</div>)} className='w-32 justify-start'  presets={presets}  value={siteInfo?.colors.text3} onChange={(color) => handleColorChange('text3', color)} />
                </div>
              </div>
              <div className='m-auto'>
              </div>
            </div>
          </div>
          {/* Font Picker */}
          <div className='m-auto p-1 center-col' style={{ marginBottom: '20px' }}>
            <p>Select Font:</p>
            <Dropdown overlay={menu}>
              <Button>
                {siteInfo.font || 'Choose a font'}
              </Button>
            </Dropdown>
          </div>

      
      {/* Preview */}
      <div className={`center-col rounded-xl overflow-hidden ${pageFont.className}`} style={{ ...previewStyle, padding: '20px', border: '1px solid' }}>
        <Image className='bg-black h-20 w-20 rounded-full' src={siteInfo?.logo} />
        <h2 className='font-bold' style={{color: siteInfo?.colors.accent}}>{siteInfo?.heading}</h2>
        <p style={{color: siteInfo?.colors.text}}>{siteInfo?.subHeading}</p>

        <CollapsibleSectionMain title={'Read Terms'}>
                <CollapsibleSection title="Deposit">
                    <ul className="space-y-4">
                        <li style={{color: siteInfo?.colors.text}}>$20 deposit is required to book, and it is non-refundable.</li>
                        
                    </ul>
                </CollapsibleSection>
          </CollapsibleSectionMain>

          <ButtonNext style={{color: siteInfo?.colors.text2, backgroundColor: siteInfo?.colors.accent}} className='center p-2 font-bold text-xl '>Continue</ButtonNext>
          
          <div style={{backgroundColor: siteInfo?.colors.background}} className='rounded w-3/4  center p-2 my-4 h-20 m-auto'>
            <div style={{backgroundColor: siteInfo?.colors.accent}} className='h-20 w-20 center font-bold rounded-lg'>
              <h1 className='center' style={{ color: siteInfo?.colors.text2}}>5</h1>
            </div>
          </div>

      </div>
<div className='flex flex-col text-sm  items-center gap-4 p-6 bg-gray-100 rounded-lg rounded-t-none shadow-md'>
  <h1 className='font-bold text-xl text-gray-800'>Website Link</h1>
  <RWebShare
        data={{
          text: `/${pageOwnerUserName}/Booking`,
          url: `https://booxy.vercel.app/${pageOwnerUserName}/Booking`,
          title: "Website Link",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button><Share2/></button>
      </RWebShare>
</div>
      <Button  loading={loading} color='primary' className='w-full bg-blue-500 text-white my-10 h-10' onClick={submit}>SAVE</Button>

    </div>
  );
};

export default WebsiteEditor;

       
