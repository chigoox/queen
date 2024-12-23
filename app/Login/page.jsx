'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '@nextui-org/react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { AUTH } from '@/Firebase';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(AUTH, email, password);
      // Success animation before redirect
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(AUTH, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              'linear-gradient(45deg, #4f46e5 0%, #818cf8 100%)',
              'linear-gradient(45deg, #818cf8 0%, #4f46e5 100%)'
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-blue-200">
            Welcome to BooX
          </h1>
          <p className="text-center text-gray-600 mt-2">Login to continue</p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center overflow-hidden"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 space-y-3">
          <Button
            onClick={handleEmailLogin}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Login with Email'
            )}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full border border-gray-300 p-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:bg-gray-50"
          >
            Login with Google
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/Signup"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}