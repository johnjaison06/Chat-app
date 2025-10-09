import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare, User, Mail, Eye, EyeOff, Lock, Loader2 } from "lucide-react"
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import { toast } from "react-hot-toast";



const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()

    if(success===true)
    {
      signup(formData)
    }
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      {/* <div className='flex flex-col justify-center items-center p-6 sm:p-12'> */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

        <div className='w-full  max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mx-auto'>
              <MessageSquare className='w-10 h-10 text-primary' />
            </div>
            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
            <p className='text-base-content/60'>Get Started with your free account</p>
          </div>

        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>

          {/* first name */}

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium my-1">Full Name</span>
            </label>

            <div className="relative w-full ">
              <User className="w-5 h-5 text-red absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="John Doe"
                className="w-[450px] border border-gray-300 rounded-lg pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium my-1">Email</span>
            </label>
            <div className="relative w-full">
              <Mail className="w-5 h-5 text-red absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="email"
                className="w-[450px] border border-gray-300 rounded-lg pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative w-full">
              <Lock className="w-5 h-5 text-red absolute left-3 top-2.5 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-[450px] border border-gray-300 rounded-lg pr-10 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-5" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        <div className="text-center mt-4">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* right side  */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  )
}

export default SignUp;
