import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { SketchPicker } from 'react-color';
import { Button as ButtonNext, Image } from '@nextui-org/react';
import { Input, Button, Upload, message, ColorPicker, theme } from 'antd';
import { generate, green, presetPalettes, red } from '@ant-design/colors';



import { CollapsibleSection, CollapsibleSectionMain } from '@/app/HomePage/BookingInfo';
import Bookings from '@/app/Calendar/Booking';
import { fileToBase64Url, getBase64 } from '@/app/myCodes/Util';
import { addToDoc } from '@/app/myCodes/Database';
import { useUploader } from '@/app/Hooks/useUploader';

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));


const WebsiteEditor = () => {
  const [siteInfo, setSiteInfo] = useState({
    name: '',
    heading: '',
    subHeading: '',
    colors: {
      background: '#ffffff',
      accent: '#000000',
      text: '#333333',
      text2: '#333333',
      text3: '#333333',
    },
    terms: [{ title: '', body: '' }],
    categories: [{ name: '', image: null }],
    logo: null,
    depositFee: 25
  });

  console.log(siteInfo)

const submit = async () =>{

  const imageLogo = await useUploader(siteInfo.logo, 'OwnerName/Logo')
  console.log(imageLogo)
  
  let imageCategories = []
  for (let index = 0; index < siteInfo.categories.length; index++) {
          const file = siteInfo.categories[index].image;
          const url = await useUploader(file, 'OwnerName/Categories')
          imageCategories.push({name: siteInfo.categories[index].name,image:url})
      }

  setSiteInfo(()=>{return({...siteInfo, categories:imageCategories, logo: imageLogo})})
  
  if(imageLogo)
  await addToDoc('Owners', 'ownerName', {siteInfo:{...siteInfo}})

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
      colors: { ...siteInfo.colors, [colorField]: color.toHexString() },
    });
  };

  const handleTermChange = (index, field, value) => {
    const updatedTerms = [...siteInfo.terms];
    updatedTerms[index][field] = value;
    setSiteInfo({ ...siteInfo, terms: updatedTerms });
  };

  const addTerm = () => {
    setSiteInfo({ ...siteInfo, terms: [...siteInfo.terms, { title: '', body: '' }] });
  };

  const removeTerm = (index) => {
    const updatedTerms = siteInfo.terms.filter((_, i) => i !== index);
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

 

  const previewStyle = {
    backgroundColor: siteInfo.colors.background,
    color: siteInfo.colors.text,
    borderColor: siteInfo.colors.accent,
  };

  return (
    <div className='h-full w-full md:w-[60%]  m-auto border p-4 overflow-hidden overflow-y-scroll hidescroll ' >
     
     <div className='center-col gap-2'>
       {/* Logo Upload */}
       <ImgCrop rotate>
        <Upload
          name="logo"
          listType="picture"
          maxCount={1}
          onChange={handleLogoUpload}
          beforeUpload={(file) => {
            handleLogoUpload(file );
            return false;
          }}
        >
          <Button>Upload Logo</Button>
        </Upload>
      </ImgCrop>

      {/* Website Name */}
      <Input
        placeholder="Website Name"
        value={siteInfo.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <div className='border border-dashed my-4 p-2'>
        <lable>Booking Deposit</lable>
        <Input
        placeholder="Deposit Fee"
        value={siteInfo.depositFee}
        onChange={(e) => handleInputChange('depositFee', e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      </div>
      

      {/* Heading */}
     <div>
     <h1 className='font-bold'>Site Heading</h1>
      <Input
        placeholder="Heading"
        value={siteInfo.heading}
        onChange={(e) => handleInputChange('heading', e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      {/* Sub-heading */}
      <Input
        placeholder="Sub-heading"
        value={siteInfo.subHeading}
        onChange={(e) => handleInputChange('subHeading', e.target.value)}
        style={{ marginBottom: '10px' }}
      />
     </div>
     </div>



{/* Terms */}
<div style={{ marginBottom: '20px' }}>
        <h3 className='font-bold t'>Terms & Conditions</h3>
        {siteInfo.terms.map((term, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Input
              placeholder="Term Title"
              value={term.title}
              onChange={(e) => handleTermChange(index, 'title', e.target.value)}
              style={{ marginBottom: '5px' }}
            />
            <Input.TextArea
              placeholder="Term Body"
              value={term.body}
              onChange={(e) => handleTermChange(index, 'body', e.target.value)}
              style={{ marginBottom: '5px' }}
            />
            <Button onClick={() => removeTerm(index)} danger>
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
        {siteInfo.categories.map((category, index) => (
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
                <Button>Upload Image</Button>
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

{/* Color Pickers */}
<h3 className='font-bold text-3xl text-center'>Theme</h3>
      <div className='m-auto p-1 overflow-x-scroll hidescroll' style={{ marginBottom: '20px' }}>
        <div className='grid grid-cols-1   md:w-[80%] m-auto'>
          <div className='m-auto'>
            <ColorPicker className='w-40 justify-start' presets={presets} showText={(color)=>(<div>Background Color</div>)} value={siteInfo.colors.background} onChange={(color) => handleColorChange('background', color)} />
          </div>
          <div className='m-auto'>
            <ColorPicker className='w-40 justify-start' presets={presets} showText={(color)=>(<div>Accent Color</div>)} value={siteInfo.colors.accent} onChange={(color) => handleColorChange('accent', color)} />
          </div>
          <div className='m-auto center-col border w-40'>
            <div className='center'>Text Color</div>
            <div className='center gap-2'>
            <ColorPicker className=' justify-start' presets={presets}  value={siteInfo.colors.text} onChange={(color) => handleColorChange('text', color)} />
            <ColorPicker className='justify-start'  presets={presets}  value={siteInfo.colors.text2} onChange={(color) => handleColorChange('text2', color)} />
            <ColorPicker className='justify-start'  presets={presets}  value={siteInfo.colors.text3} onChange={(color) => handleColorChange('text3', color)} />
            </div>
          </div>
          <div className='m-auto'>
          </div>
        </div>
      </div>

      
      {/* Preview */}
      <div className='center-col rounded-xl overflow-hidden' style={{ ...previewStyle, padding: '20px', border: '1px solid' }}>
        <Image className='bg-black h-20 w-20 rounded-full' src={siteInfo.logo} />
        <h2 className='font-bold' style={{color: siteInfo.colors.accent}}>{siteInfo.heading}</h2>
        <p style={{color: siteInfo.colors.text}}>{siteInfo.subHeading}</p>

        <CollapsibleSectionMain title={'Read Terms'}>
                <CollapsibleSection title="Deposit">
                    <ul className="space-y-4">
                        <li style={{color: siteInfo.colors.text}}>$20 deposit is required to book, and it is non-refundable.</li>
                        
                    </ul>
                </CollapsibleSection>
          </CollapsibleSectionMain>

          <ButtonNext style={{color: siteInfo.colors.text2, backgroundColor: siteInfo.colors.accent}} className='center p-2 font-bold text-xl '>Continue</ButtonNext>
          
          <div style={{backgroundColor: siteInfo.colors.background}} className='rounded w-3/4  center p-2 my-4 h-20 m-auto'>
            <div style={{backgroundColor: siteInfo.colors.accent}} className='h-20 w-20 center font-bold rounded-lg'>
              <h1 className='center' style={{ color: siteInfo.colors.text2}}>5</h1>
            </div>
          </div>

      </div>

      <Button className='w-full my-5 h-10' onClick={submit}>SAVE</Button>

    </div>
  );
};

export default WebsiteEditor;

       
