// Required imports
import React, { useState } from 'react';
import { Input, Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { motion } from 'motion/react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {  collection, addDoc } from 'firebase/firestore';
import { DATABASE, STORAGE,  } from '../../../../../Firebase';




const CategoryUploader = () => {
  const [categories, setCategories] = useState([{ name: '', images: [] }]);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  const handleImageUpload = (index, fileList) => {
    const newCategories = [...categories];
    newCategories[index].images = fileList;
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { name: '', images: [] }]);
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleUploadToFirebase = async () => {
    setLoading(true);
    try {
      const uploadPromises = categories.map(async (category) => {
        const imageUrls = await Promise.all(
          category.images.map(async (file) => {
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

        await addDoc(collection(DATABASE, 'categories'), categoryData);
      });

      await Promise.all(uploadPromises);
      alert('Categories uploaded successfully!');
    } catch (error) {
      console.error('Error uploading categories:', error);
      alert('Failed to upload categories.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 border-dashed border-2 rounded-lg"
    >
      <h3 className="font-bold text-lg mb-4">Categories</h3>
      {categories.map((category, index) => (
        <div key={index} className="mb-6">
          <Input
            placeholder="Category Name"
            value={category.name}
            onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
            className="mb-2"
          />
          <ImgCrop rotate>
            <Upload
              listType="picture-card"
              fileList={category.images}
              onChange={({ fileList }) => handleImageUpload(index, fileList)}
              beforeUpload={() => false}
              maxCount={5}
            >
              {category.images.length < 5 && <Button>Upload Image</Button>}
            </Upload>
          </ImgCrop>
          <Button
            onClick={() => removeCategory(index)}
            danger
            className="mt-2"
          >
            Remove Category
          </Button>
        </div>
      ))}
      <Button onClick={addCategory} type="dashed" className="mb-4">
        Add Category
      </Button>
      <Button
        type="primary"
        loading={loading}
        onClick={handleUploadToFirebase}
      >
        Save Categories
      </Button>
    </motion.div>
  );
};

export default CategoryUploader;
