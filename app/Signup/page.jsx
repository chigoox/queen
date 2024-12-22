'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Input, Button, Radio, RadioGroup } from '@nextui-org/react';
import { Divider } from '@nextui-org/divider';
import { AUTH } from '@/Firebase';
import { message } from 'antd';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    bookingSiteName: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    planType: 'free',
  });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showError = (errorMessage) => {
    messageApi.error({
      content: errorMessage,
      duration: 5,
      style: { marginTop: '20vh' },
    });
  };

  const showSuccess = (successMessage) => {
    messageApi.success({
      content: successMessage,
      duration: 3,
      style: { marginTop: '20vh' },
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { email, firstName, lastName, phoneNumber, bookingSiteName } = formData;

    if (!email || !firstName || !lastName || !phoneNumber || !bookingSiteName) {
      showError('Please fill in all required fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      showError('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(AUTH, provider);
      showSuccess('Successfully signed up with Google!');
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(AUTH, formData.email, formData.password);
      showSuccess('Account created successfully!');
      // Save additional user data to the database if needed
    } catch (error) {
      const errorMessage = {
        'auth/email-already-in-use': 'This email is already registered. Please use a different email or try logging in.',
        'auth/invalid-email': 'The email address is not valid.',
        'auth/operation-not-allowed': 'Email/password accounts are not enabled. Please contact support.',
        'auth/weak-password': 'The password is too weak. Please use a stronger password.',
      }[error.code] || 'An error occurred during signup';

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="flex flex-col gap-1 items-center">
              <h1 className="text-2xl font-bold">Create Your Account</h1>
              <p className="text-gray-500">Start managing your bookings today</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  name="bookingSiteName"
                  label="Booking Site Name"
                  placeholder="My Awesome Business"
                  value={formData.bookingSiteName}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  name="phoneNumber"
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Select Your Plan:</p>
                  <RadioGroup
                    name="planType"
                    value={formData.planType}
                    onChange={(value) => setFormData({ ...formData, planType: value })}
                  >
                    <Radio value="free">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Free Plan</span>
                        <span className="text-xs text-gray-500">
                          20% of each deposit fee + $1 per booking
                        </span>
                      </div>
                    </Radio>
                    <Radio value="paid">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Premium Plan</span>
                        <span className="text-xs text-gray-500">
                          $50 one-time fee - No additional charges
                        </span>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>

                <Button type="submit" color="primary" className="w-full" isLoading={loading}>
                  Create Account
                </Button>
  
                  <Button
                    onClick={handleGoogleSignup}
                    variant="bordered"
                    className="w-full"
                    startContent={
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    }
                  >
                    Continue with Google
                  </Button>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </>
    );
  };
  
  export default SignupPage;