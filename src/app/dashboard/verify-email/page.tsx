'use client';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const VerifyEmailViaOtp = () => {
  const OTP_LENGTH = 6;
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'example@gmail.com';
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [activeInput, setActiveInput] = useState(0);
  const [shouldResend, setResend] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (!shouldResend) {
      const interval = setTimeout(() => {
        console.log('Enabling resend OTP');
        setResend(true);
      }
      , 30000); // Enable resend after 30 seconds
      return () => clearTimeout(interval);
    }
  }, [shouldResend]);

  useEffect(() => {
    inputRefs.current[activeInput]?.focus();
  }, [activeInput]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[0];
    setOtp(newOtp);
    if (idx < OTP_LENGTH - 1) setActiveInput(idx + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        setActiveInput(idx - 1);
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      setActiveInput(idx - 1);
    } else if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) {
      setActiveInput(idx + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    if (paste) {
      setOtp(paste.split('').concat(Array(OTP_LENGTH - paste.length).fill('')));
      setActiveInput(Math.min(paste.length, OTP_LENGTH - 1));
    }
    e.preventDefault();
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    setOtp(Array(OTP_LENGTH).fill(''));
    setActiveInput(0);
    setResend(false);
    // trigger resend OTP API here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    // submit OTP to backend here
    alert(`Submitted OTP: ${enteredOtp}`);
  };

  const maskedEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const visibleChars = 2; // Number of characters to show at the start and end
    const maskedLocalPart = localPart.slice(0, visibleChars) + `${'*'.repeat(localPart.length - visibleChars - 1)}` + localPart.slice(-1);
    return `${maskedLocalPart}@${domain}`;
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="card flex flex-col items-center gap-4 w-full max-w-md p-8 self-center md:scale-[1.2]"
      >
        <h2 className="text-2xl font-semibold mb-0">Verify your email</h2>
        <div className="text-center mb-4 text-sm text-gray-500 dark:text-gray-300">
          <p>
            We have sent a verification code to <span className="font-medium text-primary-500">{maskedEmail(email)}</span>
          </p>
          <p>
            Please check your inbox and enter the code below to activate your account.
          </p>
        </div>
        <div className="flex gap-2 justify-evenly w-full">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => { inputRefs.current[idx] = el!; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              onFocus={() => setActiveInput(idx)}
              onPaste={handlePaste}
              className={`w-12 h-12 text-center text-2xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
              autoComplete="one-time-code"
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={otp.some(d => !d)}
          className="btn btn-primary w-full mt-4 py-2 rounded hover:bg-primary-400 transition disabled:bg-primary-300 disabled:cursor-not-allowed"
        >
          Verify Email
        </button>
        <p className="mt-2 text-gray-500 dark:text-gray-300 text-sm text-center">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={!shouldResend}
            className={clsx(
              'text-primary-500 hover:text-primary-400 bg-transparent border-none p-0 underline underline-offset-2',
              !shouldResend ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}
          >
            Resend Code
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerifyEmailViaOtp;
